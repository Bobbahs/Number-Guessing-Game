// Variables for game logic
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let streak = 0; // Track consecutive correct guesses
let bestStreak = localStorage.getItem('bestStreak') || 0; // Get from localStorage
let bestTime = localStorage.getItem('bestTime') || 0; // Get from localStorage

// Elements
const menu = document.getElementById('menu');
const game = document.getElementById('game');
const instructions = document.getElementById('instructions');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const startButton = document.getElementById('start-btn');
const instructionsButton = document.getElementById('instructions-btn');
const backButton = document.getElementById('back-btn');
const resetButton = document.getElementById('reset-btn');
const backToMenuButton = document.getElementById('back-to-menu-btn');

// Display best streak and time on the menu
const bestStreakElement = document.getElementById('best-streak');
const bestTimeElement = document.getElementById('best-time');

// Event listeners
startButton.addEventListener('click', () => {
  menu.style.display = 'none';
  game.style.display = 'block';
  randomNumber = Math.floor(Math.random() * 100) + 1; // Reset the random number
  attempts = 0;
  streak = 0;
  attemptsDisplay.textContent = attempts;
});

instructionsButton.addEventListener('click', () => {
  menu.style.display = 'none';
  instructions.style.display = 'block';
});

backButton.addEventListener('click', () => {
  instructions.style.display = 'none';
  menu.style.display = 'block';
});

// Game Logic
submitButton.addEventListener('click', () => {
  const userGuess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message.textContent = "Please enter a valid number between 1 and 100.";
    message.style.color = "red";
    return;
  }

  // Increment the attempts counter
  attempts++;
  attemptsDisplay.textContent = attempts;

  // Check the guess
  if (userGuess === randomNumber) {
    streak++;
    message.textContent = `Correct! You guessed the number ${randomNumber}!`;
    message.style.color = "green";
    if (streak > bestStreak) {
      bestStreak = streak;
      localStorage.setItem('bestStreak', bestStreak);
    }
    resetGame();
  } else if (userGuess < randomNumber) {
    message.textContent = "Too low! Try again.";
    message.style.color = "orange";
  } else {
    message.textContent = "Too high! Try again.";
    message.style.color = "orange";
  }

  // Clear the input field
  guessInput.value = '';
  guessInput.focus();
});

// Reset Game logic
function resetGame() {
  setTimeout(() => {
    randomNumber = Math.floor(Math.random() * 100) + 1; // New random number
    attempts = 0;
    attemptsDisplay.textContent = attempts;
    message.textContent = '';
    streak = 0;
    updateLeaderboard();
  }, 3000); // Reset after 3 seconds to show the result
}

// Save and update leaderboard (best streak)
function updateLeaderboard() {
  bestStreakElement.textContent = bestStreak;
  bestTimeElement.textContent = bestTime;
}

// Back to Menu functionality
backToMenuButton.addEventListener('click', () => {
  game.style.display = 'none'; // Hide the game screen
  menu.style.display = 'block'; // Show the main menu
  updateLeaderboard(); // Update the leaderboard with the latest best streak
});
