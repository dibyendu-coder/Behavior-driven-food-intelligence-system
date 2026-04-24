// Smart Food Decision Engine Logic

export const mockUserProfile = {
  name: "Alex",
  healthScore: 78,
  streak: 12,
  worstHabit: "Late night sugar cravings",
  habits: [
    { time: "22:00-02:00", type: "Junk Food", frequency: "High" },
    { time: "08:00-10:00", type: "Skipping Breakfast", frequency: "Medium" }
  ],
  weeklyImprovement: [
    { day: "Mon", score: 65 },
    { day: "Tue", score: 68 },
    { day: "Wed", score: 72 },
    { day: "Thu", score: 70 },
    { day: "Fri", score: 75 },
    { day: "Sat", score: 82 },
    { day: "Sun", score: 78 },
  ]
};

const foodDatabase = {
  "burger": {
    category: "Heavy",
    calories: 850,
    cost: "$12",
    alternatives: [
      {
        name: "Grilled Chicken Wrap",
        calories: 450,
        cost: "$9",
        healthImpact: "+40% Protein, -50% Saturated Fat",
        tasteProfile: "Savory & Fresh",
        reason: "You're ordering late. A heavy burger disrupts deep sleep. A grilled wrap satisfies the savory craving without the heavy digestion toll."
      },
      {
        name: "Turkey Burger on Whole Wheat",
        calories: 550,
        cost: "$11",
        healthImpact: "More fiber, leaner meat",
        tasteProfile: "Meaty & Filling",
        reason: "Still want a burger? Swapping to turkey gives you the same texture with significantly less heavy fats."
      }
    ]
  },
  "pizza": {
    category: "Heavy",
    calories: 1200,
    cost: "$18",
    alternatives: [
      {
        name: "Cauliflower Crust Margherita",
        calories: 600,
        cost: "$15",
        healthImpact: "-50% Carbs, High Veggie",
        tasteProfile: "Cheesy & Light",
        reason: "We noticed you tend to order pizza when stressed. This swap gives you the comfort of cheese without the massive carb crash tomorrow morning."
      }
    ]
  },
  "ice cream": {
    category: "Sugar",
    calories: 500,
    cost: "$7",
    alternatives: [
      {
        name: "Greek Yogurt with Honey & Berries",
        calories: 200,
        cost: "$4",
        healthImpact: "High Protein, Natural Sugars",
        tasteProfile: "Sweet & Creamy",
        reason: "It's past 10 PM. Sugar now will spike your insulin and ruin your sleep. Greek yogurt hits the creamy sweet spot and feeds your muscles overnight."
      }
    ]
  }
};

export const getSmartNudges = (currentHour) => {
  if (currentHour >= 22 || currentHour <= 2) {
    return {
      title: "Late Night Cravings Alert",
      message: "You usually crave sweets around this time. Planning to have a glass of water first?",
      type: "warning"
    };
  }
  if (currentHour >= 8 && currentHour <= 10) {
    return {
      title: "Fuel Up",
      message: "You've been skipping breakfast recently. A quick banana can improve morning focus by 30%.",
      type: "info"
    };
  }
  return null;
};

export const analyzeSwapRequest = (query) => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Find closest match in our mock DB
  const match = Object.keys(foodDatabase).find(item => normalizedQuery.includes(item));
  
  if (match) {
    return {
      original: { name: match.charAt(0).toUpperCase() + match.slice(1), ...foodDatabase[match] },
      recommendation: foodDatabase[match].alternatives[0]
    };
  }
  
  // Generic fallback if not in DB
  return {
    original: { name: query, category: "Unknown", calories: "???", cost: "???" },
    recommendation: {
      name: "A balanced, homemade version",
      calories: "Lower",
      cost: "Cheaper",
      healthImpact: "Better control of ingredients",
      reason: "We don't have enough data on that exact item, but cooking it yourself generally reduces sodium and hidden fats by 40%."
    }
  };
};
