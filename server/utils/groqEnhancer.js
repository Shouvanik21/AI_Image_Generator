const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const enhancePromptWithGroq = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are an expert AI image prompt engineer.

Rewrite the user's prompt into a professional image generation prompt.

Rules:
- Keep the original meaning.
- Make it more detailed.
- Add cinematic lighting.
- Add composition.
- Add realism.
- Return ONLY the rewritten prompt.
`,
        },

        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.log(error);

    return prompt;
  }
};

module.exports = enhancePromptWithGroq;
