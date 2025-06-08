import type { Agent } from "@/interfaces"

export const mockAgents: Agent[] = [
  {
    id: "journey-master",
    name: "Journey Master Pro",
    description:
      "Your ultimate companion for planning and executing complex multi-step projects. Breaks down goals into manageable phases and tasks.",
    longDescription:
      "Journey Master Pro is an advanced AI agent designed to help you tackle your most ambitious projects. Whether you're launching a new product, planning a research paper, or organizing a large event, Journey Master Pro provides a structured approach. It intelligently analyzes your goals, suggests optimal phases, and helps you define detailed tasks for each phase. With its intuitive interface and powerful planning capabilities, you'll stay organized and on track from start to finish. It can also adapt to changes and help you re-plan on the fly.",
    bannerSlogan: "Master your most complex projects with AI-driven planning and execution.",
    avatarUrl: "/placeholder.svg?width=80&height=80",
    bannerImageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VfQF9gTOGCEdT3SdvyGdLFkQOCTqio.png",
    tags: ["project management", "planning", "productivity", "tasks", "goals", "Trending"],
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
      { unit: "per 1k input tokens", rate: 0.01, currency: "USD", description: "For planning analysis" },
      { unit: "per 1k output tokens", rate: 0.03, currency: "USD", description: "For generating plans" },
      { unit: "per active journey/month", rate: 5, currency: "USD", freeQuota: 1 },
    ],
    systemPrompt:
      "You are Journey Master Pro, an expert project planner. Your goal is to help users break down complex objectives into actionable phases and tasks. Be thorough, clear, and encouraging.",
    releaseNotes: "Version 2.1.0: Improved phase suggestion algorithm and added support for sub-tasks.",
    showcaseItems: [
      {
        id: "s1",
        type: "image",
        title: "Project Dashboard",
        description: "Overview of all your active journeys.",
        imageUrl: "/placeholder.svg?width=600&height=400",
      },
      {
        id: "s2",
        type: "video",
        title: "Planning Demo",
        description: "Watch how Journey Master Pro helps plan a new marketing campaign.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
      },
    ],
    reviews: [
      {
        id: "r1",
        userName: "Alice Wonderland",
        userAvatarUrl: "/placeholder.svg?width=40&height=40",
        rating: 5,
        comment: "This agent is a lifesaver! Made my project so much easier to manage.",
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
    description: "AI-powered pair programmer. Helps you write, debug, and optimize code in multiple languages.",
    longDescription:
      "Code Assistant X is your go-to AI for all things coding. It understands context, suggests completions, helps identify bugs, and can even refactor your code for better performance and readability. Supports Python, JavaScript, Java, C++, and more. Integrates with popular IDEs.",
    bannerSlogan: "Write better code, faster. Your AI pair programmer.",
    avatarUrl: "/placeholder.svg?width=80&height=80",
    bannerImageUrl: "/placeholder.svg?width=1200&height=400",
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
      { unit: "per 1k tokens (mixed)", rate: 0.02, currency: "USD", description: "General coding tasks" },
      { unit: "per hour of active use", rate: 1, currency: "USD", description: "For intensive debugging sessions" },
    ],
    systemPrompt:
      "You are Code Assistant X. Provide accurate code suggestions, explain complex concepts clearly, and help debug efficiently. Prioritize best practices.",
    releaseNotes: "Version 1.6.0: Added support for Go and improved Python type inference.",
    relatedAgentIds: ["journey-master", "data-analyzer-pro"],
    creationDate: "2024-02-20T00:00:00Z",
  },
  {
    id: "creative-writer-gpt",
    name: "Creative Writer GPT",
    description: "Unleash your imagination. AI assistant for brainstorming, story writing, and content creation.",
    longDescription:
      "Creative Writer GPT helps you overcome writer's block, generate plot ideas, develop characters, and even draft entire sections of text. Perfect for novelists, screenwriters, marketers, and anyone who needs a creative spark.",
    avatarUrl: "/placeholder.svg?width=80&height=80",
    bannerImageUrl: "/placeholder.svg?width=1200&height=400",
    tags: ["writing", "content creation", "storytelling", "brainstorming", "Trending"],
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
    description: "Transform raw data into actionable insights. Supports CSV, Excel, and database connections.",
    longDescription:
      "Data Analyzer Pro simplifies complex data analysis. Upload your datasets, and let the AI help you identify trends, generate visualizations, and create comprehensive reports. No coding required, but offers advanced options for data scientists.",
    avatarUrl: "/placeholder.svg?width=80&height=80",
    bannerImageUrl: "/placeholder.svg?width=1200&height=400",
    tags: ["data analysis", "visualization", "reporting", "business intelligence", "Popular"],
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
    avatarUrl: "/placeholder.svg?width=80&height=80",
    bannerImageUrl: "/placeholder.svg?width=1200&height=400",
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
      { unit: "per lesson completed", rate: 0.5, currency: "USD", freeQuota: 3 },
      { unit: "per 10 minutes of conversation practice", rate: 0.25, currency: "USD" },
    ],
    systemPrompt:
      "You are Language Tutor AI. Create engaging and effective language lessons. Adapt to the user's learning pace and provide constructive feedback. Make learning fun!",
    relatedAgentIds: ["creative-writer-gpt"],
    creationDate: "2024-04-01T00:00:00Z",
  },
]
