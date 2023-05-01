const fs = require("fs");

const openAIService = require('../services/openAI.service')

const subtitleGenerator = require('../services/subTitleGenerator')

const textGenerator = require('../services/generateText.service')

const endGenerator = require('../services/endTheText')

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
          if (subtitle.subTitle) {
            subtitle.description = await contentListGenerator.generateContentList(subtitle.subTitle, item.title)
            subtitle.description = subtitle.description.filter(contentItem => parseInt(contentItem.id) >= 1)

            for (let contentItem of subtitle.description) {
              contentItem.text = await textGenerator.generateText(subtitle.subTitle, item.title, contentItem.title)
              contentItem.text = contentItem.text.split('\n\n').join(' ')
            }
          }
        }
      }
      fs.writeFile("./controllers/data.json", JSON.stringify({answer}), err => {
        if (err) {
          console.error(err);
        } else {
          console.log("Data appended to file successfully!");
        }
      });

      const data = answer
      const doc = new PDFDocument();

      function parseText(text) {
        let content = ''
      }


      function parseDescription(description) {
        const descriptions = []
        for (let item of description) {
          descriptions.push(`Description ${item.id} ${item.description}\n\n\n`)
        }
        return descriptions.flat(3)
      }


      function parseSubs(subtitle) {
        const subtitles = []
        let desc = []
        for (let item of subtitle) {
          desc = parseDescription(item.description)

          subtitles.push(`Subtitle ${item.id} ${item.subTitle}\n\n`)
          subtitles.push(`Lorem______________\n\n\n`)
          subtitles.push(...desc)
        }
        return subtitles.flat(3)
      }

      function parse(data) {
        const chapters = []
        let subs = []
        for (let item of data) {
          subs = parseSubs(item.subtitle)
          chapters.push(`Chapter ${item.id} ${item.chapter}\n`)
          chapters.push(...subs)
          console.log(chapters);
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
