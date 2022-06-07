import { store } from "store";

export default function speak(word: string): void {

    const speech = new SpeechSynthesisUtterance(word);
    speech.rate = store.getState().voice.rate;
    speech.lang = store.getState().voice.lang;
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(speech); 
}
