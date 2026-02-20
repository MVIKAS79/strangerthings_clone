export const quizQuestions = [
  {
    id: 1,
    question: "When faced with a problem, you usually:",
    answers: [
      { text: "Use logic and research to find a solution", points: { dustin: 3, nancy: 2 } },
      { text: "Jump in headfirst and figure it out later", points: { eleven: 2, steve: 3 } },
      { text: "Protect your friends at all costs", points: { mike: 3, hopper: 2 } },
      { text: "Observe from a distance before acting", points: { jonathan: 3, max: 2 } }
    ]
  },
  {
    id: 2,
    question: "Your ideal weekend involves:",
    answers: [
      { text: "Playing games with close friends", points: { mike: 3, dustin: 2, lucas: 2 } },
      { text: "Going on an adventure", points: { eleven: 2, steve: 2, max: 3 } },
      { text: "Spending time alone with music or art", points: { jonathan: 3, will: 2 } },
      { text: "Investigating something mysterious", points: { nancy: 3, robin: 2 } }
    ]
  },
  {
    id: 3,
    question: "In a group project, you're the one who:",
    answers: [
      { text: "Takes charge and makes decisions", points: { mike: 3, nancy: 2 } },
      { text: "Comes up with creative solutions", points: { dustin: 3, robin: 2 } },
      { text: "Keeps everyone safe and grounded", points: { hopper: 3, joyce: 2 } },
      { text: "Does whatever needs to be done, even the scary stuff", points: { eleven: 3, steve: 2 } }
    ]
  },
  {
    id: 4,
    question: "Your biggest fear is:",
    answers: [
      { text: "Losing the people you love", points: { mike: 3, joyce: 3, eleven: 2 } },
      { text: "Being misunderstood", points: { jonathan: 3, eleven: 2 } },
      { text: "Not being brave enough when it matters", points: { steve: 3, will: 2 } },
      { text: "Failing to solve the problem", points: { dustin: 2, nancy: 3 } }
    ]
  },
  {
    id: 5,
    question: "Pick a superpower:",
    answers: [
      { text: "Telekinesis", points: { eleven: 3 } },
      { text: "Super intelligence", points: { dustin: 3, nancy: 2 } },
      { text: "Incredible bravery", points: { steve: 3, hopper: 2 } },
      { text: "Empathy/Connection with others", points: { will: 3, joyce: 2 } }
    ]
  },
  {
    id: 6,
    question: "What's most important to you?",
    answers: [
      { text: "Loyalty and friendship", points: { mike: 3, dustin: 2, lucas: 2 } },
      { text: "Truth and justice", points: { nancy: 3, hopper: 2 } },
      { text: "Freedom and independence", points: { max: 3, jonathan: 2 } },
      { text: "Protecting the innocent", points: { eleven: 3, steve: 2 } }
    ]
  },
  {
    id: 7,
    question: "How do you handle stress?",
    answers: [
      { text: "Make jokes and try to lighten the mood", points: { dustin: 3, steve: 2, robin: 2 } },
      { text: "Focus intensely on solving the problem", points: { nancy: 3, eleven: 2 } },
      { text: "Retreat and process alone", points: { jonathan: 3, will: 2 } },
      { text: "Take action immediately", points: { hopper: 3, mike: 2 } }
    ]
  },
  {
    id: 8,
    question: "Your music taste is:",
    answers: [
      { text: "Classic rock and metal", points: { eddie: 3, jonathan: 2 } },
      { text: "Pop hits", points: { max: 2, nancy: 2 } },
      { text: "Whatever's on the radio", points: { steve: 3, lucas: 2 } },
      { text: "Synth and electronic", points: { will: 2, dustin: 2 } }
    ]
  },
  {
    id: 9,
    question: "If you found a mysterious creature, you would:",
    answers: [
      { text: "Study it and try to understand it", points: { dustin: 3 } },
      { text: "Immediately tell a trusted adult", points: { will: 2, lucas: 3 } },
      { text: "Keep it secret and protect it", points: { mike: 3, eleven: 2 } },
      { text: "Figure out if it's dangerous first", points: { nancy: 2, hopper: 3 } }
    ]
  },
  {
    id: 10,
    question: "How would your friends describe you?",
    answers: [
      { text: "The smart one", points: { dustin: 3, nancy: 2, robin: 2 } },
      { text: "The protective one", points: { eleven: 2, hopper: 3, mike: 2 } },
      { text: "The brave one", points: { steve: 3, max: 2 } },
      { text: "The creative one", points: { jonathan: 3, will: 2 } }
    ]
  },

  // SEASON 5 THEMED QUESTIONS
  {
    id: 11,
    question: "Two years have passed. What's changed the most about you?",
    answers: [
      { text: "I've learned to control my powers", points: { eleven: 3, will: 2 } },
      { text: "I've become a better leader", points: { mike: 3, steve: 2 } },
      { text: "I've found my courage", points: { max: 3, will: 2 } },
      { text: "I've accepted who I really am", points: { jonathan: 2, robin: 3 } }
    ]
  },
  {
    id: 12,
    question: "Hawkins is falling. What's your first instinct?",
    answers: [
      { text: "Rally everyone together - we're stronger united", points: { mike: 3, hopper: 2 } },
      { text: "Use my abilities to protect others", points: { eleven: 3, will: 2 } },
      { text: "Document everything - the truth must survive", points: { nancy: 3, jonathan: 2 } },
      { text: "Fight back directly, no matter the cost", points: { steve: 3, max: 2 } }
    ]
  },
  {
    id: 13,
    question: "The Heart Circle requires thinking of someone you love deeply. Who comes to mind?",
    answers: [
      { text: "My best friends who've been through everything with me", points: { mike: 3, dustin: 2, lucas: 2 } },
      { text: "The person who believed in me when no one else did", points: { eleven: 3, will: 2 } },
      { text: "My family - blood or chosen", points: { hopper: 3, joyce: 2 } },
      { text: "The one who taught me to be brave", points: { max: 2, steve: 3 } }
    ]
  },
  {
    id: 14,
    question: "Someone you care about made a great sacrifice. How do you honor them?",
    answers: [
      { text: "Continue their mission - they would want that", points: { nancy: 3, mike: 2 } },
      { text: "Tell their story so no one forgets", points: { dustin: 3, jonathan: 2 } },
      { text: "Be there for others who are grieving", points: { joyce: 3, steve: 2 } },
      { text: "Use my grief as strength to keep fighting", points: { eleven: 3, max: 2 } }
    ]
  },
  {
    id: 15,
    question: "The battle is over. What does 'the beginning' mean to you?",
    answers: [
      { text: "A chance to finally live a normal life", points: { eleven: 3, will: 2 } },
      { text: "Time to share the truth with the world", points: { nancy: 3, jonathan: 2 } },
      { text: "Rebuilding together with the people I love", points: { mike: 2, joyce: 3 } },
      { text: "Taking what I learned and helping others", points: { steve: 3, hopper: 2 } }
    ]
  }
]

