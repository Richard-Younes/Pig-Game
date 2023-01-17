'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

// Switch player
const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;

	activePlayer = activePlayer === 0 ? 1 : 0;
	currentScore = 0;

	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
};

let currentScore, activePlayer, playing, scores;

// Initialize default conditions
const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	playing = true;

	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = 0;
	current1El.textContent = 0;

	diceEl.classList.add('hidden');
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player1El.classList.remove('player--active');
	player0El.classList.add('player--active');
};

init();

// Initially the dice should not be visible as no one rolled it
diceEl.classList.add('hidden');

// Rolling functionality at the click of the roll btn
btnRoll.addEventListener('click', function () {
	if (playing) {
		// Generating a random numbre (dice roll between 1-6 inclusive)
		const dice = Math.trunc(Math.random() * 6) + 1;

		// Display the dice
		diceEl.classList.remove('hidden');
		diceEl.src = `dice-${dice}.png`;

		// Check if a 1 was rolled, if true switch to next player
		if (dice !== 1) {
			// Add the dice to current score
			currentScore += dice;

			document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		} else {
			switchPlayer();
		}
	}
});

btnHold.addEventListener('click', function () {
	if (playing) {
		// Add current score to active player score
		scores[activePlayer] += currentScore;

		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

		// Check score is >=100
		if (scores[activePlayer] >= 100) {
			playing = false;
			document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
			diceEl.classList.add('hidden');
		} else {
			// Else Switch to next player
			switchPlayer();
		}
	}
});

btnNew.addEventListener('click', init);
