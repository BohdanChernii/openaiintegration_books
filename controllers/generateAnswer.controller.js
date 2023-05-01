const fs = require("fs");

const openAIService = require('../services/openAI.service')

const subtitleGenerator = require('../services/subTitleGenerator')

const textGenerator = require('../services/generateText.service')

const endGenerator = require('../services/endTheText')

const contentListGenerator = require('../services/generateContentList')

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
            // subtitle.text = await textGenerator.generateText(subtitle.title, item.title)
            // subtitle.text = subtitle.text + await endGenerator.endTheText(subtitle.title, item.title)
            subtitle.contentList = await contentListGenerator.generateContentList(subtitle.title, item.title)
            subtitle.contentList = subtitle.contentList.filter(contentItem => parseInt(contentItem.id) >= 1)
            for(let contentItem of  subtitle.contentList){
              contentItem.text = await textGenerator.generateText(subtitle.title, item.title, contentItem.title)
              contentItem.text =  contentItem.text.split('\n\n').join(' ')
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

      res.json({answer}).status(200)
      next()
    } catch (err) {
      next(err)
    }
  }
}
