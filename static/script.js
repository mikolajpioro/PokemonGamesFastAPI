async function getData() {
    try {
        const response = await fetch('/api/pokemon/random');
        const data = await response.json();

        return data
    } catch (error) {
        console.error("Error fetching from backend", error);
    }
}

async function getRandomPokemon() {
        
        const data = await getData()

        document.getElementById('pokemon_name').innerText = data.name;
        document.getElementById('pokemon_id').innerText = `#${data.id}`;
        document.getElementById('pokemon_sprite').src = data.sprite;
        
        if(document.getElementById('hint')) {
            document.getElementById('hint').innerText = data.hint;
        } 
}

async function getRandomPokemonHangman() {

        const data = await getData()

        document.getElementById("pokemon_name").innerText = data.name;
        document.getElementById("pokemon_sprite").src = data.sprite;
        document.getElementById("hint").innerText = data.hint;
}

let wrongAnswers = 0

function sendGuess() {
    const guessInput = document.getElementById("guessField");
    const secretNameElement = document.getElementById("pokemon_name");
    const hint = document.getElementById("hint");
    const wrongAnswersElement = document.getElementById("wrong_answers");
    const secretName = secretNameElement.innerText.toLowerCase().trim()
    const guess = guessInput.value.toLowerCase().trim()

    let currentHintArray = hint.innerText.trim().split(' ');

    for(let i = 0; i < secretName.length; i++) {
        if(secretName[i] === guess) {
            currentHintArray[i] = guess;
        }
    }

    hint.innerText = currentHintArray.join(' ');

    guessInput.value = '';
    guessInput.focus();

    // Check for a wrong guess
    if (!secretName.includes(guess)) {
        wrongAnswers = wrongAnswers + 1;
        wrongAnswersElement.innerText = wrongAnswers;
    }
    // Check for a loss
    if (wrongAnswersElement.innerText == '6') {
        alert("Look like you've lost! The " + secretName.toUpperCase() + " has ran away!" );
        wrongAnswersElement.innerText = 0;
        wrongAnswers = 0;
        getRandomPokemonHangman();
    } 
    // Check for a win
    if (!hint.innerText.includes('_')) {
        alert("You caught " + secretName.toUpperCase() + "!");
        wrongAnswersElement.innerText = 0;
        wrongAnswers = 0;
        getRandomPokemonHangman();
    }
}

document.getElementById("guessField").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendGuess();
    }
});