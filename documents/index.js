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
          .mainHeader {
            height: 250px;
            border-bottom: 2px solid lightgray;
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            -webkit-box-pack: justify; /* wkhtmltopdf uses this one */
            justify-content: space-between;
            padding: 0;
            padding-bottom: 15px;
          }
          .main {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box; /* wkhtmltopdf uses this one */
            -webkit-box-pack: justify; /* wkhtmltopdf uses this one */
            justify-content: space-between;
          }
          
          .headerLeft {
            width: 40%;
          }
          
          .position {
            font-size: 18px;
          }
          
          .name {
            width: 100%;
            font-weight: 600;
            font-size: 65px;
            font-family: "Libre Bodoni",serif,"Noto Serif SC","Noto Serif JP";
            letter-spacing: 2px;
            color: #3d4042;
            text-transform: uppercase;
            display: flex;
            flex-direction: column;
          }
          
          .headerRight {
            width: 200px;
            /*width: 180px;*/
            height: 230px;
            overflow: hidden;
            position: relative;
          }
          
          .image {
            /*width: 290px;*/
            /*height: 330px;*/
            width: 260px;
            height: 280px;
            left: 50%;
            margin-left: -135px;
            /*margin-left: -150px;*/
            position: absolute;
          }
          
          .title {
            font-size: 20px;
            letter-spacing: 2px;
            padding-bottom: 20px;
          }
          
          .mainLeft {
            width: 35%;
            padding: 50px 30px 30px 0;
          }
          
          .mainContact {
            padding-bottom: 40px;
            border-bottom: 2px solid lightgray; 
          }
          
          .boxContact {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box;
            word-break: break-all;
            margin-right: 40px;
            margin-bottom: 10px;
          }
          
          .imageContact {
            width: 20px;
            height: 20px;
            margin-right: 5px;
          }
          
          .imageContactHouse {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            padding-left: 2px;
          }
          
          .contactText {
            font-size: 16px;
          }
          
          .mainSkills {
            padding-top: 40px;
            border-bottom: 2px solid lightgray;
          }
          
          ul {
            list-style-type: none;
            padding: 0;
            color: black;
          }
          
          .containerLi {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box;
            align-items: center;
            justify-content: center;
          }
          .checkList {
            width: 5px;
            height: 5px;
            margin-top: 7px;
            margin-right: 10px;
            background: #918d8d;
          }
          .skills {
            font-size: 18px;
            /*font-weight: 600;*/
            color: black;
            margin-bottom: 10px;
          }
          
          .mainLanguage {
            padding-top: 40px;
          }
          
          .mainRight {           
            width: 54%;
            padding-top: 10px;
            padding-left: 50px;
            border-left: 2px solid lightgray;
            padding-right: 100px;
          }
          
          .mainToDo {
            padding-top: 40px;
            padding-bottom: 10px;
            border-bottom: 2px solid lightgray;
          }  
          
          .profil {
            width: 100%;
            margin-top: 40px;
            padding-bottom: 40px;
            border-bottom: 2px solid lightgray;            
          }
          
          .profilText1 {
            padding-bottom: 10px;
            font-size: 20px;
            color: #414040;
          } 
          
          .profilText2 {
            font-size: 16px;
            font-weight: 600;
            color: black;
          } 
          
          .myPosition {
            font-size: 16px;
            font-weight: bold;
            color: black;
            padding-bottom: 8px;
            padding-top: 5px;
          }
          
          .aboutWorkCompany {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box;
            padding: 0;
          }
          
          .company {
            font-size: 15px;
            font-weight: bold;
            color: black;
          }
          
          .typeWork {
            padding: 0 6px;
            border-right: 1px solid black;
            color: #414040;
          }
          
          .years {
            padding: 0 5px;
          }
          
          .toDo {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box;
            align-items: center;
            justify-content: center;
            padding-bottom: 5px;
            color: grey;
          }
          
          .study {
            font-size: 16px;
            font-weight: bold;
            color: black;
            padding-top: 5px;
          }
          
          .aboutEducation {
            display: flex;
            flex-wrap: wrap;
            display: -webkit-box;
            padding: 0;
            padding-bottom: 10px;
          }
          
          .city {
            padding-right: 6px;
            border-right: 1px solid black;
          }
            
        </style>
      </head>
      <body>
        <div class="mainHeader">
          ${data.myData.map((data) => `
            <div class="headerLeft">
               <div class="position">${data.position}</div>
               <div class="name">${data.firstName}</div>
               <div class="name">${data.lastName}</div>
            </div>
            <div class="headerRight">
<!--               <img class="image" src="file:///C:/Users/admin/WebstormProjects/Project/CV/img/photo_2023-06-04_23-06-39.jpg" alt="" /> -->
               <img class="image" src="${data.myImage}" alt="" /> 
            </div>
          `).join('')}
        </div>
        
                
        <div class="main">
        
         <div class="mainLeft">
            <div class="mainContact">
                <div class="title">KONTAKTDATEN</div>
                <!--          <div class="title">CONTACT INFORMATION</div>-->

                ${data.myData.map((data) => `
                <div class="boxContact">
                  <img class="imageContact" src="${data.contacts.emailImg}" alt="" />
                  <div class="contactText">${data.contacts.email}</div>
                </div>
                <div class="boxContact">
                  <img class="imageContactHouse" src="${data.contacts.addressImg}" alt="" />
                  <div class="contactText">${data.contacts.address}</div>
                </div>
                <div class="boxContact">
                  <img class="imageContact" src="${data.contacts.telephoneImg}" alt="" />
                  <div class="contactText">${data.contacts.telephone}</div>
                </div>
                ${data.contacts.telegram ? `
                <div class="boxContact">
                  <img class="imageContact" src="${data.contacts.telephoneImg}" alt="" />
                  <div class="contactText">${data.contacts.telegram}</div>
                </div>
              ` : ''}
              `).join('')}
            </div>
            
            <div class="mainSkills">
               <div class="title">KOMPETENZEN</div>
               <!--               <div class="title">SKILLS</div>-->
                ${data.myData.map((data) => ` <ul>
                  ${data.skills.map((skill) => `
                    <div class="containerLi">
                      <div class="checkList"></div>
                      <li class="skills">${skill}</li>
                    </div>

                   `).join('')}
                  </ul>
                `).join('')}
            </div>
            
            <div class="mainLanguage">
              <div class="title">SPRACHKENNTNISSE</div>
              <!--            <div class="title">LANGUAGES</div>-->
                ${data.myData.map((data) => ` <ul>
                  ${data.languages.map((language) => `
                    <div class="containerLi">
                      <div class="checkList"></div>
                      <li class="skills">${language}</li>
                    </div>

                  `).join('')}
                  </ul>

                `).join('')}
            </div>
                             
         </div>



        <div class="mainRight">
          <div class="profil">
            <div class="title">PROFIL</div>
              <div>
                ${data.myData.map((data) => `
                  <div class="profilText1">${data.profil1}</div>
                  <div class="profilText1">${data.profil2}</div>
                `).join('')}
              </div> 
            </div>
            
          <div class="mainToDo">
              <div class="title">BERUFSERFAHRUNG</div>
              <!--            <div class="title">EXPERIENCE</div>-->
              ${data.myData.map((data) => `
                ${data.workExperience.map((experience) => `
                  <div class="myPosition">${experience.position}</div>
                  <div class="aboutWorkCompany">
                    <div class="company">${experience.company}.</div>
<!--                    <div>${experience.typeWork}</div>-->
                    <div class="typeWork">${experience.typeWork}</div>
                    <div class="years">${experience.years}</div>
                  </div>
                  <ul>
                     ${experience.description.map((whatDo) => {
                       if (whatDo.whatDo.trim() !== '') {
                        return `
                         <div class="toDo">
                           <div class="checkList"></div>
                           <li>${whatDo.whatDo}</li>
                         </div>
                       `;
                        }
                       return '';
                     }).join('')}
                  </ul>
                `).join('')}
              `).join('')}
          </div>
          
          <div class="mainLanguage">
              <div class="title">AUSBILDUNG</div>
              <!--            <div class="title">EDUCATION</div>-->
              ${data.myData.map((data) => `
                ${data.education.map((education) => `
                  <div class="study">${education.study}</div>
                  <div class="company">${education.university}.</div>
                  <div class="aboutEducation">
                    <div class="city">${education.city}</div>
                    <div class="years">${education.years}</div>
                  </div>
                `).join('')}
              `).join('')}
          </div>            
        </div>            
        </div>
         
       </div>
      </body>
    </html>
  `;
};

