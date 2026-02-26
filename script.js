// [] - create a list
// {} - create a dictionary that stores data in key-value pairs

const database = [
    {
        question : "what is the best game in roblox?",
        options: ["99 nights in the forest", "Dead rails", "Grow a garden", "Steal a brainrot"],
        answer: "99 nights in the forest" 
    },

    {
        question : "when was roblox released? ",
        options: ["1 sep 2006", "2 sep 2006", "1 sep 2022", "7 sep 2015"],
        answer: "1 sep 2006" 
    },

    {
        question : "when was minecraft released? ",
        options: ["19 dec 2016", "2 sep 2006", "17 nov 2022", "7 jan 2015"],
        answer: "19 dec 2016" 
    },
    {
        question : "when was fortnight released? ",
        options: ["19 dec 2016", "1 sep 2016", "18 nov 2022", "29 jan 2020"],
        answer: "19 dec 2016" 
    },

    {
        question : "when was Call of duty released? ",
        options: ["12 dec 2016", "1 sep 2016", "29 oct 2003", "2 jan 2020"],
        answer: "29 oct 2003" 
    },

    {
        question : "when was diablo released? ",
        options: ["7 mar 2019", "6 sep 2016", "9 oct 2003", "22 jan 2020"],
        answer: "7 mar 2019" 
    },

    {
        question : "what is the best gun in fortnite right now? ",
        options: ["Mythic Havoc Shotgun", "Golden pump", "grey smg", "picaxe"],
        answer: "Mythic Havoc Shotgun" 
    },

    {
        question : "what is the best gun in rivals? ",
        options: ["sniper", "minigun", "assult rifle", "raygun"],
        answer: "sniper" 
    },

    {
        question : "what is the best gun in blox fruits ? ",
        options: ["skull gutiar", "venmon bow", "cannon", "bazooka"],
        answer: "skull guitar" 
    },

    {
        question : "which game has most players ? ",
        options: ["roblox", "call of duty", "fortnight", "minecraft"],
        answer: "roblox" 
    },

    {
        question : "how many players does roblox have ? ",
        options: ["111.8m", "129.7m"],
        answer: "111.8m" 
    },

    {
        question : "which call of duty came out first ? ",
        options:["bo6", "mw2"],
        answer: "mw2" 
    },

    {
        question : "which minecraft snapshot came out first ? ",
        options:["1.21", "1.20"],
        answer: "1.20" 
    },

    {
        question : "which minecraft mob came out first ? ",
        options:["copper golem", "natulist"],
        answer: "copper golem" 
    },

    {
        question : "which map is the best in rivals ? ",
        options:["arena", "crossroads"],
        answer: "crossroads" 
    },

    {
        question : "which minecraft mob came out first ? ",
        options:["iron golem", "smiffer"],
        answer: "iron golem" 
    },

    {
        question : "which game came out first ? ",
        options:["minecraft", "roblox"],
        answer: "roblox" 
    },

    {
        question : "which in game credit is gives you more ? ",
        options:["call of duty", "minecraft"],
        answer: "call of duty" 
    },

    {
        question : "which is the most overrated game ? ",
        options:["fortnight", "call of duty"],
        answer: "fortnight",
    },

    {
        question : "which game have the most seris? ",
        options:["fortnight", "call of duty", "diablo", "minecraft"],
        answer: "minecraft",
    },

    {
        question : "which armor has the most duribility? ",
        options:["nothing", "leather armor", "golden armor", "chainmail"],
        answer: "chainmail",
    },

    {
        question : "which healing material has more health? ",
        options:["medkit", "bandage", "cake", "campfire"],
        answer: "medkit",
    },
]


const startbutton = document.getElementById("start-btn")
const timerText = document.getElementById("timer-text")
const questionLabel = document.getElementById("question")
const optionBox = document.getElementById("option-box")
const ProgresBarFill = document.getElementById("fill");
const ScoreLabel = document.getElementById("score-label")
const FeedbackLabel = document.getElementById("feedback-label")

