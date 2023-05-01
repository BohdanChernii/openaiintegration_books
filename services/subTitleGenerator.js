const {Configuration, OpenAIApi} = require("openai");
module.exports = {
  subTitle: async (title) => {
    let configuration = new Configuration({
      apiKey: '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',
    });
    let openai = new OpenAIApi(configuration);

    let completion = await openai.createChatCompletion({
      messages: [
        {
          "role": "user",
          "content":
            `Answer like author of books, Write me now with 5 subsections for this section ${title} of this book "The Adventures of Captain Jack Sparrow"`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const result = completion.data.choices[0].message.content.split('\n').map(item => item = {
      id: item.split('.')[0],
      subTitle: item.split('.')[1]
    })


    const text  = []
    return result

  }
}

