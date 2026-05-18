export type Memory = {
  id: string;
  title: string;
  url: string;
  tag: string;
  time: string;
  summary: string;
};

export const demoMemories: Memory[] = [
  {
    id: "1",
    title: "React Animation Tutorial",
    url: "youtube.com/watch/react-motion",
    tag: "Development",
    time: "Today, 10:42 AM",
    summary:
      "A tutorial about building smooth React animations using motion libraries and reusable UI patterns.",
  },
  {
    id: "2",
    title: "AI Startup Ideas",
    url: "medium.com/ai-startups",
    tag: "Startup",
    time: "Yesterday, 8:10 PM",
    summary:
      "An article exploring startup opportunities around AI agents, browser tools, and productivity systems.",
  },
  {
    id: "3",
    title: "UI Inspiration",
    url: "dribbble.com/clean-dashboard",
    tag: "Design",
    time: "Mon, 2:35 PM",
    summary:
      "A clean dashboard design with soft shadows, floating cards, and modern SaaS layout inspiration.",
  },
];