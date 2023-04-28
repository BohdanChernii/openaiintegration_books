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
            `Now write me the content list with 5 items with this subsection: ${subtitle} in this section:${title}  of this book on the topic: "The Adventures of Captain Jack Sparrow"`
        }
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.data.choices[0].message.content);
    return completion.data.choices[0].message.content
  }
}
