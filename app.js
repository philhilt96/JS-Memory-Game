

const cards = document.querySelectorAll('.card'); // Select all cards

let cardFlipped = false; // Variable to see if card is flipped
let firstFlip, secondFlip; // Variables for first and second flips
let lock = false; // Variable to lock the game in between first and second flip
let matchCount = 0; // Keep track of matches to win
let message = document.querySelector('.winner-message') // Winning message

function seeCard() {
	if(lock) {
		return;
	};

	if(this === firstFlip) { // prevent first flip matching with itself
		return;
	}

	this.classList.add('flip');

	if(!cardFlipped) {
	// First flip
		cardFlipped = true;
		firstFlip = this;

		return;
	}
	// Second flip
	cardFlipped = false;
	secondFlip = this;

	checkMatch();
}

// Check for match

function checkMatch() {
	let match = firstFlip.lastElementChild.src === secondFlip.lastElementChild.src;
	match ? noFlip() : flipOver();
}

// disable flipping if match

function noFlip() {
	firstFlip.removeEventListener('click',seeCard);
	secondFlip.removeEventListener('click', seeCard);
	matchCount += 1;
	youWin();
}

// flip cards back over if no match

function flipOver() {
	lock = true;
	setTimeout(() => {
		firstFlip.classList.remove('flip');
		secondFlip.classList.remove('flip');
		lock = false;
	}, 1000);
}

cards.forEach(card => card.addEventListener('click', seeCard));

// Shuffle the cards
(function shuffleDeck() {
	cards.forEach(card => {
		let random = Math.floor(Math.random() * 16);
		card.style.order = random;
	})
})();

// When all cards matched

function youWin() {
	if(matchCount === 8) {
		setTimeout(() => {
			message.style.display = 'flex';
		}, 2000);
	}
}
