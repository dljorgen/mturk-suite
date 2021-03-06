/* eslint-disable no-unused-vars */

function getVoice(name) {
  const voices = speechSynthesis.getVoices();
  const filtered = voices.filter(v => v.name === (name || v.name));
  const voice = filtered[0] || voices[0];
  return voice;
}

function getSpeechVoice(name) {
  return new Promise(resolve => {
    const voice = getVoice(name);
    if (voice) resolve(voice);
    else window.speechSynthesis.onvoiceschanged = () => resolve(getVoice());
  });
}

async function textToSpeech(text, name) {
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = await getSpeechVoice(name);
  window.speechSynthesis.speak(utterThis);
}
