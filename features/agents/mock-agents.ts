import type { Agent } from "@/interfaces";

export const mockAgents: Agent[] = [
  {
    id: "journey-master",
    name: "Journey Master Pro",
    description:
      "Your ultimate companion for planning and executing complex multi-step projects. Breaks down goals into manageable phases and tasks.",
    longDescription:
      "Journey Master Pro is an advanced AI agent designed to help you tackle your most ambitious projects. Whether you're launching a new product, planning a research paper, or organizing a large event, Journey Master Pro provides a structured approach. It intelligently analyzes your goals, suggests optimal phases, and helps you define detailed tasks for each phase. With its intuitive interface and powerful planning capabilities, you'll stay organized and on track from start to finish. It can also adapt to changes and help you re-plan on the fly.",
    bannerSlogan:
      "Master your most complex projects with AI-driven planning and execution.",
    avatarUrl: "https://picsum.photos/seed/journey-master/80/80",
    bannerImageUrl: "https://picsum.photos/seed/journey-master-banner/1200/400",
    tags: [
      "project management",
      "planning",
      "productivity",
      "tasks",
      "goals",
      "Trending",
    ],
    isInstalled: true,
    version: "2.1.0",
    latestVersion: "2.1.0",
    category: "Productivity",
    developerName: "InnovateAI Labs",
    lastUpdatedDate: "2025-05-15T10:00:00Z",
    averageRating: 4.8,
    ratingCount: 256,
    billingType: "pay-as-you-go",
    usagePricingTiers: [
      {
        unit: "per 1k input tokens",
        rate: 0.01,
        currency: "USD",
        description: "For planning analysis",
      },
      {
        unit: "per 1k output tokens",
        rate: 0.03,
        currency: "USD",
        description: "For generating plans",
      },
      {
        unit: "per active journey/month",
        rate: 5,
        currency: "USD",
        freeQuota: 1,
      },
    ],
    systemPrompt:
      "You are Journey Master Pro, an expert project planner. Your goal is to help users break down complex objectives into actionable phases and tasks. Be thorough, clear, and encouraging.",
    releaseNotes:
      "Version 2.1.0: Improved phase suggestion algorithm and added support for sub-tasks.",
    showcaseItems: [
      {
        id: "s1",
        type: "image",
        title: "Project Dashboard",
        description: "Overview of all your active journeys.",
        imageUrl: "https://picsum.photos/seed/journey-dashboard/600/400",
      },
      {
        id: "s2",
        type: "video",
        title: "Planning Demo",
        description:
          "Watch how Journey Master Pro helps plan a new marketing campaign.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Alice Wonderland",
        userAvatarUrl: "https://picsum.photos/seed/alice-user/40/40",
        rating: 5,
        comment:
          "This agent is a lifesaver! Made my project so much easier to manage.",
        date: "2025-05-20T14:30:00Z",
      },
    ],
    relatedAgentIds: ["code-assistant-x", "data-analyzer-pro"],
    creationDate: "2024-01-15T00:00:00Z",
    weeklyTrendingScore: 85,
  },
  {
    id: "code-assistant-x",
    name: "Code Assistant X",
    description:
      "AI-powered pair programmer. Helps you write, debug, and optimize code in multiple languages.",
    longDescription:
      "Code Assistant X is your go-to AI for all things coding. It understands context, suggests completions, helps identify bugs, and can even refactor your code for better performance and readability. Supports Python, JavaScript, Java, C++, and more. Integrates with popular IDEs.",
    bannerSlogan: "Write better code, faster. Your AI pair programmer.",
    avatarUrl: "https://picsum.photos/seed/code-assistant/80/80",
    bannerImageUrl: "https://picsum.photos/seed/code-banner/1200/400",
    tags: ["coding", "development", "debugger", "optimizer", "IDE", "Popular"],
    isInstalled: false,
    version: "1.5.2",
    latestVersion: "1.6.0", // Update available
    category: "Development",
    developerName: "DevTools Inc.",
    lastUpdatedDate: "2025-04-28T09:15:00Z",
    averageRating: 4.6,
    ratingCount: 180,
    billingType: "pay-as-you-go",
    usagePricingTiers: [
      {
        unit: "per 1k tokens (mixed)",
        rate: 0.02,
        currency: "USD",
        description: "General coding tasks",
      },
      {
        unit: "per hour of active use",
        rate: 1,
        currency: "USD",
        description: "For intensive debugging sessions",
      },
    ],
    systemPrompt:
      "You are Code Assistant X. Provide accurate code suggestions, explain complex concepts clearly, and help debug efficiently. Prioritize best practices.",
    releaseNotes:
      "Version 1.6.0: Added support for Go and improved Python type inference.",
    relatedAgentIds: ["journey-master", "data-analyzer-pro"],
    creationDate: "2024-02-20T00:00:00Z",
  },
  {
    id: "creative-writer-gpt",
    name: "Creative Writer GPT",
    description:
      "Unleash your imagination. AI assistant for brainstorming, story writing, and content creation.",
    longDescription:
      "Creative Writer GPT helps you overcome writer's block, generate plot ideas, develop characters, and even draft entire sections of text. Perfect for novelists, screenwriters, marketers, and anyone who needs a creative spark.",
    avatarUrl: "https://picsum.photos/seed/creative-writer/80/80",
    bannerImageUrl: "https://picsum.photos/seed/creative-banner/1200/400",
    tags: [
      "writing",
      "content creation",
      "storytelling",
      "brainstorming",
      "Trending",
    ],
    isInstalled: false,
    version: "1.0.0",
    latestVersion: "1.0.0",
    category: "Creativity",
    developerName: "StoryWeaver AI",
    lastUpdatedDate: "2025-03-10T12:00:00Z",
    averageRating: 4.9,
    ratingCount: 320,
    billingType: "free", // This agent is now free
    systemPrompt:
      "You are Creative Writer GPT. Inspire users with unique ideas, help them overcome writer's block, and assist in crafting compelling narratives. Be imaginative and supportive.",
    relatedAgentIds: ["language-tutor-ai"],
    creationDate: "2024-03-01T00:00:00Z",
  },
  {
    id: "data-analyzer-pro",
    name: "Data Analyzer Pro",
    description:
      "Transform raw data into actionable insights. Supports CSV, Excel, and database connections.",
    longDescription:
      "Data Analyzer Pro simplifies complex data analysis. Upload your datasets, and let the AI help you identify trends, generate visualizations, and create comprehensive reports. No coding required, but offers advanced options for data scientists.",
    avatarUrl: "https://picsum.photos/seed/data-analyzer/80/80",
    bannerImageUrl: "https://picsum.photos/seed/data-banner/1200/400",
    tags: [
      "data analysis",
      "visualization",
      "reporting",
      "business intelligence",
      "Popular",
    ],
    isInstalled: true,
    version: "3.0.1",
    latestVersion: "3.0.1",
    category: "Business",
    developerName: "Insightful Machines",
    lastUpdatedDate: "2025-05-01T11:30:00Z",
    averageRating: 4.5,
    ratingCount: 150,
    billingType: "contact-sales", // Enterprise-focused
    systemPrompt:
      "You are Data Analyzer Pro. Help users clean, analyze, and visualize data. Provide clear explanations of statistical findings and generate insightful reports.",
    relatedAgentIds: ["journey-master", "code-assistant-x"],
    creationDate: "2023-11-10T00:00:00Z",
  },
  {
    id: "language-tutor-ai",
    name: "Language Tutor AI",
    description:
      "Learn new languages with a personalized AI tutor. Interactive lessons, pronunciation practice, and cultural insights.",
    longDescription:
      "Language Tutor AI offers a dynamic and engaging way to learn Spanish, French, German, Japanese, and more. Practice conversations, get instant feedback on your pronunciation, and explore cultural nuances. Tailored lesson plans adapt to your progress.",
    avatarUrl: "https://picsum.photos/seed/language-tutor/80/80",
    bannerImageUrl: "https://picsum.photos/seed/language-banner/1200/400",
    tags: ["language learning", "education", "tutoring", "pronunciation"],
    isInstalled: false,
    version: "1.2.0",
    latestVersion: "1.2.0",
    category: "Education",
    developerName: "Polyglot Systems",
    lastUpdatedDate: "2025-04-05T16:45:00Z",
    averageRating: 4.7,
    ratingCount: 210,
    billingType: "pay-as-you-go",
    usagePricingTiers: [
      {
        unit: "per lesson completed",
        rate: 0.5,
        currency: "USD",
        freeQuota: 3,
      },
      {
        unit: "per 10 minutes of conversation practice",
        rate: 0.25,
        currency: "USD",
      },
    ],
    systemPrompt:
      "You are Language Tutor AI. Create engaging and effective language lessons. Adapt to the user's learning pace and provide constructive feedback. Make learning fun!",
    relatedAgentIds: ["creative-writer-gpt"],
    creationDate: "2024-04-01T00:00:00Z",
  },
  {
    id: "fitness-coach-pro",
    name: "Fitness Coach Pro",
    description:
      "Your personal AI fitness trainer. Custom workout plans, nutrition advice, and progress tracking.",
    longDescription:
      "Fitness Coach Pro creates personalized workout routines based on your goals, equipment, and fitness level. Get expert nutrition guidance, track your progress, and stay motivated with AI-powered feedback. Perfect for beginners and fitness enthusiasts alike.",
    bannerSlogan: "Transform your body with AI-powered fitness coaching",
    avatarUrl: "https://picsum.photos/seed/fitness-coach/80/80",
    bannerImageUrl: "https://picsum.photos/seed/fitness-banner/1200/400",
    tags: ["fitness", "health", "workout", "nutrition", "Trending"],
    isInstalled: false,
    version: "2.0.1",
    latestVersion: "2.0.1",
    category: "Health & Wellness",
    developerName: "FitTech Solutions",
    lastUpdatedDate: "2025-04-10T08:20:00Z",
    averageRating: 4.7,
    ratingCount: 189,
    billingType: "subscription",
    usagePricingTiers: [
      {
        unit: "monthly subscription",
        rate: 9.99,
        currency: "USD",
        description: "Unlimited access",
      },
      {
        unit: "yearly subscription",
        rate: 89.99,
        currency: "USD",
        description: "Save 25%",
      },
    ],
    systemPrompt:
      "You are Fitness Coach Pro. Provide expert fitness advice, create personalized workout plans, and offer motivational support. Focus on safety and progressive improvement.",
    releaseNotes:
      "Version 2.0.1: Added integration with popular fitness trackers and improved nutrition recommendations.",
    relatedAgentIds: ["nutrition-guru", "meditation-master"],
    creationDate: "2024-02-15T00:00:00Z",
    weeklyTrendingScore: 72,
  },
  {
    id: "recipe-genius",
    name: "Recipe Genius",
    description:
      "Transform your cooking with AI-powered recipe suggestions based on ingredients you have at home.",
    longDescription:
      "Recipe Genius helps you create delicious meals from whatever you have in your pantry. Simply list your available ingredients, dietary preferences, and cooking time, and get customized recipes with step-by-step instructions. Includes options for various cuisines and dietary restrictions.",
    bannerSlogan: "Never waste ingredients again. Cook smart with AI.",
    avatarUrl: "https://picsum.photos/seed/recipe-genius/80/80",
    bannerImageUrl: "https://picsum.photos/seed/recipe-banner/1200/400",
    tags: ["cooking", "recipes", "food", "meal planning", "Popular"],
    isInstalled: false,
    version: "1.3.0",
    latestVersion: "1.3.0",
    category: "Lifestyle",
    developerName: "CulinaryAI",
    lastUpdatedDate: "2025-03-25T14:15:00Z",
    averageRating: 4.9,
    ratingCount: 320,
    billingType: "free",
    systemPrompt:
      "You are Recipe Genius. Help users create delicious meals from available ingredients. Consider dietary restrictions, cooking skill levels, and time constraints. Provide clear, step-by-step instructions.",
    releaseNotes:
      "Version 1.3.0: Added international cuisine options and improved substitution suggestions.",
    relatedAgentIds: ["nutrition-guru", "shopping-assistant-ai"],
    creationDate: "2024-01-20T00:00:00Z",
    weeklyTrendingScore: 88,
  },
  {
    id: "meditation-master",
    name: "Meditation Master",
    description:
      "Guided meditations and mindfulness exercises tailored to your mood, goals, and experience level.",
    longDescription:
      "Meditation Master provides personalized mindfulness practices to reduce stress, improve focus, and enhance overall wellbeing. Whether you're a beginner or experienced practitioner, this AI creates custom sessions ranging from quick 5-minute breaks to deep 30-minute meditations.",
    bannerSlogan: "Find your inner peace with AI-guided mindfulness",
    avatarUrl: "https://picsum.photos/seed/meditation/80/80",
    bannerImageUrl: "https://picsum.photos/seed/meditation-banner/1200/400",
    tags: [
      "meditation",
      "mindfulness",
      "stress relief",
      "mental health",
      "sleep",
    ],
    isInstalled: false,
    version: "1.0.2",
    latestVersion: "1.0.2",
    category: "Health & Wellness",
    developerName: "ZenTech Innovations",
    lastUpdatedDate: "2025-05-05T09:30:00Z",
    averageRating: 4.8,
    ratingCount: 155,
    billingType: "subscription",
    usagePricingTiers: [
      {
        unit: "premium subscription",
        rate: 5.99,
        currency: "USD",
        description: "Monthly access to all features",
      },
    ],
    systemPrompt:
      "You are Meditation Master. Create calming, effective meditation scripts tailored to the user's needs. Use soothing language and adapt to their experience level.",
    releaseNotes:
      "Version 1.0.2: Added sleep meditation series and improved ambient sound options.",
    relatedAgentIds: ["fitness-coach-pro", "sleep-analyzer"],
    creationDate: "2024-03-10T00:00:00Z",
  },
  {
    id: "travel-planner-ai",
    name: "Travel Planner AI",
    description:
      "Plan your perfect trip with personalized itineraries, budget tracking, and local recommendations.",
    longDescription:
      "Travel Planner AI takes the stress out of trip planning by creating detailed itineraries based on your interests, budget, and travel style. Get insider tips on hidden gems, optimize your route to save time, and receive real-time updates on local events and weather conditions.",
    bannerSlogan: "Your personal travel agent powered by AI",
    avatarUrl: "https://picsum.photos/seed/travel-planner/80/80",
    bannerImageUrl: "https://picsum.photos/seed/travel-banner/1200/400",
    tags: ["travel", "itinerary", "vacation", "budget", "Trending"],
    isInstalled: false,
    version: "2.1.1",
    latestVersion: "2.1.1",
    category: "Lifestyle",
    developerName: "Wanderlust Technologies",
    lastUpdatedDate: "2025-04-20T16:00:00Z",
    averageRating: 4.6,
    ratingCount: 210,
    billingType: "pay-as-you-go",
    usagePricingTiers: [
      { unit: "per itinerary", rate: 3.99, currency: "USD", freeQuota: 1 },
      {
        unit: "premium suggestions",
        rate: 1.99,
        currency: "USD",
        description: "Access to exclusive locations",
      },
    ],
    systemPrompt:
      "You are Travel Planner AI. Create personalized travel plans considering budget, interests, and time constraints. Provide detailed itineraries with practical travel tips and hidden gems.",
    releaseNotes:
      "Version 2.1.1: Added support for group travel planning and improved budget optimization features.",
    relatedAgentIds: ["language-tutor-ai", "photo-enhancer-pro"],
    creationDate: "2023-12-05T00:00:00Z",
    weeklyTrendingScore: 76,
  },
  {
    id: "study-buddy-ai",
    name: "Study Buddy AI",
    description:
      "Your personal AI tutor for any subject. Interactive lessons, practice questions, and exam preparation.",
    longDescription:
      "Study Buddy AI helps students of all ages master difficult subjects through personalized learning paths. Get step-by-step explanations for complex problems, generate practice quizzes, and review material with spaced repetition techniques for optimal retention.",
    bannerSlogan: "Learn smarter, not harder, with your AI tutor",
    avatarUrl: "https://picsum.photos/seed/study-buddy/80/80",
    bannerImageUrl: "https://picsum.photos/seed/study-banner/1200/400",
    tags: ["education", "tutoring", "learning", "exam prep", "Popular"],
    isInstalled: false,
    version: "3.2.0",
    latestVersion: "3.2.0",
    category: "Education",
    developerName: "EduTech Innovations",
    lastUpdatedDate: "2025-05-12T10:45:00Z",
    averageRating: 4.9,
    ratingCount: 450,
    billingType: "subscription",
    usagePricingTiers: [
      {
        unit: "monthly subscription",
        rate: 12.99,
        currency: "USD",
        description: "All subjects",
      },
      {
        unit: "yearly subscription",
        rate: 99.99,
        currency: "USD",
        description: "Save 35%",
      },
    ],
    systemPrompt:
      "You are Study Buddy AI. Explain complex concepts clearly, create effective study materials, and adapt to the student's learning style. Be encouraging and patient.",
    releaseNotes:
      "Version 3.2.0: Added advanced STEM subject support and interactive problem-solving features.",
    relatedAgentIds: ["language-tutor-ai", "math-wizard"],
    creationDate: "2023-08-20T00:00:00Z",
    weeklyTrendingScore: 92,
  },
  {
    id: "finance-advisor-pro",
    name: "Finance Advisor Pro",
    description:
      "Personal finance management with AI. Budgeting, investment advice, and financial goal planning.",
    longDescription:
      "Finance Advisor Pro helps you take control of your finances through smart budgeting, expense tracking, and personalized investment strategies. Set financial goals, track your progress, and receive actionable advice to improve your financial health.",
    bannerSlogan: "Your path to financial freedom starts with AI",
    avatarUrl: "https://picsum.photos/seed/finance-advisor/80/80",
    bannerImageUrl: "https://picsum.photos/seed/finance-banner/1200/400",
    tags: [
      "finance",
      "budgeting",
      "investments",
      "wealth management",
      "Popular",
    ],
    isInstalled: false,
    version: "2.4.1",
    latestVersion: "2.4.1",
    category: "Finance",
    developerName: "WealthTech Solutions",
    lastUpdatedDate: "2025-04-15T11:20:00Z",
    averageRating: 4.7,
    ratingCount: 280,
    billingType: "subscription",
    usagePricingTiers: [
      {
        unit: "premium features",
        rate: 7.99,
        currency: "USD",
        description: "Advanced investment analytics",
      },
    ],
    systemPrompt:
      "You are Finance Advisor Pro. Provide practical financial advice tailored to the user's situation. Explain complex financial concepts clearly and offer actionable steps for improving financial health.",
    releaseNotes:
      "Version 2.4.1: Added retirement planning calculator and improved debt management strategies.",
    relatedAgentIds: ["tax-helper-ai", "business-advisor"],
    creationDate: "2023-11-15T00:00:00Z",
    weeklyTrendingScore: 83,
  },
  {
    id: "music-composer-ai",
    name: "Music Composer AI",
    description:
      "Create original music in any style. Compose melodies, arrange instruments, and export to various formats.",
    longDescription:
      "Music Composer AI helps musicians and non-musicians alike create original compositions in any genre. Generate melodies based on your mood, arrange multiple instrument tracks, and export your creations to MIDI, MP3, or sheet music.",
    bannerSlogan: "Unleash your musical creativity with AI",
    avatarUrl: "https://picsum.photos/seed/music-composer/80/80",
    bannerImageUrl: "https://picsum.photos/seed/music-banner/1200/400",
    tags: ["music", "composition", "creativity", "audio", "Trending"],
    isInstalled: false,
    version: "1.5.0",
    latestVersion: "1.5.0",
    category: "Creativity",
    developerName: "Harmonic Innovations",
    lastUpdatedDate: "2025-03-30T13:40:00Z",
    averageRating: 4.8,
    ratingCount: 195,
    billingType: "pay-as-you-go",
    usagePricingTiers: [
      { unit: "per composition", rate: 0.99, currency: "USD", freeQuota: 3 },
      {
        unit: "per audio export",
        rate: 1.49,
        currency: "USD",
        description: "High-quality exports",
      },
    ],
    systemPrompt:
      "You are Music Composer AI. Help users create original music by generating melodies, suggesting chord progressions, and arranging instrumental parts. Adapt to their musical preferences and skill level.",
    releaseNotes:
      "Version 1.5.0: Added support for orchestral arrangement and improved chord suggestion algorithm.",
    relatedAgentIds: ["creative-writer-gpt", "sound-engineer-ai"],
    creationDate: "2024-01-25T00:00:00Z",
    weeklyTrendingScore: 78,
  },
];