const dropdown = document.getElementById("bgm")
const musicbtn = document.getElementById("music")
let CurrentSong = null
let IsMusicPlaying = false
musicbtn.textContent = "Music off"


dropdown.addEventListener("change", () => {
    let SelectedSong = dropdown.value

    // stop and reset previous song if any
    if(CurrentSong)
    {
        CurrentSong.pause()
        CurrentSong.currentTime = 0
    }
    CurrentSong = new Audio(SelectedSong)
    CurrentSong.loop = true
    CurrentSong.volume = 100%
    CurrentSong.play()
    IsMusicPlaying = true
    musicbtn.textContent = "🔈Music On🔈"
})


musicbtn.addEventListener("click", () => {
    if(IsMusicPlaying) 
    {
        CurrentSong.pause()
        musicbtn.textContent = "music off"
        IsMusicPlaying = false
    }else
    {
        CurrentSong.play()
        musicbtn.textContent = "🔈Music On🔈"
        IsMusicPlaying = true
    }
})




let questionNumber = 0
let score = 0


startbutton.addEventListener("click", StartQuiz)

function StartQuiz()
{
    startbutton.style.display = 'none'
    FeedbackLabel.textContent = ""
    LoadQuestion()
}

function LoadQuestion()
{
    if(questionNumber < database.length)
    {
        // reset the timer
        timerText.textContent = 20

        FeedbackLabel.textContent = ""

        // update progess bar
        ProgresBarFill.style.width = `${ ( (questionNumber + 1) / database.length ) * 100 }%`

        // load question from the database

        const currentQuestionSet = database[questionNumber]
        questionLabel.textContent = currentQuestionSet.question

        // remove previous option buttons
        optionBox.innerHTML = "";


        // build 4 option buttons

        currentQuestionSet.options.forEach((item)  => {
            const button = document.createElement("button")
            button.textContent = item;
            button.classList.add('option-btn')
            optionBox.appendChild(button)

            button.addEventListener('click', () => {
                DisableAllOptionButtons()
                CheckAnswer(item)
                // item = option we just selected
            })
        })

        // turn on the timer
        timer = setInterval(() => {
            // reduce timer text by 1
            timerText.textContent = parseInt(timerText.textContent) - 1
            
            const redValue = Math.random() * 255
            const greenValue = Math.random() * 255
            const blueValue = Math.random() * 255
            timerText.style.color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

            // check if the time has run out
            if(parseInt(timerText.textContent) === 0)
            {
                DisableAllOptionButtons()
                CheckAnswer(null)
            }

        }, 1000)
    } else
    {
        EndQuiz()
    }
}


function DisableAllOptionButtons()
{
    // batch select all option buttons
    const AllOptionButtons = document.querySelectorAll('.option-btn')

    AllOptionButtons.forEach(button => {
        button.disabled = true
    })
}


function CheckAnswer(item)
{

    clearInterval(timer)

    // identify the actual answer key
    const answer = database[questionNumber].answer;

    if(item === answer)
    {
        score = score + 1
        FeedbackLabel.textContent = "Good Job!"
    } else if (item === null)
    {
        FeedbackLabel.textContent = "time's up too slow"
    } else
    {
        FeedbackLabel.textContent = "Oops! Got it wrong"
    }

    ScoreLabel.textContent = `you score ${score} point(s)`

    // hold for 2 seconds
    setTimeout(() => {
        questionNumber = questionNumber + 1
        LoadQuestion()
    }, 2000);
}

function EndQuiz()
{
    clearInterval(timer) // reset timer
    questionLabel.textContent= "Hooray! Your brain can finally stop getting fried from that quiz! It is over!!!"
    optionBox.style.display ='none';

    if(score > 21)
    {    
        FeedbackLabel.textContent = "YOU ARE A GOD OF GAMING!😇"
        timerText.textContent = "67"
    }else(score < 15)
    {
        FeedbackLabel.textContent = "Do you even play games?!"
        timerText.textContent = 67
    }if(score > 15)
    {    
        FeedbackLabel.textContent = "🥵👏👏🏁🏁You are a true gamer!!"
        timerText.textContent = "67"
    }
}