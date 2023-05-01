const {Configuration, OpenAIApi} = require("openai");
module.exports = {
  endTheText: async (subtitle,title) => {
    let configuration = new Configuration({
      apiKey: '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',
    });
    let openai = new OpenAIApi(configuration);

    let completion = await openai.createChatCompletion({
      messages: [
        {
          "role": "user",
          "content":
          `Is this that's with this ${subtitle} in this ${title} of this book on the topic: "The Adventures of Captain Jack Sparrow"`
        }
      ],
      model: "gpt-3.5-turbo",
    });
    return completion.data.choices[0].message.content
  }
}
