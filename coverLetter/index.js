module.exports = (data) => {
    console.log(data, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
          body{
            box-sizing: border-box;
            margin: 0;
            padding: 100px;
          }
          .name {
            text-align: center;
            font-size: 36px;
            color: grey;
            padding-bottom: 20px;
          }
          .contact {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            -webkit-box-pack: center; /* wkhtmltopdf uses this one */
            justify-content: center;
          }
          .checkList {
            width: 5px;
            height: 5px;
            background: #918d8d;
            margin: 7px 10px 10px;
          }
          .companyBox {
            margin: 50px 0;
          }
          .company {
            font-size: 20px;
          }
          .data {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            -webkit-box-pack: end; /* wkhtmltopdf uses this one */
            justify-content: end;
            font-size: 20px;
            margin-bottom: 25px;
          }
          .header {            
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            -webkit-box-pack: center; /* wkhtmltopdf uses this one */
            justify-content: center;
            font-size: 28px;
            margin-bottom: 20px;
          }
          .start {
            font-size: 20px;
            margin-bottom: 15px;
          }
          .text {
            font-size: 20px;
            margin-bottom: 20px;
          }
          .image {
            width: 100px;
            height: 50px;
          }
        </style>
      </head>
      <body>
         <div>
          ${data.myCover.map((data) => `

               <div class="name">${data.name}</div>
               <div class="contact">
                  <div>${data.street}</div>
                  <div class="checkList"></div>
                  <div>${data.city}</div>
                  <div class="checkList"></div>
               </div>
               <div class="contact">
                  <div>${data.phone}</div>
                  <div class="checkList"></div>
                  <div>${data.email}</div>
               </div>
               
               
                   ${data.company.map((companyDet) => `
                    <div class="companyBox">
                      <div class="company">${companyDet.name}</div>
                      <div class="company">${companyDet.contactPerson}</div>
                      <div class="company">${companyDet.address}</div>
                      <div class="company">${companyDet.city}</div>
                    </div>
                    `).join('')} 
                        
               <div class="data">${data.data}</div>
               
               <div class="header">${data.header}</div>
               
               <div class="start">${data.start}</div>
               
               <div class="text">${data.first}</div>
               <div class="text">${data.second}</div>
               <div class="text">${data.third}</div>
               <div class="text">${data.fourth}</div>
               <div class="text">${data.finish}</div>
               
               <img class="image" src="${data.sign}" alt="" /> 
               <div>${data.signature}</div>
               


          `).join('')}
        </div>
      </body>
    </html>
  `;
};

