const isElementButton = (event) => {
    return event.target && event.target.nodeName == 'BUTTON'
}

const getComputerChoice = (shapes) => {
    return shapes[Math.floor(Math.random() * 3)]
}

const handleUserClick = (choicesContainer, shapes) => {
    // Adding event listener to all elements inside container - event delegation
    choicesContainer.addEventListener('click', (event) => {
        const userChoice = event.target.value
        if (isElementButton(event) && shapes.includes(userChoice)) {
            game(userChoice, shapes)
        }
    })
}

const getWinner = (userChoice, computerChoice, gameResult) => {
    // String interpolation to 'paper && rock' format
    const choices = [userChoice, computerChoice]
    console.log(choices)
    let winner = null
    switch (choices.toString()) {
        // Player wins
        case 'Rock,Scissors':
        case 'Scissors,Paper':
        case 'Paper,Rock':
            winner = 'You'
            break
        // Computer wins
        case 'Scissors,Rock':
        case 'Paper,Scissors':
        case 'Rock,Paper':
            winner = 'Computer'
            break
    }
    msg = generateResultMessage(choices, winner)
    editElementText(gameResult, msg)
    return winner
}

const generateResultMessage = (choices, winner) => {
    let message
    switch (winner) {
        case 'You':
            message = `${choices[0]} beats ${choices[1]}. ${winner} win!`
            break
        case 'Computer':
            message = `${choices[1]} beats ${choices[0]}. ${winner} wins!`
            break
        default:
            message = `${choices[0]} can't hurt each other. It's a draw!`
    }
    console.log(message)
    return message
}

const editElementText = (element, text) => {
    element.innerHTML = text
}

const addScore = (element) => {
    let score = parseInt(element.innerHTML) + 1
    editElementText(element, score)
}

const game = (userChoice, shapes) => {
    const gameResult = document.getElementById('game-result')
    const playerScore = document.getElementById('player-score')
    const computerScore = document.getElementById('comp-score')
    
    const computerChoice = getComputerChoice(shapes)
    const winner = getWinner(userChoice, computerChoice, gameResult)

    switch (winner) {
        case 'You':
            addScore(playerScore)
            break
        case 'Computer':
            addScore(computerScore)
            break
    }
}

const main = () => {
    const shapes = ['Rock', 'Paper', 'Scissors']
    const choicesContainer = document.getElementById('choices-container')
    
    handleUserClick(choicesContainer, shapes)
}

document.addEventListener('DOMContentLoaded', (event) => {
    main()
})