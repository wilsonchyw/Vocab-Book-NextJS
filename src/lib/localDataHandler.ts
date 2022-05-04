import uuid from "./uuid";
import verifier from "./verifier";
import type { Vocab } from "./vocab";

const VOCAB = "vocab";
let vocabCache: Vocab[] = [];

function getData(): Vocab[] {
    const vocabs = JSON.parse(localStorage.getItem(VOCAB) || "[]");
    vocabCache = vocabs;
    return vocabs;
}

function saveVocab(vocabs: Vocab[]): void {
    localStorage.setItem(VOCAB, JSON.stringify(vocabs));
}

function addOne(content: Vocab): void {
    verifier.atLeast(["type", "meaning", "vocabulary", "inflection"], content);
    saveVocab(
        vocabCache.concat({
            ...content,
            createAt: Date.now(),
            id: uuid(),
        })
    );
}

function update(content: Vocab): void {
    verifier.atLeast(["id", "vocabulary"], content);
    const { id, ...rest } = content;
    console.log(id, rest);
    saveVocab(
        vocabCache.map((vocab) => {
            if (vocab.id == id) return { ...vocab, ...rest };
            return vocab;
        })
    );
}

function _delete(content: Vocab): void {
    verifier.atLeast(["id"], content);
    saveVocab(vocabCache.filter((vocab) => vocab.id != content.id));
}

const localAPI: any = { get: getData, post: addOne, put: update, delete: _delete };

const localDataHandler = (option: any) => {
    console.log(option);
    console.log(localAPI);
    if (option.url != "/vocab") return () => {};
    return localAPI[option.method](option.data);
};

export type localHandler = {
    [key: string]: Function;
};

export default localDataHandler;
