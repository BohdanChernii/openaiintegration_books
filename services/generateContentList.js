const {Configuration, OpenAIApi} = require("openai");
module.exports = {
  generateContentList: async (subtitle,title) => {
    let configuration = new Configuration({
      apiKey: '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',
    });
    let openai = new OpenAIApi(configuration);

    let completion = await openai.createChatCompletion({
      messages: [
        {
          "role": "user",
          "content":
            `Now write me  list with 5 items with this subsection: ${subtitle} in this section:${title}  of this book on the topic: "The Adventures of Captain Jack Sparrow`
        }
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.data.choices[0].message.content);
    const result = completion.data.choices[0].message.content.split('\n').map(item => item = {
      id: item.split('.')[0],
      description: item.split('.')[1]
    })

    console.log(result);
    const text  = []
    return result
  }
}
