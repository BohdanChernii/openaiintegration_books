const {Configuration, OpenAIApi} = require("openai");
module.exports = {
  generateText: async (subtitle,chapter,description) => {
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
            `Now write me the text with not more 10 words in format A4  this subsection: ${subtitle} in this section:${chapter} with this description: ${description}  of this book on the topic: "The Adventures of Captain Jack Sparrow"`
        }
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(completion.data.choices[0].message.content);
    return completion.data.choices[0].message.content
  }
}
