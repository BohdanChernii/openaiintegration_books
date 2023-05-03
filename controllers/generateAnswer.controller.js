const fs = require("fs");
const openAIService = require('../services/openAI.service')
const subtitleGenerator = require('../services/subTitleGenerator')
const textGenerator = require('../services/generateText.service')
const contentListGenerator = require('../services/generateContentList')
const PDFDocumentKit = require('pdfkit');
var https = require("https");
var path = require("path");

function parseImage(url){
  // The authentication key (API Key).
// Get your own by registering at https://app.pdf.co
  const API_KEY = "bodiachernii@gmail.com_b011aee2c6e7c291ed5e30d00c32436998d815f05f77a0b3b615da9627a8c60c94782294";

// Direct URL of source PDF file.
// You can also upload your own file into PDF.co and use it as url. Check "Upload File" samples for code snippets: https://github.com/bytescout/pdf-co-api-samples/tree/master/File%20Upload/
  const SourceFileUrl = "https://bytescout-com.s3.amazonaws.com/files/demo-files/cloud-api/pdf-edit/sample.pdf";

// Comma-separated list of page indices (or ranges) to process. Leave empty for all pages. Example: '0,2-5,7-'.
  const Pages = "";

// PDF document password. Leave empty for unprotected documents.
  const Password = "";

// Destination PDF file name
  const DestinationFile = './controllers/output.pdf';

// Image params
  const X = 400;
  const Y = 20;
  const Width = 119;
  const Height = 32;
  const ImageUrl = url;

// * Add image *
// Prepare request to `PDF Edit` API endpoint
  var queryPath = `/v1/pdf/edit/add`;

// JSON payload for api request
  var jsonPayload = JSON.stringify({
    name: path.basename(DestinationFile),
    password: Password,
    url: SourceFileUrl,
    images: [
      {
        url: ImageUrl,
        x: X,
        y: Y,
        width: Width,
        height: Height,
        pages: Pages,
      }
    ]
  });

  var reqOptions = {
    host: "api.pdf.co",
    method: "POST",
    path: queryPath,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(jsonPayload, 'utf8')
    }
  };
// Send request
  var postRequest = https.request(reqOptions, (response) => {
    response.on("data", (d) => {
      // Parse JSON response
      var data = JSON.parse(d);

      if (data.error == false) {
        // Download the PDF file
        var file = fs.createWriteStream(DestinationFile);
        https.get(data.url, (response2) => {
          response2.pipe(file).on("close", () => {
            console.log(`Generated PDF file saved to '${DestinationFile}' file.`);
          });
        });
      }
      else {
        // Service reported error
        console.log(data.message);
      }
    });
  }).on("error", (e) => {
    // Request error
    console.error(e);
  });

// Write request data
  postRequest.write(jsonPayload);
  postRequest.end();
}



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
          // parseImage(item.image)

          chapters.push(`Chapter ${item.id} ${item.title}\n`)
          doc.addPage().image(`./temp/jack${parseInt(item.id)}.jpg`,{
            fit:[500,400],
            align:'center',
            valign:'center'
          })
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
