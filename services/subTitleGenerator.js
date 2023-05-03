const {Configuration, OpenAIApi} = require("openai");
module.exports = {
  subTitle: async (chapter) => {
    let configuration = new Configuration({
      apiKey: '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',
      // apiKey: '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',
      // apiKey: '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',
      // apiKey: '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',
      // apiKey: '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',
    });
    let openai = new OpenAIApi(configuration);

    let completion = await openai.createChatCompletion({
      messages: [
        {
          "role": "user",
          "content":
            `Answer like author of books, Write me now with 3 subsections for this section ${chapter} of this book "The Adventures of Captain Jack Sparrow"`
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

