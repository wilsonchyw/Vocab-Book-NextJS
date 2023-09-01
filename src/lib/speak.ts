import { store } from "store";
import type { Vocab } from "./vocab";
export default function speak(word: string): void {
    const speech = new SpeechSynthesisUtterance(word);
    speech.rate = store.getState().voice.rate;
    speech.lang = store.getState().voice.lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
}

export async function speadVocab(vocab: Vocab) {
    const eng = new SpeechSynthesisUtterance();
    const chi = new SpeechSynthesisUtterance();

    function readWord(string: String) {
        for (const s of string.split("")) {
            eng.text = s
            console.log(s)
            window.speechSynthesis.speak(eng);
        }
    }
    eng.rate = store.getState().voice.rate;
    chi.rate = store.getState().voice.rate;
    chi.lang = "zh";
    const content = `${vocab.vocabulary}\n${vocab.vocabulary.split("").join("  ")}\n${vocab.vocabulary}`
    eng.text = content;
    window.speechSynthesis.speak(eng);

    chi.text = vocab.meaning;
    window.speechSynthesis.speak(chi);
    if (vocab.example && vocab.example.length) {
        eng.text = vocab.example[0];
        window.speechSynthesis.speak(eng);
    }


    return new Promise((resolve) => {
        chi.onend = resolve;
    });
}
