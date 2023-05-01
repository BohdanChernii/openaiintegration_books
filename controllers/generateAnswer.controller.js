const fs = require("fs");

const openAIService = require('../services/openAI.service')

const subtitleGenerator = require('../services/subTitleGenerator')

const textGenerator = require('../services/generateText.service')

const contentListGenerator = require('../services/generateContentList')

const PDFDocument = require('pdfkit');

const pptxgen = require('pptxgenjs')


module.exports = {
  generateAnswer: async (req, res, next) => {
    try {
      const pres = new pptxgen()
      const answer = await openAIService.askAQuestion()
      for (let item of answer) {
        item.subtitle = await subtitleGenerator.subTitle(item.title)
        item.subtitle = item.subtitle.filter((subItem) => parseInt(subItem.id) >= 1)

        for (let subtitle of item.subtitle) {
          if (subtitle.title) {
            subtitle.contentList = await contentListGenerator.generateContentList(subtitle.title, item.title)
            subtitle.contentList = subtitle.contentList.filter(contentItem => parseInt(contentItem.id) >= 1)
            // for (let contentItem of subtitle.contentList) {
            //   contentItem.text = await textGenerator.generateText(subtitle.title, item.title, contentItem.title)
            //   contentItem.text = contentItem.text.split('\n\n').join(' ')
            // }
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
      const doc = new PDFDocument();


// function parseText(textItem){
//   const text = []
//   for (let item of textItem.contentList ){
//     text.push(textItem.text)
//   }
//   return text
// }


      function parseSubs(subtitle) {
        const subtitles = []
        let content = []
        for (let item of subtitle) {

          subtitles.push(`Subtitle ${item.id} ${item.title}\n\n`)
          subtitles.push(...content)

        }
        return subtitles.flat(3)
      }

      function parse(data) {
        const chapters = []
        let subs = []
        for (let item of data) {
          subs = parseSubs(item.subtitle)
          chapters.push(`Chapter ${item.id} ${item.title}\n`)
          chapters.push(...subs)
          console.log(chapters);
        }
        return chapters.flat(3)
      }

      const parsed = parse(data)
      doc.text(parsed.join(' '), null, 2);
      doc.pipe(fs.createWriteStream('./controllers/output.pdf'));
      doc.end();
      console.log(answer);
      res.json({answer}).status(200)

      next()
    } catch (err) {
      next(err)
    }
  }
}
