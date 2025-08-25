import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

export const generateMVPCode = async (predictionStatement) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: `You are an expert full-stack developer. Generate a complete MVP codebase based on the given prediction statement. 
          Return a JSON object with the following structure:
          {
            "files": [
              {
                "path": "package.json",
                "content": "..."
              },
              {
                "path": "index.html", 
                "content": "..."
              },
              {
                "path": "src/main.js",
                "content": "..."
              }
            ],
            "description": "Brief description of the MVP",
            "techStack": ["React", "Vite", "etc"]
          }
          
          Keep it simple but functional. Use modern web technologies like React, Vite, and vanilla CSS.`
        },
        {
          role: "user",
          content: `Generate an MVP for this prediction: "${predictionStatement}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })

    return JSON.parse(completion.choices[0].message.content)
  } catch (error) {
    console.error('Error generating MVP:', error)
    throw error
  }
}