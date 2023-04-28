module.exports = {
  OPENAI_TOKEN: process.env.OPENAI_TOKEN || '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',
  MODEL: process.env.MODEL || 'gpt-3.5-turbo',
  ROLE: process.env.ROLE || 'user',
  TEMPERATURE: process.env.TEMPERATURE || '0.5',
  BASE_URL:'https://api.openai.com/v1/chat/completions'
}
