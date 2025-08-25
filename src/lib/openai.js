import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || 'demo-key',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
})

// Generate chat response
export const generateChatResponse = async (userMessage, chatHistory = []) => {
  try {
    // Prepare messages for the API
    const messages = [
      {
        role: "system",
        content: `You are PredictionForge AI, an assistant for a platform where users submit app ideas as predictions, get community validation through upvotes, and generate MVPs with AI.

Your personality is:
- Knowledgeable about tech, startups, and product development
- Enthusiastic and encouraging about user ideas
- Degen-friendly: casual, uses emojis, and understands crypto/web3 culture
- Helpful and action-oriented, suggesting next steps

You can help users:
- Create and refine prediction statements
- Understand how the platform works
- Get feedback on their ideas
- Navigate the MVP generation process
- Explore trending predictions

When appropriate, offer actionable buttons for common tasks.

Keep responses concise, engaging, and focused on helping users validate and build their ideas.`
      },
      ...formatChatHistory(chatHistory),
      { role: "user", content: userMessage }
    ];

    // Call the API
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3-haiku-20240307",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Process the response
    const responseContent = completion.choices[0].message.content;
    
    // Check if the response contains action suggestions
    // This is a simple implementation - in a real app, you'd use a more robust approach
    const actions = extractActions(responseContent, userMessage);
    
    return {
      role: "assistant",
      content: responseContent,
      actions: actions.length > 0 ? actions : undefined
    };
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};

// Helper function to format chat history for the API
const formatChatHistory = (chatHistory) => {
  // Only use the last 10 messages to avoid token limits
  const recentHistory = chatHistory.slice(-10);
  
  return recentHistory.map(msg => ({
    role: msg.role,
    content: msg.content
  }));
};

// Helper function to extract potential actions from the response
const extractActions = (responseContent, userMessage) => {
  const actions = [];
  
  // Check for prediction creation intent
  if (
    userMessage.toLowerCase().includes('create prediction') ||
    userMessage.toLowerCase().includes('submit idea') ||
    userMessage.toLowerCase().includes('new prediction')
  ) {
    actions.push({
      id: 'create-prediction',
      label: 'Create Prediction',
      icon: 'zap',
      action: 'createPrediction'
    });
  }
  
  // Check for exploration intent
  if (
    userMessage.toLowerCase().includes('how does') ||
    userMessage.toLowerCase().includes('explain') ||
    userMessage.toLowerCase().includes('what is') ||
    userMessage.toLowerCase().includes('help me understand')
  ) {
    actions.push({
      id: 'explore-platform',
      label: 'Platform Guide',
      icon: 'arrow-right',
      action: 'explorePlatform'
    });
  }
  
  // Check for leaderboard intent
  if (
    userMessage.toLowerCase().includes('top prediction') ||
    userMessage.toLowerCase().includes('best idea') ||
    userMessage.toLowerCase().includes('leaderboard') ||
    userMessage.toLowerCase().includes('trending')
  ) {
    actions.push({
      id: 'view-leaderboard',
      label: 'View Leaderboard',
      icon: 'arrow-right',
      action: 'viewLeaderboard'
    });
  }
  
  return actions;
};

// Generate MVP code
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
    });

    return JSON.parse(completion.choices[0].message.content);
  } catch (error) {
    console.error('Error generating MVP:', error);
    throw error;
  }
};
