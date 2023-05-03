const fs = require("fs");
const openAIService = require('../services/openAI.service')
const subtitleGenerator = require('../services/subTitleGenerator')
const textGenerator = require('../services/generateText.service')
const contentListGenerator = require('../services/generateContentList')
const PDFDocumentKit = require('pdfkit');
const request = require('request');
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');

module.exports = {
    generateAnswer: async (req, res, next) => {
        try {
            const answer =  [
                {
                    "id": "Chapter 1: The Search for the Lost Treasure",
                    "image": "https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg",
                    "subtitle": [{
                        "id": "1",
                        "title": " The Quest for the Treasure: This subsection could focus on the main plot of the book, which revolves around Captain Jack Sparrow and his crew searching for a legendary treasure that is said to hold immense power and wealth",
                        "contentList": [
                            {
                                "id": "1",
                                "title": " Captain Jack Sparrow and his crew embark on a perilous journey to find the legendary treasure that is believed to be hidden in a heavily guarded fortress on a remote island",
                                "text": "Captain Jack Sparrow seeks legendary treasure on heavily guarded island."
                            },
                            {
                                "id": "2",
                                "title": " Along the way, they encounter numerous obstacles and challenges, including treacherous waters, dangerous sea creatures, and rival pirates who are also on the hunt for the treasure",
                                "text": "Captain Jack seeks mythical treasure with monstrous perils and threats."
                            }
                        ]
                    },
                        {
                            "id": "2",
                            "title": " The Characters of the Crew: This subsection could introduce and explore the different characters that make up Captain Jack Sparrow's crew",
                            "contentList": [
                                {
                                    "id": "1",
                                    "title": " Captain Jack Sparrow - the witty and unpredictable captain of the crew, known for his unique fashion sense, love for rum, and tendency to get into trouble",
                                    "text": "Captain Jack Sparrow's crew has unique and unpredictable characters."
                                },
                                {
                                    "id": "2",
                                    "title": " Gibbs - the experienced first mate of the crew, known for his loyalty to Captain Jack and his ability to navigate through dangerous waters",
                                    "text": "Gibbs: Jack's loyal first mate, skilled in navigating danger."
                                }
                            ]
                        }]
                },
                {
                    "id": "Chapter 2: The Battle at Sea",
                    "image": "https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg",
                    "subtitle": [
                        {
                            "id": "1",
                            "title": " The Quest for the Treasure: This subsection could focus on the main plot of the book, which revolves around Captain Jack Sparrow and his crew searching for a legendary treasure that is said to hold immense power and wealth",
                            "contentList": [
                                {
                                    "id": "1",
                                    "title": " Captain Jack Sparrow and his crew embark on a perilous journey to find the legendary treasure that is believed to be hidden in a heavily guarded fortress on a remote island",
                                    "text": "Captain Jack Sparrow seeks legendary treasure on heavily guarded island."
                                },
                                {
                                    "id": "2",
                                    "title": " Along the way, they encounter numerous obstacles and challenges, including treacherous waters, dangerous sea creatures, and rival pirates who are also on the hunt for the treasure",
                                    "text": "Captain Jack seeks mythical treasure with monstrous perils and threats."
                                }
                            ]
                        },
                        {
                            "id": "2",
                            "title": " The Characters of the Crew: This subsection could introduce and explore the different characters that make up Captain Jack Sparrow's crew",
                            "contentList": [
                                {
                                    "id": "1",
                                    "title": " Captain Jack Sparrow - the witty and unpredictable captain of the crew, known for his unique fashion sense, love for rum, and tendency to get into trouble",
                                    "text": "Captain Jack Sparrow's crew has unique and unpredictable characters."
                                },
                                {
                                    "id": "2",
                                    "title": " Gibbs - the experienced first mate of the crew, known for his loyalty to Captain Jack and his ability to navigate through dangerous waters",
                                    "text": "Gibbs: Jack's loyal first mate, skilled in navigating danger."
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "Chapter 3: The Ultimate Showdown with Blackbeard",
                    "title": "",
                    "image": "https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg",
                    "subtitle": [
                        {
                            "id": "1",
                            "title": " The Quest for the Treasure: This subsection could focus on the main plot of the book, which revolves around Captain Jack Sparrow and his crew searching for a legendary treasure that is said to hold immense power and wealth",
                            "contentList": [
                                {
                                    "id": "1",
                                    "title": " Captain Jack Sparrow and his crew embark on a perilous journey to find the legendary treasure that is believed to be hidden in a heavily guarded fortress on a remote island",
                                    "text": "Captain Jack Sparrow seeks legendary treasure on heavily guarded island."
                                },
                                {
                                    "id": "2",
                                    "title": " Along the way, they encounter numerous obstacles and challenges, including treacherous waters, dangerous sea creatures, and rival pirates who are also on the hunt for the treasure",
                                    "text": "Captain Jack seeks mythical treasure with monstrous perils and threats."
                                }
                            ]
                        },
                        {
                            "id": "2",
                            "title": " The Characters of the Crew: This subsection could introduce and explore the different characters that make up Captain Jack Sparrow's crew",
                            "contentList": [
                                {
                                    "id": "1",
                                    "title": " Captain Jack Sparrow - the witty and unpredictable captain of the crew, known for his unique fashion sense, love for rum, and tendency to get into trouble",
                                    "text": "Captain Jack Sparrow's crew has unique and unpredictable characters."
                                },
                                {
                                    "id": "2",
                                    "title": " Gibbs - the experienced first mate of the crew, known for his loyalty to Captain Jack and his ability to navigate through dangerous waters",
                                    "text": "Gibbs: Jack's loyal first mate, skilled in navigating danger."
                                }
                            ]
                        }
                    ]
                }
            ]
            // const answer = await openAIService.askAQuestion()
            // for (let item of answer) {
            //     item.image = 'https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg'
            //     item.subtitle = await subtitleGenerator.subTitle(item.title)
            //     item.subtitle = item.subtitle.filter((subItem) => parseInt(subItem.id) >= 1)
            //
            //     for (let subtitle of item.subtitle) {
            //         if (subtitle.title) {
            //             subtitle.contentList = await contentListGenerator.generateContentList(subtitle.title, item.title)
            //             subtitle.contentList = subtitle.contentList.filter(contentItem => parseInt(contentItem.id) >= 1)
            //             for (let contentItem of subtitle.contentList) {
            //                 contentItem.text = await textGenerator.generateText(subtitle.title, item.title, contentItem.title)
            //                 contentItem.text = contentItem.text.split('\n\n').join(' ')
            //             }
            //         }
            //     }
            // }
            // fs.appendFile("./controllers/data.json", JSON.stringify({answer}), err => {
            //     if (err) {
            //         console.error(err);
            //     } else {
            //         console.log("Data appended to file successfully!");
            //     }
            // });
            //
            // const data = answer
            // const doc = new PDFDocumentKit();
            //
            // function parseSubs(subtitle) {
            //     const subtitles = []
            //     let content = []
            //     let descriptions = []
            //     for (let item of subtitle) {
            //         subtitles.push(`Subtitle ${item.id} ${item.title}\n\n`)
            //         subtitles.push(...content)
            //         for(let description of item.contentList){
            //             descriptions.push(`\n${description.text}`)
            //             subtitles.push(...descriptions)
            //         }
            //     }
            //     return subtitles.flat(3)
            // }

            // function parse(data) {
            //     const chapters = []
            //     let subs = []
            //     for (let item of data) {
            //         // const tempFilePath = `./temp/image${item.id}.jpg`;
            //         // const fileStream = fs.createWriteStream(tempFilePath);
            //         subs = parseSubs(item.subtitle)
            //         chapters.push(`Chapter ${item.id} ${item.title}\n`)
            //         // chapters.push(doc.addPage().image(`${fileStream}`,{
            //         // chapters.push(doc.addPage().image(`./temp/jack${parseInt(item.id)}.jpg`,{
            //         //     fit:[500,400],
            //         //     align:'center',
            //         //     valign:'center'
            //         // }))
            //         chapters.push(...subs)
            //     }
            //     return chapters.flat(3)
            // }
            //
            // const parsed = parse(data)
            // doc.text(parsed.join(' '), null, 2);
            //
            // doc.pipe(fs.createWriteStream('./controllers/output.pdf'));
            //
            // doc.end();
            // answer.map(value =>
                pdf.create(pdfTemplate({answer}), {}).toFile('result.pdf', (err) => {
                    if(err) {
                        res.send(Promise.reject());
                    }

                    res.send(Promise.resolve());
                })

        // )
            res.json({answer}).status(200)
            next()
        } catch (err) {
            next(err)
        }
    }
}


// const fs = require("fs");
//
// const openAIService = require('../services/openAI.service')
//
// const subtitleGenerator = require('../services/subTitleGenerator')
//
// const textGenerator = require('../services/generateText.service')
//
// const contentListGenerator = require('../services/generateContentList')
//
// const PDFDocument = require('pdfkit');
//
// const pptxgen = require('pptxgenjs')
// const request = require('request')
// const doc = new PDFDocument();
//
// module.exports = {
//     generateAnswer: async (req, res, next) => {
//         try {
//
// // const url = 'https://static.wikia.nocookie.net/pirates/images/e/ea/DMTNT_Jack_Sparrow_cropped.png/revision/latest?cb=20170507052033'
// //             function generateWriteImageToPDF() {
// //                 const tempFilePath = `./temp/image.jpg`;
// //                 const fileStream = fs.createWriteStream(tempFilePath);
// //                 request.get( 'https://static.wikia.nocookie.net/pirates/images/e/ea/DMTNT_Jack_Sparrow_cropped.png/revision/latest?cb=20170507052033')
// //                     // request.get('https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg')
// //                     .on('error', function (err) {
// //                         console.log(err);
// //                     })
// //                     .on('response', function (response) {
// //                         // check if the response is an image
// //                         if (response.headers['content-type'].startsWith('image/')) {
// //                             response.pipe(fileStream)
// //                                 .on('finish', function () {
// //                                     // set the image width and height to fit within the document
// //                                     const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
// //                                     const height = width * response.headers['content-length'] / response.headers['content-type'].match(/^image\/.*$/)[0];
// //                                     // add the image to the document
// //                                     doc.image(tempFilePath, {width: width, height: height});
// //                                     // render the document and save it to a file
// //                                     doc.pipe(fs.createWriteStream('./controllers/output.pdf'))
// //                                         .on('error', function (err) {
// //                                             console.log('Error writing PDF file: ', err);
// //                                         });
// //                                     doc.end();
// //                                 });
// //                         } else {
// //                             console.log('URL does not point to an image');
// //                         }
// //                     });
// //             }
//
//             const pres = new pptxgen()
//             const answer = await openAIService.askAQuestion()
//             for (let item of answer) {
//                 item.subtitle = await subtitleGenerator.subTitle(item.title)
//                 item.subtitle = item.subtitle.filter((subItem) => parseInt(subItem.id) >= 1)
//
//                 for (let subtitle of item.subtitle) {
//                     if (subtitle.title) {
//                         subtitle.contentList = await contentListGenerator.generateContentList(subtitle.title, item.title)
//                         subtitle.contentList = subtitle.contentList.filter(contentItem => parseInt(contentItem.id) >= 1)
//                         for (let contentItem of subtitle.contentList) {
//                             contentItem.text = await textGenerator.generateText(subtitle.title, item.title, contentItem.title)
//                             contentItem.text = contentItem.text.split('\n\n').join(' ')
//                         }
//                     }
//                 }
//             }
//             fs.appendFile("./controllers/data.json", JSON.stringify({answer}), err => {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     console.log("Data appended to file successfully!");
//                 }
//             });
//
//             const data = answer
//             const doc = new PDFDocument();
//
//
// // function parseText(textItem){
// //   const text = []
// //   for (let item of textItem.contentList ){
// //     text.push(textItem.text)
// //   }
// //   return text
// // }
//
//
//             function parseSubs(subtitle) {
//                 const subtitles = []
//                 let content = []
//                 let descriptions = []
//                 for (let item of subtitle) {
//                     subtitles.push(`Subtitle ${item.id} ${item.title}\n\n`)
//                     subtitles.push(...content)
//                     for (let description of item.contentList) {
//                         descriptions.push(`Paragraph - ${description.title} \n\n  ${description.text}`)
//                         subtitles.push(...descriptions)
//                     }
//                 }
//                 return subtitles.flat(3)
//             }
//
//             function parse(data) {
//                 const chapters = []
//                 let subs = []
//                 for (let item of data) {
//                     subs = parseSubs(item.subtitle)
//                     chapters.push(`Chapter ${item.id} ${item.title}\n`)
//                     chapters.push(...subs)
//                     console.log(chapters);
//                 }
//                 return chapters.flat(3)
//             }
//
//             const parsed = parse(data)
//             doc.text(parsed.join(' '), null, 2);
//             const tempFilePath = `./temp/image.jpg`;
//             const fileStream = fs.createWriteStream(tempFilePath);
//             request.get('https://static.wikia.nocookie.net/pirates/images/e/ea/DMTNT_Jack_Sparrow_cropped.png/revision/latest?cb=20170507052033')
//                 // request.get('https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg')
//                 .on('error', function (err) {
//                     console.log(err);
//                 })
//                 .on('response', function (response) {
//                     // check if the response is an image
//                     if (response.headers['content-type'].startsWith('image/')) {
//                         response.pipe(fileStream)
//                             .on('finish', function () {
//                                 // set the image width and height to fit within the document
//                                 const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
//                                 const height = width * response.headers['content-length'] / response.headers['content-type'].match(/^image\/.*$/)[0];
//                                 // add the image to the document
//                                 doc.image(tempFilePath, {width: width, height: height});
//                                 // render the document and save it to a file
//                                 // doc.pipe(fs.createWriteStream('./controllers/output.pdf'))
//                                 //     .on('error', function (err) {
//                                 //         console.log('Error writing PDF file: ', err);
//                                 //     });
//                                 // doc.end();
//                             });
//                     } else {
//                         console.log('URL does not point to an image');
//                     }
//                 });
//             doc.pipe(fs.createWriteStream('./controllers/output.pdf'));
//             doc.end();
//             console.log(answer);
//             res.json({answer}).status(200)
//
//             next()
//         } catch (err) {
//             next(err)
//         }
//     }
// }
