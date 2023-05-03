const axios = require('axios');

module.exports = {
  getImageUrl: async (text) => {
    try {
      const axiosResponse = await axios.post('https://api.replicate.com/v1/predictions', {
        "version": "9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb",
        // "version": "25d2f75ecda0c0bed34c806b7b70319a53a1bccad3ade1a7496524f013f48983",
        "input": {"prompt": `${text}`}
        // "input": {"prompt": "frog portrait wear white coat and black headphone and 3D-glasses, #pixel"}
      }, {
        headers: {
          Authorization: 'Token c8c6350f6e0d08cbf052298ba021cc5897bb239b',
        },
      });

      function myAsyncFunction() {
        return new Promise((resolve, reject) => {
          const urlImage = setTimeout(async () => {
            try {
              const imageUrl = await axios.get(`${axiosResponse.data.urls.get}`, {
                headers: {
                  Authorization: 'Token c8c6350f6e0d08cbf052298ba021cc5897bb239b',
                },
              });
              resolve(imageUrl.data.output);
            } catch (error) {
              reject(error);
            }
          }, 5000);
        });
      }

      return myAsyncFunction().then(outputValue => outputValue)
    } catch (e) {
      console.log(e);
      return e;
    }
  }
};
