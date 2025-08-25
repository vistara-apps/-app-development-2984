// Agent actions for the chat interface

// Map of available actions
export const AGENT_ACTIONS = {
  // Navigation actions
  navigateTo: async (path, navigate) => {
    if (navigate) {
      navigate(path);
      return { success: true, message: `Navigated to ${path}` };
    }
    return { success: false, message: 'Navigation function not available' };
  },
  
  // Prediction actions
  createPrediction: async (statement, submitPrediction) => {
    if (submitPrediction) {
      await submitPrediction(statement);
      return { success: true, message: 'Prediction created successfully' };
    }
    return { success: false, message: 'Submit function not available' };
  },
  
  votePrediction: async (predictionId, voteFunction) => {
    if (voteFunction) {
      await voteFunction(predictionId);
      return { success: true, message: 'Vote recorded successfully' };
    }
    return { success: false, message: 'Vote function not available' };
  },
  
  // MVP generation actions
  generateMVP: async (predictionId, statement, generateFunction) => {
    if (generateFunction) {
      await generateFunction(predictionId, statement);
      return { success: true, message: 'MVP generation started' };
    }
    return { success: false, message: 'Generation function not available' };
  },
  
  // External actions
  openUrl: async (url) => {
    if (url) {
      window.open(url, '_blank');
      return { success: true, message: `Opened ${url}` };
    }
    return { success: false, message: 'URL not provided' };
  },
  
  // UI actions
  showToast: async (message, toastFunction) => {
    if (toastFunction) {
      toastFunction(message);
      return { success: true, message: 'Toast displayed' };
    }
    return { success: false, message: 'Toast function not available' };
  },
  
  // Auth actions
  signIn: async (signInFunction) => {
    if (signInFunction) {
      await signInFunction();
      return { success: true, message: 'Sign in initiated' };
    }
    return { success: false, message: 'Sign in function not available' };
  }
};

// Execute an action based on the action object
export const executeAgentAction = async (action, dependencies = {}) => {
  const { type, payload } = action;
  
  if (!AGENT_ACTIONS[type]) {
    console.error(`Unknown action type: ${type}`);
    return { success: false, message: `Unknown action type: ${type}` };
  }
  
  try {
    return await AGENT_ACTIONS[type](payload, dependencies);
  } catch (error) {
    console.error(`Error executing action ${type}:`, error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

// Generate suggested actions based on user input and context
export const generateSuggestedActions = (userInput, context = {}) => {
  const input = userInput.toLowerCase();
  const actions = [];
  
  // Prediction creation suggestions
  if (
    input.includes('create') || 
    input.includes('submit') || 
    input.includes('new prediction') ||
    input.includes('add prediction')
  ) {
    actions.push({
      type: 'createPrediction',
      label: 'Create Prediction',
      icon: 'zap'
    });
  }
  
  // Navigation suggestions
  if (input.includes('leaderboard') || input.includes('top predictions')) {
    actions.push({
      type: 'navigateTo',
      label: 'View Leaderboard',
      icon: 'arrow-right',
      payload: '/leaderboard'
    });
  }
  
  if (input.includes('submit') || input.includes('create prediction')) {
    actions.push({
      type: 'navigateTo',
      label: 'Submit Prediction',
      icon: 'arrow-right',
      payload: '/submit'
    });
  }
  
  // MVP generation suggestions
  if (
    input.includes('generate mvp') || 
    input.includes('create mvp') ||
    input.includes('build app')
  ) {
    // Only suggest if we have a prediction in context
    if (context.currentPrediction) {
      actions.push({
        type: 'generateMVP',
        label: 'Generate MVP',
        icon: 'zap',
        payload: {
          predictionId: context.currentPrediction.id,
          statement: context.currentPrediction.statement
        }
      });
    }
  }
  
  // Auth suggestions
  if (
    input.includes('sign in') || 
    input.includes('login') ||
    input.includes('register') ||
    input.includes('sign up')
  ) {
    actions.push({
      type: 'navigateTo',
      label: 'Sign In / Register',
      icon: 'arrow-right',
      payload: '/auth'
    });
  }
  
  return actions;
};

