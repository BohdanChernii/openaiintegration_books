const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');
const {PDFDocument, StandardFonts, rgb} = require('pdf-lib');


module.exports = {
    generateCV: async (req, res, next) => {
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
                    position: 'FULL STACK DEVELOPER',
                    firstName: 'NATALIIA',
                    lastName: 'MALITSKA',
                    myImage: 'https://i.ibb.co/Vgnbj12/photo-2023-06-04-23-06-39.jpg',
                    // myImage: 'https://intergram-test.s3.eu-west-3.amazonaws.com/user-avatar/photo_2023-06-04_23-06-39.jpg',
                    contacts:
                        {
                            emailImg: 'https://previews.123rf.com/images/jenjawin/jenjawin1904/jenjawin190400761/121278474-envelope-icon-vector-grey-envelope-email-icon.jpg',
                            email: 'nataliiamalitska.dev@gmail.com',
                            // email: 'vns122716@gmail.com',
                            addressImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCcPUi5Wcj8K5Zck40C0XQYVcemq8CfUwSvOHlwq1TJe00hqqp-e1RzD1cKA84HDIGuv8&usqp=CAU',
                            address: 'Neukirchener Str.,44 Krefeld 47829',
                            telephoneImg: 'https://png.pngtree.com/element_our/png_detail/20190103/smartphone-line-black-icon-png_309255.jpg',
                            telephone: '+4917687030532',
                            telegram: '+380677709362 (Telegram, WhatsApp, Viber)'
                        },
                    skills: [
                        'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Redux', 'Style Components', 'React Testing Library',
                        'Node.js', 'Nest.js', 'Express.js', 'MySQL', 'MongoDB', 'TypeORM', 'Stripe', 'AWS', 'Firebase',
                        'GitHub/GitLab actions', 'Heroku', 'Swagger'
                    ],
                    languages: [
                        // 'Englisch (B2)', 'Deutsch (A2)', 'Polnisch(A2)'
                        'Englisch (B2)', 'Deutsch (A2 Ich setze meine Teilnahme am Integrationskurs fort)', 'Polnisch(A2)'
                    ],
                    profil1: 'Durch meine umfangreiche Erfahrung habe ich ein\n' +
                        'großes Knowhow in der Entwicklung und Erstellung\n' +
                        'von MVPs sowie in der Gestaltung umfangreicher\n' +
                        'Softwarearchitekturen und Web-Apps entwickelt.',
                    profil2: 'Angetrieben von umfassenden Kenntnissen der\n' +
                        'wichtigsten Browser und Webkonzepte verfüge ich über\n' +
                        'eine solide Grundlage im Bereich UX-Design.',
                    // profil1: 'Wide experience made me strong in creating MVPs, building\n' +
                    //     'large-scale software architecture, and designing web apps.',
                    // profil2: 'Driven by a comprehensive knowledge of key browser and\n' +
                    //     'webconcepts, strong UX design basis.',
                    workExperience: [
                        {
                            position: 'FULL STACK DEVELOPER',
                            company: 'Skilliant',
                            // company: 'Agilely',
                            typeWork: 'Fernarbeit',
                            years: 'Feb 2021 - Feb 2022',
                            description: [
                                // {whatDo: 'As a skilled developer, I have experience working with avariety of\n' +
                                //         'cutting-edge technologies including React, Node, Figma, Strapi,\n' +
                                //         'Firebase, Jira, and Codecept.\n' +
                                //         'I have successfully developed and deployed multiple web\n' +
                                //         'applications using React as the primary front-end framework.I have\n' +
                                //         'utilized Node.js to build scalable and effi cient back-end systems to\n' +
                                //         'support these applications. My profi ciency with Figma has allowed\n' +
                                //         'me to design intuitive and user-friendly interfaces for these\n' +
                                //         'applications, while my expertise with Strapi has facilitated the\n' +
                                //         'creation of robust content management systems.\n' +
                                //         'I am also well-versed in Firebase, which I have used to build\n' +
                                //         'and deploy real-time applications with ease. I have experience\n' +
                                //         'working with Jira to manage project workfl ows and Codecept for\n' +
                                //         'effi cient and reliable end-to-end testing.\n' +
                                //         'Overall, my profi ciency in these technologies has enabled me to\n' +
                                //         'develop high-quality web applications that meet the\n' +
                                //         'needs of clients and end-users alike'},
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
                            position: 'FRONT END DEVELOPER',
                            company: 'Freiberuflich',
                            // company: 'Freelance',
                            // typeWork: 'Remote',
                            typeWork: 'Fernarbeit',
                            years: 'Jun 2020 - Feb 2021',
                            description: [
                                // {whatDo: 'Frontend developer. I was engaged in the development of\n' +
                                //         'websites for customers from different countries from scratch\n' +
                                //         'to hosting'},
                                {whatDo: 'Erledigung von Aufträgen mithilfe von React.'},
                                {whatDo: 'Gestaltete Websites mit HTML und CSS für die Front-End-Entwicklung.'}
                            ],
                        },
                        {
                            position: 'GESTALTUNG VON DESIGNERIN',
                            company: 'White Story',
                            typeWork: 'Arbeit als selbstständige Schneiderin',
                            years: 'Sep 2019 - Jun 2020',
                            description: [
                                {whatDo: ''}
                                // {whatDo: 'Dieses Projekt hat mir Kreativität beigebracht.'}
                            ],
                        },
                        {
                            position: 'MAßSCHNEIDERIN',
                            company: 'Arbeit als selbstständige Schneiderin',
                            typeWork: 'Lwiw',
                            years: 'Des 2008 - Sep 2019',
                            description: [
                                {whatDo: ''}
                                // {whatDo: 'Diese Arbeit hat mich gelehrt, mit Menschen zusammenzuarbeiten und ' +
                                //         'verschiedene Probleme zu lösen.'}
                            ],
                        },
                        {
                            position: 'KLEIDUNGSDESIGNER',
                            company: 'Rolada',
                            typeWork: 'Lwiw',
                            years: 'Sep 2007 - Des 2008',
                            description: [
                                {whatDo: ''}
                            ],
                        },
                        {
                            position: 'KLEIDUNGSDESIGNER ASSISTENT',
                            company: 'LvivTex (Dänische Fa., Filiale Lviv)',
                            typeWork: 'Lwiw',
                            years: 'Jun 2005 - Sep 2007',
                            description: [
                                {whatDo: ''}
                            ],
                        },
                        {
                            position: 'NÄHERIN IN DER EXPERIMENTELLEN ABTEILUNG',
                            company: 'LvivTex (Dänische Fa., Filiale Lviv)',
                            typeWork: 'Lwiw',
                            years: 'Mar 2004 - Jun 2005',
                            description: [
                                {whatDo: ''}
                            ],
                        },
                        {
                            position: 'NÄHERIN IN DER MASSENPRODUKTION',
                            company: 'HRTTextile (Dänische Fa., Filiale Lviv)',
                            typeWork: 'Lwiw',
                            years: 'Sep 2003 - Mar 2004',
                            description: [
                                {whatDo: ''}
                            ],
                        }
                    ],
                    education: [
                        {
                            study: 'FULL STACK DEVELOPER',
                            university: 'Okten School',
                            // city: 'Lviv',
                            city: 'Lwiw',
                            years: 'Jun 2021 - Jan 2022'
                        },
                        {
                            study: 'MODEDESIGNER',
                            university: 'Nationale Universität für Technologie und Design Kiew',
                            city: 'Kiew',
                            // study: 'DESIGNER OF CLOTHERS',
                            // university: 'Kyiv National University of Technology and Design.',
                            // city: 'Kyiv',
                            years: ' Sep 2002 - Jan 2006'
                        },
                        {
                            // study: 'DESIGNER OF CLOTHES',
                            study: 'MODEDESIGNER',
                            // university: 'L\'viv College of Fashion Industry',
                            university: 'Lwiw College für Modeindustrie',
                            city: 'Lwiw',
                            years: 'Sep 2000 - Jan 2003'
                        }
                    ]
                },
            ];


            // const myData = [
            //     {
            //         position: 'LKW-FAHRER',
            //         firstName: 'VOLODYMYR',
            //         lastName: 'MALITSKYY',
            //         myImage: 'https://i.ibb.co/5GXZjv6/photo-2023-09-10-18-12-57.jpg',
            //         contacts:
            //             {
            //                 emailImg: 'https://previews.123rf.com/images/jenjawin/jenjawin1904/jenjawin190400761/121278474-envelope-icon-vector-grey-envelope-email-icon.jpg',
            //                 email: 'malitskiy1204@gmail.com',
            //                 addressImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCcPUi5Wcj8K5Zck40C0XQYVcemq8CfUwSvOHlwq1TJe00hqqp-e1RzD1cKA84HDIGuv8&usqp=CAU',
            //                 address: 'Neukirchener Str.,44 Krefeld 47829',
            //                 telephoneImg: 'https://png.pngtree.com/element_our/png_detail/20190103/smartphone-line-black-icon-png_309255.jpg',
            //                 telephone: '+487959902789',
            //                 // telegram: '+380677709362 (Telegram, WhatsApp, Viber)'
            //             },
            //         skills: [
            //             'Fahrzeugführung', 'Erfahrung im Fahren verschiedener Fahrzeugtypen', 'Verantwortungsbewusstsein',
            //             'Pünktlichkeit und Zuverlässigkeit', 'Routenplanung und Navigation', 'Ladungssicherung',
            //             'Kommunikation', 'Technische Kenntnisse', 'Führerschein der Klasse B, D, C, E'
            //         ],
            //         languages: [
            //             'Ukrainisch (Mutterspasche)', 'Deutsch(Grundkenntnisse)', 'Polnisch(Grundkenntnisse)'
            //         ],
            //         profil1: 'Mit meinen 21 Jahren Erfahrung im Fahren von Lastwagen und Bussen habe ich umfangreiche' +
            //             ' Kenntnisse und Erfahrungen in diesem Bereich gesammelt. Mein fahrerisches Können ist auf einem' +
            //             ' hohen Niveau, und ich beherrsche das Fahren verschiedener Arten von Fahrzeugen in verschiedenen' +
            //             ' Verkehrssituationen.In meinem Portfolio finden sich erfolgreiche abgeschlossene Routen,' +
            //             ' darunter Langstreckenreisen, innerstädtische Transporte und verschiedene Arten von' +
            //             ' Frachttransporten. ',
            //         profil2: ' Ich genieße einen einwandfreien Ruf in Bezug auf die Einhaltung von Sicherheitsvorschriften ' +
            //             'und Verkehrsregeln.Darüber hinaus verstehe ich es, effektiv mit Kunden zu kommunizieren,' +
            //             ' erstklassigen Service zu bieten und immer pünktlich und termingerecht zu liefern. Mit meiner' +
            //             ' Erfahrung und meinem professionellen Ansatz bin ich bereit, jede Aufgabe als Lastwagen- und ' +
            //             'Busfahrer zu bewältigen.',
            //         workExperience: [
            //             {
            //                 position: 'Lkw-fahrer',
            //                 company: 'Sara-Pack',
            //                 typeWork: 'Lublinec Poland',
            //                 years: 'Dec 2017 - Jezt',
            //                 description: [
            //                     {whatDo: 'Fahrtätigkeiten.'},
            //                     {whatDo: 'Fahrzeugpflege und -wartung.'},
            //                     {whatDo: 'Dokumentation und Berichterstattung.'},
            //                     {whatDo: 'Einhaltung der Verkehrsvorschriften.'},
            //                     {whatDo: 'Kommunikation mit Disponenten und Kunden.'},
            //                     {whatDo: 'Sicheres Verladen und Entladen von Gütern.'},
            //                 ],
            //             },
            //             {
            //                 position: 'Selbstständiger Frachtführer',
            //                 company: 'Einzelunternehmer Malitsky',
            //                 typeWork: 'Lwiw',
            //                 years: 'Okt 2010 - Dec 2017',
            //                 description: [
            //                     {whatDo: 'Ich führte ein unternehmerisches Unternehmen.'},
            //                     {whatDo: 'Ich war in der Logistik tätig.'},
            //                     {whatDo: 'Ich führte Frachttransporte durch.'},
            //                     {whatDo: 'Kommunikation mit Kunden.'},
            //                     {whatDo: 'Sichere Beladung und Entladung der Fracht.'}
            //                 ],
            //             },
            //             {
            //                 position: 'Busfahrer',
            //                 company: 'Privatfirma',
            //                 typeWork: 'Lwiw',
            //                 years: 'Jul 2009 - Okt 2010',
            //                 description: [
            //                     {whatDo: 'Ich führte Transporte mit einem Linienbus durch.'},
            //                     {whatDo: 'Eigentümer des Busses.'},
            //                 ],
            //             },
            //             {
            //                 position: 'Fahrer-Spediteur',
            //                 company: 'Troja-Lwiw',
            //                 typeWork: 'Lwiw',
            //                 years: 'Sep 2004 - Jul 2009',
            //                 description: [
            //                     {whatDo: 'Verteilung von Gemüse und Obst in Geschäften.'},
            //                     {whatDo: 'Sichere Verladung und Entladung.'},
            //                     {whatDo: 'Kommunikation mit Kunden.'}
            //                 ],
            //             },
            //             {
            //                 position: 'Taxifahrer',
            //                 company: 'Ekonom-taxi',
            //                 typeWork: 'Lwiw',
            //                 years: 'Okt 1999 - Sep 2004',
            //                 description: [
            //                     {whatDo: ''}
            //                 ],
            //             }
            //         ],
            //         education: [
            //             {
            //                 study: '',
            //                 university: 'Sekundarschule',
            //                 city: 'Lwiw',
            //                 years: 'Sep 1986 - Jan 1997'
            //             }
            //         ]
            //     },
            // ]

            const options = {
                format: 'A4', // Формат сторінки (наприклад, A4)
                width: '8.5in', // Ширина сторінки
                height: '18in' // Висота сторінки (більша висота для збільшення довжини)
            };
            pdf.create(pdfTemplate({myData}), options).toFile('CV.pdf', (err) => {
                // pdf.create(pdfTemplate({myData}), options).toFile('resume.pdf', (err) => {
                if (err) {
                    return res.status(500).send('Error generating PDF');
                }

                // Send the generated PDF as a response
                return res.sendFile('CV.pdf', {root: '.'});
                // return res.sendFile('resume.pdf', {root: '.'});
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


