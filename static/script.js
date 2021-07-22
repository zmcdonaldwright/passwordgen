'use strict';

//----------Length Slider----------
var slider = document.getElementById("passLengthSlider");
var output = document.getElementById("passLengthInput");

//----------Password bar----------
var bar = document.querySelector('.password-meter-bar');
var input = document.getElementById("passwordBox");
var genButton = document.getElementById("generateButton");
initialize();
function initialize() {
	output.value = slider.value; // Display the default slider value
	passwordGenerator();
	input.addEventListener('keyup', function() {passwordMeterDisplay();}, false);
	input.addEventListener('keyup', function() {output.value = input.value.length; slider.value = output.value;}, false);
	genButton.addEventListener('click', function() {passwordMeterDisplay();}, false);
	
	// Update the current slider value (each time you drag the slider handle)
	slider.oninput = function() {
		output.value = this.value;
		passwordGenerator();
		
	}
	
	output.addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key of the keyboard
		if (event.keyCode == 13) {
			event.preventDefault();
			inputFinished();
		}
	});
}

function passwordMeterDisplay() {
	//Change the colour of the bar based on the password inputted
	let value = input.value;
	bar.classList.remove('level0', 'level1', 'level2', 'level3', 'level4');
	let result = zxcvbn(value);
	let cls = `level${result.score}`;
	bar.classList.add(cls);
	
	//Change the strength indicator of the password based on the input
	var strengthLabel = document.getElementById("passStrengthBits");
	let guesses = result.guesses; //Get the number of guesses required to get the password. Entropy in bits is log2(guesses)
	let entropy = Math.log2(guesses * 2)
	strengthLabel.innerHTML = Math.floor(entropy) + " Bits";
}


//----------Copy to Clipboard tooltip----------
function clipboardCopy() {
  var copyText = document.getElementById("passwordBox");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied";
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}

//----------Password Generation----------
function passwordGenerator() {
	let lowercase = "abcdefghijklmnopqrstuvwxyz";
	let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let numbers = "0123456789"
	let symbolsStandard = "!@#$%^&*()-=_+<>?;:"
	
	let result = "";
	let charSet = lowercase + uppercase + numbers;
	let charSetLength = charSet.length;
	
	for (var i = 0; i < slider.value; i++) {
		result += charSet[Math.floor(Math.random() * charSetLength)];
	}
	
	input.value = result;
	passwordMeterDisplay();
	outFunc();
}

//----------Length Slider----------
//Update the position of the slider based on the input
function inputFinished() {
	//Quick logic to make sure the input is valid
	if (output.value > 50) {
		output.value = 50;
	} else if (output.value < 1) {
		output.value = 1;
	}
	slider.value = output.value;
	passwordGenerator()
}