export const characterResults = {
  eleven: {
    name: "Eleven",
    description: "You're mysterious, powerful, and fiercely loyal. Like El, you may seem quiet at first, but you have incredible inner strength. You'd do anything to protect the people you love.",
    image: "/images/eleven.jpg",
    traits: ["Powerful", "Loyal", "Brave", "Protective"]
  },
  mike: {
    name: "Mike Wheeler",
    description: "You're a natural leader with a big heart. Like Mike, you're fiercely loyal to your friends and always ready to stand up for what's right, even when you're scared.",
    image: "/images/mike.jpg",
    traits: ["Leader", "Loyal", "Passionate", "Determined"]
  },
  dustin: {
    name: "Dustin Henderson",
    description: "You're the brains of the operation with a great sense of humor. Like Dustin, you use science and logic to solve problems, but you're never afraid to think outside the box.",
    image: "/images/dustin.jpg",
    traits: ["Smart", "Funny", "Curious", "Resourceful"]
  },
  lucas: {
    name: "Lucas Sinclair",
    description: "You're practical, brave, and always speak your mind. Like Lucas, you're a voice of reason who isn't afraid to question things, but you always come through for your friends.",
    image: "/images/lucas.jpg",
    traits: ["Practical", "Brave", "Honest", "Reliable"]
  },
  will: {
    name: "Will Byers",
    description: "You're sensitive, creative, and stronger than you know. Like Will, you've faced challenges but emerged with incredible resilience and a deep appreciation for friendship.",
    image: "/images/will.jpg",
    traits: ["Creative", "Sensitive", "Resilient", "Artistic"]
  },
  nancy: {
    name: "Nancy Wheeler",
    description: "You're determined, smart, and won't rest until you find the truth. Like Nancy, you've grown from playing by the rules to becoming a fearless investigator.",
    image: "/images/nancy.jpg",
    traits: ["Determined", "Smart", "Brave", "Investigative"]
  },
  jonathan: {
    name: "Jonathan Byers",
    description: "You're artistic, introspective, and march to the beat of your own drum. Like Jonathan, you see the world differently and aren't afraid to be yourself.",
    image: "/images/jonathan.jpg",
    traits: ["Artistic", "Thoughtful", "Independent", "Caring"]
  },
  steve: {
    name: "Steve Harrington",
    description: "You've had quite the character arc! Like Steve, you might have started one way but became something much better - a reliable friend and unexpected hero.",
    image: "/images/steve.jpg",
    traits: ["Protective", "Funny", "Brave", "Loyal"]
  },
  max: {
    name: "Max Mayfield",
    description: "You're independent, tough, and nobody tells you what to do. Like Max, you've faced difficult situations with strength and aren't afraid to stand up for yourself.",
    image: "/images/max.jpg",
    traits: ["Independent", "Strong", "Skateboarding", "Resilient"]
  },
  hopper: {
    name: "Jim Hopper",
    description: "You're protective, tough on the outside but soft on the inside. Like Hopper, you'd move mountains for the people you care about.",
    image: "/images/hopper.jpg",
    traits: ["Protective", "Tough", "Caring", "Determined"]
  },
  joyce: {
    name: "Joyce Byers",
    description: "You're intuitive, persistent, and will never give up on the people you love. Like Joyce, your determination and mother's instinct make you unstoppable.",
    image: "/images/joyce.jpg",
    traits: ["Intuitive", "Persistent", "Loving", "Fierce"]
  },
  robin: {
    name: "Robin Buckley",
    description: "You're witty, smart, and refreshingly honest. Like Robin, you have a quick mind and aren't afraid to speak the truth, even if it's sarcastic.",
    image: "/images/robin.jpg",
    traits: ["Witty", "Smart", "Honest", "Observant"]
  },
  eddie: {
    name: "Eddie Munson",
    description: "You're a true original who doesn't care what others think. Like Eddie, you're passionate about what you love and would do anything for your friends. You're a hero.",
    image: "/images/eddie.jpg",
    traits: ["Unique", "Passionate", "Brave", "Musical"]
  }
}

export default { quizQuestions, characterResults }
