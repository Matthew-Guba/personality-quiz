const QUESTIONS = [
    {
        id: 1,
        category: "Social",
        text: "You're at a party full of strangers. How do you feel?",
        answers: [
            { id: "a", text: "Great! I quickly make new friends and enjoy socializing" },
            { id: "b", text: "Fine, I chat with a few people but don't seek the spotlight" },
            { id: "c", text: "A bit uncomfortable, I prefer being around people I know" },
            { id: "d", text: "I want to leave — large groups drain my energy" }
        ]
    },
    {
        id: 2,
        category: "Thinking",
        text: "How do you usually make important decisions?",
        answers: [
            { id: "a", text: "I make a pros and cons list, analyze facts and data" },
            { id: "b", text: "I listen to my feelings and think about how it affects others" },
            { id: "c", text: "I trust my gut — my first instinct is usually right" },
            { id: "d", text: "I look at how others handled similar situations" }
        ]
    },
    {
        id: 3,
        category: "Leisure",
        text: "Your ideal Friday evening looks like:",
        answers: [
            { id: "a", text: "A quiet evening with a book, drawing, or music" },
            { id: "b", text: "Meeting friends at a café or dinner" },
            { id: "c", text: "Active recreation — sports, hiking, adventure" },
            { id: "d", text: "Diving into an interesting project or learning something new" }
        ]
    },
    {
        id: 4,
        category: "Work",
        text: "In which work environment do you feel most comfortable?",
        answers: [
            { id: "a", text: "A lively office with constant interaction with colleagues" },
            { id: "b", text: "A quiet room or remote work with minimal distractions" },
            { id: "c", text: "A co-working space or café — I need background noise but not constant chatting" },
            { id: "d", text: "Different places — I can't sit in one spot for long" }
        ]
    },
    {
        id: 5,
        category: "Conflict",
        text: "When a conflict arises in a team, you usually:",
        answers: [
            { id: "a", text: "Take the lead and try to find an objective solution" },
            { id: "b", text: "Try to understand everyone's feelings and find a compromise" },
            { id: "c", text: "Avoid the conflict — let it settle on its own" },
            { id: "d", text: "Observe from the side and step in only if you see a rational way out" }
        ]
    },
    {
        id: 6,
        category: "Organization",
        text: "How do you feel about planning?",
        answers: [
            { id: "a", text: "I plan everything in advance, I love lists and schedules" },
            { id: "b", text: "I prefer to act spontaneously — plans are limiting" },
            { id: "c", text: "I plan big things but leave room for flexibility" },
            { id: "d", text: "I have a general direction but figure out details along the way" }
        ]
    },
    {
        id: 7,
        category: "Learning",
        text: "How do you best absorb new information?",
        answers: [
            { id: "a", text: "Through practice — I need to try it with my own hands" },
            { id: "b", text: "Through reading and analyzing theory — understand first, then do" },
            { id: "c", text: "Through discussion with others — dialogue helps me understand" },
            { id: "d", text: "Through visualization — diagrams, videos, examples" }
        ]
    },
    {
        id: 8,
        category: "Stress",
        text: "When you're under heavy stress, you:",
        answers: [
            { id: "a", text: "Isolate yourself and recharge in silence" },
            { id: "b", text: "Seek support from friends or loved ones" },
            { id: "c", text: "Go for a run, hit the gym, or take a walk" },
            { id: "d", text: "Switch to productive work to take your mind off things" }
        ]
    },
    {
        id: 9,
        category: "Projects",
        text: "Which project would inspire you the most?",
        answers: [
            { id: "a", text: "Developing a new technology or software" },
            { id: "b", text: "Creating a work of art, music, or film" },
            { id: "c", text: "Organizing a charity event" },
            { id: "d", text: "Launching your own business or startup" }
        ]
    },
    {
        id: 10,
        category: "Information",
        text: "What attracts you most when studying a new topic?",
        answers: [
            { id: "a", text: "Concrete facts, data, and statistics" },
            { id: "b", text: "General concepts, theories, and the 'big picture'" },
            { id: "c", text: "Personal stories and people's experiences" },
            { id: "d", text: "Practical application — how can I use this?" }
        ]
    },
    {
        id: 11,
        category: "Leadership",
        text: "You've been offered to lead a new project. Your reaction?",
        answers: [
            { id: "a", text: "Great! I love leading people" },
            { id: "b", text: "Sure, if I can support the team rather than give orders" },
            { id: "c", text: "I'd prefer an expert role rather than a manager" },
            { id: "d", text: "I'd rather decline — I don't like being responsible for others" }
        ]
    },
    {
        id: 12,
        category: "Motivation",
        text: "What motivates you most at work?",
        answers: [
            { id: "a", text: "Financial reward and career growth" },
            { id: "b", text: "The opportunity to create something unique" },
            { id: "c", text: "Helping people and contributing to society" },
            { id: "d", text: "Solving complex problems and intellectual challenge" }
        ]
    },
    {
        id: 13,
        category: "Communication",
        text: "How do you prefer to communicate about work matters?",
        answers: [
            { id: "a", text: "Face-to-face meeting or video call — I need to see reactions" },
            { id: "b", text: "Text messaging — I can think through my response" },
            { id: "c", text: "Visual presentation — show, don't tell" },
            { id: "d", text: "Short structured report with data" }
        ]
    },
    {
        id: 14,
        category: "Rest",
        text: "Your ideal vacation is:",
        answers: [
            { id: "a", text: "A secluded place with a book and beautiful views" },
            { id: "b", text: "Traveling with friends, parties, and meeting new people" },
            { id: "c", text: "Adventure — mountain hiking, surfing, expedition" },
            { id: "d", text: "Visiting museums, exhibitions, science centers" }
        ]
    },
    {
        id: 15,
        category: "Values",
        text: "What matters most to you in life?",
        answers: [
            { id: "a", text: "Stability and security" },
            { id: "b", text: "Freedom and new experiences" },
            { id: "c", text: "Harmony in relationships and helping others" },
            { id: "d", text: "Knowledge and understanding the world" }
        ]
    },
    {
        id: 16,
        category: "Self-awareness",
        text: "When you receive criticism, you usually:",
        answers: [
            { id: "a", text: "Analyze it objectively and take it into account if valid" },
            { id: "b", text: "Take it to heart, even if I try not to show it" },
            { id: "c", text: "Don't worry much — everyone has their own opinion" },
            { id: "d", text: "Try to prove the critic is wrong" }
        ]
    },
    {
        id: 17,
        category: "Technology",
        text: "Your attitude toward new technology:",
        answers: [
            { id: "a", text: "Love it! I always stay on top of trends and try new things" },
            { id: "b", text: "I use it if it's genuinely useful" },
            { id: "c", text: "Interesting how it works — I love figuring out the mechanics" },
            { id: "d", text: "Technology is just a tool — people and relationships matter more" }
        ]
    },
    {
        id: 18,
        category: "Teamwork",
        text: "In a team, you typically take on the role of:",
        answers: [
            { id: "a", text: "Leader — I organize the process and make decisions" },
            { id: "b", text: "Idea generator — I come up with solutions and approaches" },
            { id: "c", text: "Executor — I do my part of the work with quality" },
            { id: "d", text: "Connector — I make sure everyone is on the same page" }
        ]
    },
    {
        id: 19,
        category: "Finances",
        text: "How do you approach money and financial risks?",
        answers: [
            { id: "a", text: "I prefer stable income and savings" },
            { id: "b", text: "I'm willing to take risks for a big payoff" },
            { id: "c", text: "Money isn't everything — doing what I love matters more" },
            { id: "d", text: "I spend without overthinking — you need to live in the moment" }
        ]
    },
    {
        id: 20,
        category: "Future",
        text: "How do you envision your life in 10 years?",
        answers: [
            { id: "a", text: "I have a clear plan and I'm working toward specific goals" },
            { id: "b", text: "I don't like to plan ahead — life will show the way" },
            { id: "c", text: "I want to create something meaningful, leave a mark" },
            { id: "d", text: "The main thing is to be surrounded by loved ones" }
        ]
    },
    {
        id: 21,
        category: "Problem Solving",
        text: "You're facing a complex problem. How do you approach it?",
        answers: [
            { id: "a", text: "Break it into parts and analyze each element" },
            { id: "b", text: "Look for a creative, unconventional approach" },
            { id: "c", text: "Discuss it with the team — solving together is easier" },
            { id: "d", text: "Trial and error — practice matters more than theory" }
        ]
    },
    {
        id: 22,
        category: "Environment",
        text: "Which work culture appeals to you most?",
        answers: [
            { id: "a", text: "A corporation with clear structure and processes" },
            { id: "b", text: "A startup with chaos but incredible energy" },
            { id: "c", text: "An NGO or social project — meaningful work" },
            { id: "d", text: "Freelance or own business — complete freedom" }
        ]
    },
    {
        id: 23,
        category: "Feedback",
        text: "How do you prefer to receive feedback?",
        answers: [
            { id: "a", text: "Directly and openly, in person" },
            { id: "b", text: "In writing, so I have time to think it over" },
            { id: "c", text: "Through specific metrics and data" },
            { id: "d", text: "Gently and with consideration for my feelings" }
        ]
    },
    {
        id: 24,
        category: "Achievement",
        text: "What do you consider the greatest achievement?",
        answers: [
            { id: "a", text: "Building a successful career or business" },
            { id: "b", text: "Creating something beautiful or unique" },
            { id: "c", text: "Helping as many people as possible" },
            { id: "d", text: "Solving a complex puzzle or making a discovery" }
        ]
    },
    {
        id: 25,
        category: "Habitat",
        text: "Where would you prefer to live?",
        answers: [
            { id: "a", text: "In a quiet suburb with a garden and stable routine" },
            { id: "b", text: "In the center of a big city — everything is nearby" },
            { id: "c", text: "In different places — six months here, six months there" },
            { id: "d", text: "In a cozy place surrounded by nature, away from the hustle" }
        ]
    },
    {
        id: 26,
        category: "Interests",
        text: "Which book would you choose to read?",
        answers: [
            { id: "a", text: "Popular science — about space, the brain, or technology" },
            { id: "b", text: "A novel or poetry" },
            { id: "c", text: "Business literature or a biography of a successful person" },
            { id: "d", text: "A book on psychology or philosophy" }
        ]
    },
    {
        id: 27,
        category: "Deadlines",
        text: "How do you behave when a deadline is approaching?",
        answers: [
            { id: "a", text: "Everything is ready early — I never leave things to the last minute" },
            { id: "b", text: "I work best under pressure — adrenaline helps" },
            { id: "c", text: "I delegate tasks and coordinate the team" },
            { id: "d", text: "I prioritize and focus on what's most important" }
        ]
    },
    {
        id: 28,
        category: "Character",
        text: "If you were an animal, you'd most likely be:",
        answers: [
            { id: "a", text: "A dog — social, loyal, energetic" },
            { id: "b", text: "A cat — independent, graceful, mysterious" },
            { id: "c", text: "An ant — hardworking, team-oriented, systematic" },
            { id: "d", text: "A dolphin — smart, playful, creative" }
        ]
    },
    {
        id: 29,
        category: "Fantasy",
        text: "If you could have a superpower, what would you choose?",
        answers: [
            { id: "a", text: "Mind reading — understand people and situations completely" },
            { id: "b", text: "Remote empathy — feel and heal others' pain" },
            { id: "c", text: "Teleportation — instantly be anywhere in the world" },
            { id: "d", text: "Time control — slow down, speed up, or rewind" }
        ]
    },
    {
        id: 30,
        category: "Dream",
        text: "Describe your ideal workday:",
        answers: [
            { id: "a", text: "Many meetings, brainstorms, lunch with colleagues, a presentation" },
            { id: "b", text: "Quiet work on a creative project, a cup of coffee, no deadlines" },
            { id: "c", text: "Negotiations, closing deals, strategic planning" },
            { id: "d", text: "Helping people — consultations, teaching, volunteering" }
        ]
    }
];