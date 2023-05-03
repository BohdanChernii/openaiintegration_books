// const fs = require("fs");
// const PDFDocument = require('pdfkit');
// const request = require('request');
//
// const doc = new PDFDocument();
//
// module.exports = {
//     generateWriteImageToPdf: async () => {
//         const tempFilePath = './temp/image.jpg';
//         const fileStream = fs.createWriteStream(tempFilePath);
//         request.get('https://static.wikia.nocookie.net/pirates/images/e/ea/DMTNT_Jack_Sparrow_cropped.png/revision/latest?cb=20170507052033')
//         // request.get('https://phantom-marca.unidadeditorial.es/df22c5c1ace9887d9f24ade756a66daf/resize/1320/f/jpg/assets/multimedia/imagenes/2022/10/25/16667162966834.jpg')
//             .on('error', function(err) {
//                 console.log(err);
//             })
//             .on('response', function(response) {
//                 // check if the response is an image
//                 if (response.headers['content-type'].startsWith('image/')) {
//                     response.pipe(fileStream)
//                         .on('finish', function() {
//                             // set the image width and height to fit within the document
//                             const width = doc.page.width - doc.page.margins.left - doc.page.margins.right;
//                             const height = width * response.headers['content-length'] / response.headers['content-type'].match(/^image\/.*$/)[0];
//                             // add the image to the document
//                             doc.image(tempFilePath, { width: width, height: height });
//                             // save the document to a file
//                             doc.end();
//                             doc.pipe(fs.createWriteStream('./controllers/output.pdf', { flags: 'a' }));
//                         });
//                 } else {
//                     console.log('URL does not point to an image');
//                 }
//             });
//     }
// }
