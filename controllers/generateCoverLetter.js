// const fs = require('fs');
// const path = require('path');
const pdf = require('html-pdf');
const pdfTemplate = require('../coverLetter');
// const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');


module.exports = {
    generateCoverLetter: async (req, res, next) => {
        const myCover = [
            {
                name: 'NATALIIA MALITSKA',
                street: 'Neukirchener Str., 44',
                city: '47829 Krefeld',
                phone: '+4917687030532',
                email: 'nataliiamalitska.dev@gmail.com',
                // email: 'vns122716@gmail.com',
                company: [
                    {
                        name: 'Casculate GmbH',
                        contactPerson : 'Emine Topcu',
                        // address: 'ThyssenKrupp Allee, 1',
                        city: 'Remote (Germany)'
                        // city: 'Düsseldorf'
                    }
                ],
                data: 'Krefeld, 23/09/2023',
                // header: 'Frontend React Engineer',
                header: 'Working Student Front-End Development with React(M/F/D)',
                // header: 'Bewerbung als „Berufsbezeichnung“ (diese ist der Stellenanzeige zu entnehmen)',
                start: 'Sehr geehrte Emine Topcu,',
                // start: 'Sehr geehrte Damen und Herren,',
                first: 'ich bin ein qualifizierter Full Stack Developer mit anderthalb Jahren Erfahrung.Aktuell bin ich' +
                    ' auf der Suche nach einer Teilzeitstelle (da ich vormittags Deutschkurse besuche) oder Vollzeit' +
                    ' (Tailzeit im Büro, Tailzeit von zu Hause). Ich bringe Ihrem ' +
                    // ' (Tailzeit im Büro, Tailzeit von zu Hause) mit der' +
                    // ' Perspektive einer Ausbildung. Ich bringe Ihrem ' +
                    'Unternehmen einen großen Mehrwert durch mein fundiertes Verständnis von Programmierung und meine ' +
                    'Motivation, innovative Webanwendungen zu entwickeln. Als teamorientierter arbeite ich' +
                    ' effektiv in einem Team und trage zum gemeinsamen Erfolg bei. Ich bin belastbar und bereit, ' +
                    'Herausforderungen anzunehmen. Zudem beherrsche ich effektives Zeitmanagement. Dadurch bin ich in ' +
                    'der Lage, Aufgaben termingerecht zu erledigen und gesetzte Ziele zu erreichen. Mit diesen' +
                    ' Fähigkeiten bin ich ein zuverlässiges und produktives Mitglied Ihres Teams.',
                second: 'Als Entwickler habe ich Erfahrung in der Arbeit mit einer\n' +
                    'Vielzahl von modernen Technologien, darunter React, Node, Figma,\n' +
                    'Strapi, Firebase, Jira und Codecept.\n' +
                    'Ich habe erfolgreich mehrere Webanwendungen entwickelt und\n' +
                    'bereitgestellt, wobei React als primäres Front-End-Framework\n' +
                    'verwendet wurde. Zur Unterstützung dieser Anwendungen habe ich\n' +
                    'Node.js genutzt, um skalierbare und effi ziente Backend-Systeme zu\n' +
                    'entwickeln. Meine Fähigkeiten in Figma haben es mir ermöglicht,\n' +
                    'intuitive und benutzerfreundliche Oberflächen für diese\n' +
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
                fourth: 'Ich freue mich darauf, meine Erfahrungen und Qualifikationen' +
                    ' in einem persönlichen Gespräch näher zu erläutern. Ich bin überzeugt davon, dass ich als Full' +
                    ' Stack Developer einen wesentlichen Mehrwert für Ihr Unternehmen bieten kann.',
                finish: 'Mit freundlichen Grüßen',
                sign: 'https://i.ibb.co/1JN1GHv/sign.png',
                signature: 'Nataliia Malitska'
            }
        ]

        // const myCover = [
        //     {
        //         name: 'VOLODYMYR MALITSKYY',
        //         street: 'Neukirchener Str., 44',
        //         city: '47829 Krefeld',
        //         phone: '+487959902789',
        //         email: 'malitskiy1204@gmail.com',
        //         company: [
        //             {
        //                 name: 'Brockmann-Holz GmbH',
        //                 // contactPerson : 'Contact persone',
        //                 // address: 'Uerdingen',
        //                 city: 'Krefeld'
        //                 // city: 'Düsseldorf'
        //             }
        //         ],
        //         data: 'Krefeld, 20/09/2023',
        //         header: 'Berufskraftfahrer/in',
        //         start: 'Sehr geehrte Damen und Herren,',
        //         first: 'ich besitze Führerscheine der Kategorien B, D, C und E sowie 21 Jahre Berufserfahrung im Bereich' +
        //             ' Transport und Logistik. Als leidenschaftlicher Berufsfahrer verfüge ich über umfangreiche Kenntnisse' +
        //             ' im Umgang mit verschiedenen Fahrzeugtypen, einschließlich Lastwagen und Bussen. Ich habe' +
        //             ' erfolgreich zahlreiche Langstrecken- und Nahverkehrsrouten bewältigt und verfüge über ein tiefes ' +
        //             ' Verständnis für die Einhaltung der Verkehrsregeln und Sicherheitsvorschriften.',
        //         second: 'Seit Beginn meiner Berufslaufbahn fahre ich unfallfrei, ich habe ein fundiertes Wissen über die' +
        //             ' Straßenverkehrsregeln und Sicherheitsvorschriften. Während meiner langjährigen Karriere habe ich' +
        //             ' stets pünktliche und zuverlässige Transportdienstleistungen erbracht. Ich bin in der Lage, sowohl' +
        //             ' eigenständig als auch im Team zuarbeiten und bin stets bereit, neue Herausforderungen anzunehmen.' +
        //             ' Mein Engagement für effizientes Zeitmanagement ermöglicht es mir, Frachten termingerecht' +
        //             ' zuzustellen und die gesetzten Ziele zu erreichen.',
        //         third: 'Ich lege ich großen Wert auf die Pflege und Wartung meiner Fahrzeuge, um sicherzustellen, dass' +
        //             ' sie stets in einwandfreiem Zustand sind. Mein Fokus liegt auf der Sicherheit von Passagieren und ' +
        //             ' Fracht. Ich bin geschult im sicheren Verladen und Entladen von Gütern.',
        //         fourth: 'Mit meinem umfassenden Erfahrungsschatz als Fahrer bin ich überzeugt, dass ich einen wertvollen' +
        //             ' Beitrag zu Ihrem Unternehmen leisten kann. Derzeit suche ich aktiv nach Arbeit und bin bereit, sofort' +
        //             ' anzufangen. Ich bin auch bereit, dazuzulernen und meine Fähigkeiten weiter zu verbessern, um ein noch' +
        //             ' besserer Berufsfahrer zu sein. Ich freue mich darauf, meine Fähigkeiten und Qualifikationen in einem' +
        //             ' persönlichen Gespräch näher zu erläutern.',
        //         // fourth: 'Mit meinem umfassenden Erfahrungsschatz als Fahrer bin ich überzeugt, dass ich einen wertvollen' +
        //         //     ' Beitrag zu Ihrem Unternehmen leisten kann. Derzeit suche ich aktiv nach Arbeit und bin bereit,' +
        //         //     ' sofort anzufangen. Ich bin auch bereit, dazuzulernen und meine Fähigkeiten weiter zu verbessern, ' +
        //         //     ' um ein noch besserer Berufsfahrer zu sein. Ich freue mich darauf, meine Fähigkeiten und ' +
        //         //     ' Qualifikationen in einem persönlichen Gespräch näher zu erläutern.',
        //         finish: 'Mit freundlichen Grüßen',
        //         sign: 'https://i.ibb.co/wgGvpk7/photo-2023-09-10-18-54-28-removebg-preview-2.png',
        //         signature: 'Volodymyr Malitskyy'
        //     }
        // ]

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


