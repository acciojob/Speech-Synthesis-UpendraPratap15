// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const rateSlider = document.querySelector('[name="rate"]');
const pitchSlider = document.querySelector('[name="pitch"]');
const textArea = document.querySelector('[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${voice.name} (${voice.lang})`;
    if (voice.default) option.textContent += ' -- DEFAULT';
    voicesDropdown.appendChild(option);
  });
}

function speak() {
  const text = textArea.value.trim();
  if (!text) {
    return;
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  msg.text = text;
  const selectedVoiceIndex = voicesDropdown.value;
  if (selectedVoiceIndex !== '' && voices[selectedVoiceIndex]) {
    msg.voice = voices[selectedVoiceIndex];
  }
  msg.rate = parseFloat(rateSlider.value);
  msg.pitch = parseFloat(pitchSlider.value);
  speechSynthesis.speak(msg);
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
populateVoices(); // Initial call

voicesDropdown.addEventListener('change', speak);
rateSlider.addEventListener('input', speak);
pitchSlider.addEventListener('input', speak);
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', () => {
  speechSynthesis.cancel();
});

// Handle no voices
if (speechSynthesis.getVoices().length === 0) {
  voicesDropdown.innerHTML = '<option>No voices available</option>';
}
