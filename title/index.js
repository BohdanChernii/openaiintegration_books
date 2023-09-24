module.exports = (data) => {
    console.log(data, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
          body {
            box-sizing: border-box;
            margin: 0;
            padding: 100px;
          }
          .header {
            text-align: center;
            font-size: 30px;
            border-bottom: 3px solid lightgray;
            border-top: 3px solid lightgray;
            padding: 20px 0;
            margin-bottom: 50px;
          }
          .imageBox {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            -webkit-box-pack: center; /* wkhtmltopdf uses this one */
            justify-content: center;
          }
          .image {
            width: 280px;
            /*width: 300px;*/
            height: 310px;
            /*height: 350px;*/
            border: 2px solid lightgray;
            margin-bottom: 50px;
            box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0, rgba(255, 255, 255, 0.8) -6px -2px 16px 0;
          }
          .title {
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            /*color: dimgray;*/
            margin-bottom: 25px;
          }
          .textBox {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            -webkit-box-pack: center; /* wkhtmltopdf uses this one */
            justify-content: center;
          }
          .text {
            /*width: 25%;*/
            text-align: center;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .titleTwo{
            text-align: center;
            font-size: 22px;
            font-weight: bold;
            /*color: dimgray;*/
            margin-top: 50px;            
            margin-bottom: 25px;
          }
          
        </style>
      </head>
      <body>
        <div>
          ${data.myTitle.map((data) => `

               <div class="header">BEWERBUNG</div>
               <div class="imageBox">
                 <img class="image" src="${data.image}" alt="" />
               </div>
               <div class="title">Beworbene Position:</div>
               <div class="textBox">
                 <div class="text">${data.position}</div>
               </div>
                <div class="textBox">
                 <div class="text">${data.company}</div>
               </div>
                <div class="textBox">
                 <div class="text">${data.city}</div>
               </div>
               
               <div class="titleTwo">Angaben des Bewerbers:</div>
               <div class="textBox">
                 <div class="text">${data.name}</div>
               </div>
                <div class="textBox">
                 <div class="text">${data.profil}</div>
               </div>
               
               <div class="titleTwo"></div>
               <div class="textBox">
                 <div class="text">${data.address}</div>
               </div>
                <div class="textBox">
                 <div class="text">${data.phone}</div>
               </div>
                <div class="textBox">
                 <div class="text">${data.email}</div>
               </div>
               
               <div class="titleTwo">Anlagen:</div>
               <div class="textBox">
                 <div class="text">${data.plus}</div>
               </div>
          `).join('')}
        </div>
      </body>
    </html>
  `;
};
