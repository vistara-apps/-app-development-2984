// Chat onboarding flow management

// Check if user has completed onboarding
export const hasCompletedOnboarding = () => {
  return localStorage.getItem('chatOnboardingComplete') === 'true';
};

// Mark onboarding as complete
export const markOnboardingComplete = () => {
  localStorage.setItem('chatOnboardingComplete', 'true');
};

// Reset onboarding status (for testing)
export const resetOnboarding = () => {
  localStorage.removeItem('chatOnboardingComplete');
};

// Get personalized onboarding messages based on user context
export const getOnboardingMessages = (user = null) => {
  const messages = [
    {
      role: 'assistant',
      content: `Hey${user ? ` ${user.username}` : ''}! 👋 Welcome to PredictionForge! I'm your AI assistant, here to help you navigate the platform and make the most of your experience.`,
    },
    {
      role: 'assistant',
      content: 'PredictionForge is where ideas become reality. Here\'s how it works:',
    },
    {
      role: 'assistant',
      content: '1️⃣ Submit your app ideas as predictions\n2️⃣ Get community validation through upvotes\n3️⃣ Once you reach 50 upvotes, AI generates an MVP\n4️⃣ Launch your validated idea with a head start!',
      actions: [
        { id: 'create-first-prediction', label: 'Create My First Prediction', icon: 'zap', action: 'createPrediction' },
        { id: 'explore-platform', label: 'Explore the Platform', icon: 'arrow-right', action: 'explorePlatform' },
      ]
    }
  ];
  
  return messages;
};

// Get suggested first prediction examples
export const getPredictionExamples = () => {
  return [
    "A mobile app that uses AI to identify plants and provide care instructions will reach 5,000 daily active users within 3 months of launch.",
    "A browser extension that summarizes long articles using AI will be used by 10,000 people within 2 months.",
    "A web app that helps remote teams coordinate across time zones will increase productivity by 30% for early adopters.",
    "A crypto portfolio tracker with automated tax reporting will acquire 2,000 paying subscribers in its first quarter.",
    "A marketplace connecting local chefs with people wanting home-cooked meals will process 500 orders in its first month."
  ];
};

