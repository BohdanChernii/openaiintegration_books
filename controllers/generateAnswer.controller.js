const fs = require("fs");
const openAIService = require('../services/openAI.service')
const subtitleGenerator = require('../services/subTitleGenerator')
const textGenerator = require('../services/generateText.service')
const contentListGenerator = require('../services/generateContentList')
const PDFDocumentKit = require('pdfkit');
module.exports = {
  generateAnswer: async (req, res, next) => {
    try {
      const answer = await openAIService.askAQuestion()
      for (let item of answer) {
        item.image = 'https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg'
        item.subtitle = await subtitleGenerator.subTitle(item.title)
        item.subtitle = item.subtitle.filter((subItem) => parseInt(subItem.id) >= 1)

        for (let subtitle of item.subtitle) {
          if (subtitle.title) {
            subtitle.contentList = await contentListGenerator.generateContentList(subtitle.title, item.title)
            subtitle.contentList = subtitle.contentList.filter(contentItem => parseInt(contentItem.id) >= 1)
            for (let contentItem of subtitle.contentList) {
              contentItem.text = await textGenerator.generateText(subtitle.title, item.title, contentItem.title)
              contentItem.text = contentItem.text.split('\n\n').join(' ')
            }
          }
        }
      }
      fs.appendFile("./controllers/data.json", JSON.stringify({answer}), err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Data appended to file successfully!");
        }
      });

      const data = answer
      const doc = new PDFDocumentKit();

      function parseSubs(subtitle) {
        const subtitles = []
        let content = []
        let descriptions = []
        for (let item of subtitle) {
          subtitles.push(`Subtitle ${item.id} ${item.title}\n\n`)
          subtitles.push(...content)
          for(let description of item.contentList){
            descriptions.push(`\n${description.text}`)
            subtitles.push(...descriptions)
          }
        }
        return subtitles.flat(3)
      }

      function parse(data) {
        const chapters = []
        let subs = []
        for (let item of data) {
          subs = parseSubs(item.subtitle)
          chapters.push(`Chapter ${item.id} ${item.title}\n`)
          chapters.push(doc.addPage().image(`./temp/jack${item.id}.jpg`,{
            fit:[500,400],
            align:'center',
            valign:'center'
          }))
          chapters.push(...subs)
        }
        return chapters.flat(3)
      }

      const parsed = parse(data)
      doc.text(parsed.join(' '), null, 2);
      doc.pipe(fs.createWriteStream('./controllers/output.pdf'));

      doc.end();


      res.json({answer}).status(200)
      next()
    } catch (err) {
      next(err)
    }
  }
}
