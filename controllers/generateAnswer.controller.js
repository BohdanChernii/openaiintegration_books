const fs = require("fs");

const openAIService = require('../services/openAI.service')

const subtitleGenerator = require('../services/subTitleGenerator')

const textGenerator = require('../services/generateText.service')

const contentListGenerator = require('../services/generateContentList')

const PDFDocument = require('pdfkit');

const pptxgen = require('pptxgenjs')
const request = require('request')
const doc = new PDFDocument();

module.exports = {
    generateAnswer: async (req, res, next) => {
        try {

// const url = 'https://static.wikia.nocookie.net/pirates/images/e/ea/DMTNT_Jack_Sparrow_cropped.png/revision/latest?cb=20170507052033'
//             function generateWriteImageToPDF() {
//                 const tempFilePath = `./temp/image.jpg`;
//                 const fileStream = fs.createWriteStream(tempFilePath);
//                 request.get( 'https://static.wikia.nocookie.net/pirates/images/e/ea/DMTNT_Jack_Sparrow_cropped.png/revision/latest?cb=20170507052033')
//                     // request.get('https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg')
//                     .on('error', function (err) {
//                         console.log(err);
//                     })
//                     .on('response', function (response) {
//                         // check if the response is an image
//                         if (response.headers['content-type'].startsWith('image/')) {
//                             response.pipe(fileStream)
//                                 .on('finish', function () {
//                                     // set the image width and height to fit within the document
//                                     const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
//                                     const height = width * response.headers['content-length'] / response.headers['content-type'].match(/^image\/.*$/)[0];
//                                     // add the image to the document
//                                     doc.image(tempFilePath, {width: width, height: height});
//                                     // render the document and save it to a file
//                                     doc.pipe(fs.createWriteStream('./controllers/output.pdf'))
//                                         .on('error', function (err) {
//                                             console.log('Error writing PDF file: ', err);
//                                         });
//                                     doc.end();
//                                 });
//                         } else {
//                             console.log('URL does not point to an image');
//                         }
//                     });
//             }

      const pres = new pptxgen()
      const answer = await openAIService.askAQuestion()
      for (let item of answer) {
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
        let descriptions = []
        for (let item of subtitle) {
          subtitles.push(`Subtitle ${item.id} ${item.title}\n\n`)
          subtitles.push(...content)
          for(let description of item.contentList){
            descriptions.push(`Paragraph - ${description.title} \n\n  ${description.text}`)
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
          chapters.push(...subs)
          console.log(chapters);
        }
        return chapters.flat(3)
      }

      const parsed = parse(data)
      doc.text(parsed.join(' '), null, 2);
            const tempFilePath = `./temp/image.jpg`;
            const fileStream = fs.createWriteStream(tempFilePath);
            request.get( 'https://static.wikia.nocookie.net/pirates/images/e/ea/DMTNT_Jack_Sparrow_cropped.png/revision/latest?cb=20170507052033')
                // request.get('https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg')
                .on('error', function (err) {
                    console.log(err);
                })
                .on('response', function (response) {
                    // check if the response is an image
                    if (response.headers['content-type'].startsWith('image/')) {
                        response.pipe(fileStream)
                            .on('finish', function () {
                                // set the image width and height to fit within the document
                                const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
                                const height = width * response.headers['content-length'] / response.headers['content-type'].match(/^image\/.*$/)[0];
                                // add the image to the document
                                doc.image(tempFilePath, {width: width, height: height});
                                // render the document and save it to a file
                                // doc.pipe(fs.createWriteStream('./controllers/output.pdf'))
                                //     .on('error', function (err) {
                                //         console.log('Error writing PDF file: ', err);
                                //     });
                                // doc.end();
                            });
                    } else {
                        console.log('URL does not point to an image');
                    }
                });
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
