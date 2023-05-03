const {Configuration, OpenAIApi} = require("openai");
module.exports = {
  subTitle: async (chapter) => {
    let configuration = new Configuration({
      apiKey: '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',
    });
    let openai = new OpenAIApi(configuration);

    let completion = await openai.createChatCompletion({
      messages: [
        {
          "role": "user",
          "content":
            `Answer like author of books, Write me now with 5 subsections for this section ${chapter} of this book "The Adventures of Captain Jack Sparrow"`
        }
      ],
      model: "gpt-3.5-turbo",
    });

    const result = completion.data.choices[0].message.content.split('\n').map(item => item = {
      id: item.split('.')[0],
      title: item.split('.')[1]
    })

    console.log(result);
    const text  = []
    return result

  }
}

