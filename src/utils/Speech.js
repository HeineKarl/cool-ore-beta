class Speech {
  constructor(text, { voices, defaultVoice, pitch, rate, volume }) {
    this.text = text;
    this.speech = new SpeechSynthesisUtterance();
    this.synthesis = window.speechSynthesis;
    this.voices = voices;
    this.currentVoice = defaultVoice;
    this.pitch = pitch;
    this.rate = rate;
    this.volume = volume;
    this.isListening = false;
  }

  debug() {
    console.log(this.speech);
    console.log(this.synthesis.getVoices());
  }

  setVoice(voiceIndex) {
    this.currentVoice = voiceIndex;
  }

  start() {
    console.log("START");
    // Listening
    this.isListening = !this.isListening;

    // Setting the Text and Voice
    this.speech.text = this.text;
    this.speech.voice = this.voices[this.currentVoice];
    this.speech.pitch = this.pitch;
    this.speech.rate = this.rate;
    this.speech.volume = this.volume;

    // Speak
    this.synthesis.speak(this.speech);
  }

  get listening() {
    return this.speech;
  }

  get getVoices() {
    return window.speechSynthesis.getVoices();
  }
}

export default Speech;
