const {Configuration, OpenAIApi} = require("openai");
module.exports = {
  generateContentList: async (subtitle,chapter) => {
    let configuration = new Configuration({
      apiKey: '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',
    });
    let openai = new OpenAIApi(configuration);

    let completion = await openai.createChatCompletion({
      messages: [
        {
          "role": "user",
          "content":
            `Now write me  list with 5 items with this subsection: ${subtitle} in this section:${chapter}  of this book on the topic: "The Adventures of Captain Jack Sparrow`
        }
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.data.choices[0].message.content);
    const result = completion.data.choices[0].message.content.split('\n').map(item => item = {
      id: item.split('.')[0],
      title: item.split('.')[1]
    })


    return result
  }
}
