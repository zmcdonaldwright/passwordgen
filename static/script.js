'use strict';
//----------Password bar----------
class PasswordMeter {
	constructor(selector) {
		this.wrappers = document.querySelectorAll(selector);
		if(this.wrappers.length > 0) {
			this.init(this.wrappers);
		}
	}
	init(wrappers) {
		wrappers.forEach(wrapper => {
			let bar = wrapper.querySelector('.password-meter-bar');
			let input = wrapper.previousElementSibling;
			let genButton = document.getElementById("generateButton");
			
			passwordGenerator()
			passwordMeterDisplay(bar, input);
			input.addEventListener('keyup', function() {passwordMeterDisplay(bar, input);}, false);
			genButton.addEventListener('click', function() {passwordMeterDisplay(bar, input);}, false);
		});
	}
}

function passwordMeterDisplay(bar, input) {
	let value = input.value;
	bar.classList.remove('level0', 'level1', 'level2', 'level3', 'level4');
	let result = zxcvbn(value);
	let cls = `level${result.score}`;
	bar.classList.add(cls);
}

document.addEventListener('DOMContentLoaded', () => {
	const passwordMeter = new PasswordMeter('.password-meter-wrap');
}, false);


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
	let firstArray = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet", "Purple", "Pink", "Silver", "Gold", "Grey", "Black", "White"];
	let secondArray = ["Wolf", "Tiger", "Lion", "Bear", "Elephant", "Hippo", "Panther", "Whale", "Snake", "Crocodile", "Eagle", "Panda", "Squirrel"]
	
	let firstElement = firstArray[Math.floor(Math.random()*firstArray.length)];
	let secondElement = secondArray[Math.floor(Math.random()*secondArray.length)];
	
	var passwordInput = document.getElementById("passwordBox");
	passwordInput.value = firstElement + secondElement + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
	outFunc();
}