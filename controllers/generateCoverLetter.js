const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
const pdfTemplate = require('../coverLetter');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');


module.exports = {
    generateCoverLetter: async (req, res, next) => {
        const myCover = [
            {
                name: 'NATALIA MALITSKA',
                street: 'Neukirchener Str., 44',
                city: '47829 Krefeld',
                phone: '+4917687030532',
                email: 'vns122716@gmail.com',
                company: [
                    {
                        name: 'FIRMA',
                        contactPerson : 'Ansprechpartner',
                        address: 'Straße oder Postfach',
                        city: 'PLZ und Ort'
                    }
                ],
                data: 'Krefeld, 0/0/2023',
                header: 'Bewerbung als „Berufsbezeichnung“ (diese ist der Stellenanzeige zu entnehmen)',
                start: 'Sehr geehrte Damen und Herren,',
                first: 'Ich bin ein qualifizierter Full Stack Developer mit anderthalb Jahren Erfahrung. Ich bringe Ihrem ' +
                    'Unternehmen einen großen Mehrwert durch mein fundiertes Verständnis von Programmierung und meine ' +
                    'Motivation, innovative Webanwendungen zu entwickeln. Als teamorientierter Spieler arbeite ich' +
                    ' effektiv in einem Team und trage zum gemeinsamen Erfolg bei. Ich bin belastbar und bereit, ' +
                    'Herausforderungen anzunehmen. Zudem beherrsche ich effektives Zeitmanagement. Dadurch bin ich in ' +
                    'der Lage, Aufgaben termingerecht zu erledigen und gesetzte Ziele zu erreichen. Mit diesen' +
                    ' Fähigkeiten bin ich ein zuverlässiges und produktives Mitglied Ihres Teams.',
                second: 'Als erfahrener Entwickler habe ich Erfahrung in der Arbeit mit einer\n' +
                    'Vielzahl von modernen Technologien, darunter React, Node, Figma,\n' +
                    'Strapi, Firebase, Jira und Codecept.\n' +
                    'Ich habe erfolgreich mehrere Webanwendungen entwickelt und\n' +
                    'bereitgestellt, wobei React als primäres Front-End-Framework\n' +
                    'verwendet wurde. Zur Unterstützung dieser Anwendungen habe ich\n' +
                    'Node.js genutzt, um skalierbare und effi ziente Backend-Systeme zu\n' +
                    'entwickeln. Meine Fähigkeiten in Figma haben es mir ermöglicht,\n' +
                    'intuitive und benutzerfreundliche Oberfl ächen für diese\n' +
                    'Anwendungen zu gestalten, während meine Expertise in Strapi zur\n' +
                    'Erstellung robuster Content-Management-Systeme beigetragen\n' +
                    'hat.\n' +
                    'Darüber hinaus bin ich mit Firebase bestens vertraut und habe es\n' +
                    'verwendet, um Echtzeit-Anwendungen problemlos zu entwickeln\n' +
                    'und bereitzustellen. Ich habe Erfahrung in der Arbeit mit Jira zur\n' +
                    'Verwaltung von Projekt-Workfl ows und mit Codecept für effi ziente\n' +
                    'und zuverlässige End-to-End-Tests.\n' +
                    'Insgesamt hat meine Kompetenz in diesen Technologien es mir\n' +
                    'ermöglicht, hochwertige Webanwendungen zu entwickeln, die den\n' +
                    'Anforderungen von Kunden und Endbenutzern gleichermaßen\n' +
                    'gerecht werden.',
                third: 'Ich habe einen Hochschulabschluss im Bereich Design, der es mir ermöglicht, die Bedürfnisse der' +
                    ' Benutzer entsprechend der aktuellen Trends und Modeströmungen besser zu verstehen. Zusätzlich habe' +
                    ' ich erfolgreich einen intensiven Programmierkurs absolviert, in dem ich Kenntnisse in Technologien' +
                    ' wie HTML, CSS, JavaScript, MySQL, MongoDB, Node.js, Express.js, React, Angular, Nest.js, Docker' +
                    ' und AWS erworben habe. Derzeit erweitere ich mein Wissen durch Kurse in Deutsch und Englisch.',
                fourth: 'Vielen Dank für Ihre Aufmerksamkeit. Ich freue mich darauf, meine Erfahrungen und Qualifikationen' +
                    ' in einem persönlichen Gespräch näher zu erläutern. Ich bin überzeugt davon, dass ich als Full' +
                    ' Stack Developer einen wesentlichen Mehrwert für Ihr Unternehmen bieten kann.',
                finish: 'Mit freundlichen Grüßen',
                sign: 'https://i.ibb.co/1JN1GHv/sign.png',
                signature: 'Natalia Malitska'
            }
        ]

        try {
            const options = {
                format: 'A4', // Формат сторінки (наприклад, A4)
                width: '8.5in', // Ширина сторінки
                height: '13in' // Висота сторінки (більша висота для збільшення довжини)
            };
            pdf.create(pdfTemplate({myCover}), options).toFile('CoverLetter.pdf', (err) => {
                // pdf.create(pdfTemplate({myCover}), options).toFile('resume.pdf', (err) => {
                if (err) {
                    return res.status(500).send('Error generating PDF');
                }

                // Send the generated PDF as a response
                return res.sendFile('CoverLetter.pdf', {root: '.'});
                // return res.sendFile('resume.pdf', {root: '.'});
            });
        } catch (err) {
            // Handle the error
            next(err);
        }
    },
};


