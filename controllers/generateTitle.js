const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const pdfTemplate = require('../title');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');


module.exports = {
    generateTitle: async (req, res, next) => {
        const myTitle = [
            {
                image: 'https://i.ibb.co/fXknQnp/Image-For-CV.png',
                name: 'Nataliia Malitska',
                position: 'Frontend Developer / Web Developer',
                company: 'bei Deichmann',
                city: 'Essen',
                profil: 'Full Stack Entwickler',
                address: 'Neukirchener Str.,44, 47829 Krefeld',
                phone: '+4817687030532',
                email: 'vns122716@gmail.com',
                plus: 'Anschreiben, Lebenslauf, Zertifikate'
            }
        ]

        try {
            const options = {
                format: 'A4', // Формат сторінки (наприклад, A4)
                width: '8.5in', // Ширина сторінки
                height: '13in' // Висота сторінки (більша висота для збільшення довжини)
            };
            pdf.create(pdfTemplate({myTitle}), {}).toFile('Title.pdf', (err) => {
                // pdf.create(pdfTemplate({myCover}), options).toFile('resume.pdf', (err) => {
                if (err) {
                    return res.status(500).send('Error generating PDF');
                }

                // Send the generated PDF as a response
                return res.sendFile('Title.pdf', {root: '.'});
                // return res.sendFile('resume.pdf', {root: '.'});
            });
        } catch (err) {
            // Handle the error
            next(err);
        }
    },
};
