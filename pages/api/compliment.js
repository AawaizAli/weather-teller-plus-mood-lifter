export default async (req, res) => {
    
    const compliments = [
        "ur so beautiful 💕",
        "ur such a cutie 😘",
        "ur so amazing 😎",
        "ur so hot 🍑",
        "ur gorgeous 😍",
        "ur smile is perfect 👌",
        "u deserve the world 🌎",
        "u light up my world 🔦",
        "ur flawless 🧐",
        "ur sexy 😏",
        "ur looking great today 😊",
        "ur my everything 🤩",
        "ur a beauty 🥺",
        "ur the loml 😜",
        "ur my queen 👸",
        "ur my favorite person 🍩",
        "ur appreciated 😍",
        "ur body teaaaaaa 🤪",
        "ur my jaan 🦄",
        "On a scale of 1 to 10, ur a 999999999999999999999999999999999999999999999999999",
        "ur my angel 😇",
        "ur an awesome girlfriend 👧🏻",
        "ur hilarious 😂",
    ]

    const chosenCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    res.statusCode = 200
    res.json({ compliment: chosenCompliment })
  }
  
