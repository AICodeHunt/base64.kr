const copyDiv = document.getElementById("copyDiv");
const copyBtn = document.getElementById("copyBtn");
const outputText = document.getElementById("outputText");
const decodeBtn = document.getElementById("decodeBtn");
const encodeBtn = document.getElementById("encodeBtn");
const swapBtn = document.getElementById("swapBtn");
let originalButtonText = copyBtn.textContent;

function handleCopyClick() {
	const textToCopy = outputText.value.trim();
	if (textToCopy === "") {
		// empty content
		copyBtn.textContent = "The content is empty, please encode or decode it first.";
		setTimeout(() => {
			copyBtn.textContent = originalButtonText;
		}, 1500);
		return;
	}
	// Copy text to clipboard
	const textArea = document.createElement("textarea");
	textArea.value = textToCopy;
	document.body.appendChild(textArea);
	textArea.select();
	document.execCommand("copy");
	document.body.removeChild(textArea);
	// Change button text to "Copied" and revert after 1.5 seconds
	copyBtn.textContent = "Copied";
	setTimeout(() => {
		copyBtn.textContent = originalButtonText;
	}, 1500);
}

function decodeBase64() {
	const inputTextValue = inputText.value.trim();
	if (inputTextValue === "") {
		outputText.value = "";
		return;
	}

	try {
		// Decode the Base64 encoded string to a Uint8Array
		const decoder = new TextDecoder();
		const decodedArray = new Uint8Array(atob(inputTextValue).split('').map(char => char.charCodeAt(0)));

		// Convert the Uint8Array to a human-readable string
		const decodedText = decoder.decode(decodedArray);

		outputText.value = decodedText;
		copyBtn.textContent = "Base64 decoding complete.";
		setTimeout(() => {
			copyBtn.textContent = originalButtonText;
		}, 1500);
	} catch (error) {
		copyBtn.textContent = "Decoding failed, please make sure the input is a valid Base64 encoding.";
		setTimeout(() => {
			copyBtn.textContent = originalButtonText;
		}, 1500);
	}
}

function encodeBase64() {
	const inputTextValue = inputText.value.trim();
	if (inputTextValue === "") {
		outputText.value = "";
		return;
	}

	// Convert input text to a Uint8Array
	const encoder = new TextEncoder();
	const inputArray = encoder.encode(inputTextValue);

	// Base64 encode the Uint8Array
	const base64String = btoa(String.fromCharCode(...inputArray));

	outputText.value = base64String;
	copyBtn.textContent = "Base64 encoding complete";
	setTimeout(() => {
		copyBtn.textContent = originalButtonText;
	}, 1500);
}

function swapValues() {
	const temp = inputText.value;
	inputText.value = outputText.value;
	outputText.value = temp;
}

copyBtn.addEventListener("click", handleCopyClick);
copyDiv.addEventListener("click", handleCopyClick);
decodeBtn.addEventListener("click", decodeBase64);
encodeBtn.addEventListener("click", encodeBase64);
swapBtn.addEventListener("click", swapValues);