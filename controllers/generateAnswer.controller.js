const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');


module.exports = {
    generateAnswer: async (req, res, next) => {
        // const myPath = path.join(process.cwd(), 'img', 'photo_2023-06-04_23-06-39.jpg');
        // // const newFile = await fs.readFile(myPath);
        // // const newFile = await fs.readFile(myPath);
        // fs.readFile(myPath, (err, data) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //
        //     return  data;
        //     // Use the new file data as needed
        //     // For example, pass it to another function or write it to a file
        // });

        try {
            const myData = [
                {
                    position: 'FULL STACK ENTWICKLER',
                    firstName: 'NATALIIA',
                    lastName: 'MALITSKA',
                    myImage: 'https://intergram-test.s3.eu-west-3.amazonaws.com/user-avatar/photo_2023-06-04_23-06-39.jpg',
                    contacts:
                        {
                            emailImg: 'https://previews.123rf.com/images/jenjawin/jenjawin1904/jenjawin190400761/121278474-envelope-icon-vector-grey-envelope-email-icon.jpg',
                            email: 'vns122716@gmail.com',
                            addressImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCcPUi5Wcj8K5Zck40C0XQYVcemq8CfUwSvOHlwq1TJe00hqqp-e1RzD1cKA84HDIGuv8&usqp=CAU',
                            address: 'Neukirchener Str.,44 Krefeld 47829',
                            telephoneImg: 'https://png.pngtree.com/element_our/png_detail/20190103/smartphone-line-black-icon-png_309255.jpg',
                            telephone: '+4917687030532',
                            telegram: '+380677709362 (Telegram, WhatsApp, Viber'
                        },
                    skills: [
                        'JavaScript', 'TypeScript', 'React', 'Redux', 'Style Components', 'React Testing Library',
                        'Node.js', 'Nest.js', 'Express.js', 'MySQL', 'MongoDB', 'TypeORM', 'Stripe', 'AWS', 'Firebase',
                        'GitHub/GitLab actions', 'Heroku'
                    ],
                    languages: [
                        'Englisch (B2)', 'Deutsch (A1 Ich setze meine Teilnahme am Integrationskurs fort)', 'Polnisch(A2)'
                    ],
                    profil1: 'Durch meine umfangreiche Erfahrung habe ich ein starkes\n' +
                        'Knowhow in der Entwicklung und Erstellung von MVPs sowie in der\n' +
                        'Gestaltung umfangreicher Softwarearchitekturen und Web-Apps\n' +
                        'entwickelt.',
                    profil2: 'Angetrieben von umfassenden Kenntnissen der wichtigsten\n' +
                        'Browser und Webkonzepte verfüge ich über eine solide Grundlage\n' +
                        'im Bereich UX-Design.',
                    workExperience: [
                        {
                            position: 'FULL STACK ENTWICKLER',
                            company: 'Agilely',
                            typeWork: 'Fernarbeit',
                            years: 'Feb 2021 - Feb 2022',
                            description: [
                                {whatDo: 'Erfahrung mit React, Node, Figma, Strapi, Firebase, Jira und Codecept.'},
                                {whatDo: 'Entwicklung und Bereitstellung von Webanwendungen mit React als Front-End-Framework.'},
                                {whatDo: 'Nutzung von Node.js für skalierbare und effiziente Backend-Systeme.'},
                                {whatDo: 'Gestaltung intuitiver und benutzerfreundlicher Oberflächen mit Figma.'},
                                {
                                    whatDo: 'Erfahrung in der Verwendung von Firebase für Echtzeit-Anwendungen, Jira zur' +
                                        ' Projektverwaltung und Codecept für zuverlässige End-to-End-Tests.'
                                },
                            ],
                        },
                        {
                            position: 'FRONT END ENTWICKLER',
                            company: 'Freiberuflich',
                            typeWork: 'Fernarbeit',
                            years: 'Sep 2021 - Dez 2021',
                            description: [
                                {whatDo: 'Erledigte kleine Aufgaben mit Reactю'},
                                {whatDo: 'Gestaltete Websites mit HTML und CSS für die Front-End-Entwicklung.'}
                            ],
                        },
                        {
                            position: 'TAILOR HOCHZEITSGESCHÄFT',
                            company: 'White Story',
                            typeWork: 'Arbeit als selbstständige Schneiderin',
                            years: 'Sep 2019 - Juny 2021',
                            description: [
                                {whatDo: 'Dieses Projekt hat mir Kreativität beigebracht.'}
                            ],
                        },
                        {
                            position: 'MAßSCHNEIDERIN',
                            company: 'Arbeit als selbstständige Schneiderin',
                            typeWork: 'Lwiw',
                            years: 'Des 2008 - Sep 2019',
                            description: [
                                {whatDo: 'Diese Arbeit hat mich gelehrt, mit Menschen zusammenzuarbeiten und ' +
                                        'verschiedene Probleme zu lösen.'}
                            ],
                        },
                        {
                            position: 'KLEIDUNGSGESTALTER',
                            company: 'Rolada',
                            typeWork: 'Lwiw',
                            years: 'Des 2008 - Sep 2007',
                            description: [
                                {whatDo: ''}
                            ],
                        },
                        {
                            position: 'MODELLBAU ASSISTENT',
                            company: 'LvivTex',
                            typeWork: 'Lwiw',
                            years: 'Sep 2007 - Jun 2005',
                            description: [
                                {whatDo: ''}
                            ],
                        },
                        {
                            position: 'NÄHERIN IN DER EXPERIMENTELLEN ABTEILUNG',
                            company: 'LvivTex',
                            typeWork: 'Lwiw',
                            years: 'Jun 2005 - Mar 2004',
                            description: [
                                {whatDo: ''}
                            ],
                        },
                        {
                            position: 'NÄHERIN IN DER MASSENPRODUKTION',
                            company: 'HRTTextile',
                            typeWork: 'Lwiw',
                            years: 'Mar 2004 - Sep 2003',
                            description: [
                                {whatDo: ''}
                            ],
                        }
                    ],
                    education: [
                        {
                            study: 'FULL STACK ENTWICKLER',
                            university: 'Okten School',
                            city: 'Lwiw',
                            years: 'Jun 2021 - Jan 2022'
                        },
                        {
                            study: 'MODEDESIGNER',
                            university: 'Nationale Universität für Technologie und Design Kiew',
                            city: 'Kiew',
                            years: ' Sep 2002 - Jan 2006'
                        },
                        {
                            study: 'MODEDESIGNER',
                            university: 'Lwiw College für Modeindustrie',
                            city: 'Lwiw',
                            years: 'Sep 2000 - Jan 2003'
                        }
                    ]
                },
            ];

            const options = {
                format: 'A4', // Формат сторінки (наприклад, A4)
                width: '8.5in', // Ширина сторінки
                height: '18in' // Висота сторінки (більша висота для збільшення довжини)
            };
            pdf.create(pdfTemplate({myData}), options).toFile('CV.pdf', (err) => {
                if (err) {
                    return res.status(500).send('Error generating PDF');
                }

                // Send the generated PDF as a response
                return res.sendFile('CV.pdf', {root: '.'});
            });
        } catch (err) {
            // Handle the error
            next(err);
        }

        // async function increasePageHeight() {
        //     // Завантажте PDF-файл
        //     const pdfBuffer = fs.readFileSync('input.pdf');
        //     const pdfDoc = await PDFDocument.load(pdfBuffer);
        //
        //     // Отримайте першу сторінку з документа
        //     const page = pdfDoc.getPages()[0];
        //
        //     // Отримайте поточні розміри сторінки
        //     const { width, height } = page.getSize();
        //
        //     // Збільште довжину сторінки
        //     const newHeight = height * 1.5; // Наприклад, збільшимо на 50%
        //
        //     // Встановіть новий розмір сторінки
        //     page.setSize(width, newHeight);
        //
        //     // Збережіть змінений документ у файл
        //     const modifiedPdfBytes = await pdfDoc.save();
        //     fs.writeFileSync('modified.pdf', modifiedPdfBytes);
        // }

        // increasePageHeight();

        // const { PDFDocument } = require('pdf-lib');
        // const fs = require('fs');
        //
        // async function mergePagesIntoOne() {
        //     // Завантажте PDF-файл з двома сторінками
        //     const pdfBuffer = fs.readFileSync('input.pdf');
        //     const pdfDoc = await PDFDocument.load(pdfBuffer);
        //
        //     // Створіть новий документ PDF
        //     const mergedDoc = await PDFDocument.create();
        //
        //     // Отримайте першу та другу сторінки зі вхідного документа
        //     const [firstPage, secondPage] = pdfDoc.getPages();
        //
        //     // Додайте вміст першої сторінки до нового документа
        //     const copiedFirstPage = await mergedDoc.copyPages(pdfDoc, [0]);
        //     mergedDoc.addPage(copiedFirstPage[0]);
        //
        //     // Додайте вміст другої сторінки до нового документа
        //     const copiedSecondPage = await mergedDoc.copyPages(pdfDoc, [1]);
        //     mergedDoc.addPage(copiedSecondPage[0]);
        //
        //     // Збережіть об'єднаний документ у файл
        //     const mergedPdfBytes = await mergedDoc.save();
        //     fs.writeFileSync('merged.pdf', mergedPdfBytes);
        // }
        //
        // mergePagesIntoOne();
    },
};


