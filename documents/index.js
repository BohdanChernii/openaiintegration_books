module.exports = (data) => {
    console.log(data,'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
          .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          }
          .chapter {
            width: 100%;
            font-size: 30px;
            font-weight: bold;
            text-align: center;
          }
          .image {
            width: 50%;
            height: 300px;
            margin: 20px;
          }
          .subtitle {
            width: 100%;
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin: 15px;
          }
          .titleContent {
            font-size: 18px;
          }
            .text {
            font-size: 14px;
            padding: 40px;
          }
          </style>
       </head>
       <body>
         
    ${data.answer.map(chapterAndImage => `
        <div class="header">
           <div class="chapter">${chapterAndImage.id}</div>
           <img class="image" src=${chapterAndImage.image} alt="" />
        </div>
         ${chapterAndImage.subtitle.map(subtitle => `
        <div>
           <div class="subtitle">${subtitle.title}</div>
        </div>
                 ${subtitle.contentList.map(contentList => `
        <div>
           <div class="titleContent">${contentList.title}</div>
           <div class="text">${contentList.text}</div>
        </div>
    `).join('')}
    `).join('')}
    `).join('')}

       </body>
    </html>
    `;
};
