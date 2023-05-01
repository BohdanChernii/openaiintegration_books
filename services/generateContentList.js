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
            `Now write me  list with 3 items with this subsection: ${subtitle} in this section:${chapter}  of this book on the topic: "The Adventures of Captain Jack Sparrow`
        }
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.data.choices[0].message.content);
    const result = completion.data.choices[0].message.content.split('\n').map(item => item = {
      id: item.split('.')[0],
      title: item.split('.')[1]
    })

    console.log(result);
    const text  = []
    return result
  }
}
