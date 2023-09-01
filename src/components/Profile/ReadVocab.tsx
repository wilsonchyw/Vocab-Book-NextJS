import ButtonMod from "components/Profile/ButtonMod";
import { speadVocab } from "lib/speak";
import { Vocab } from "lib/vocab";
import { useEffect, useState } from "react";


export default function ReadVocab({ datas }: { datas: Vocab[] }) {
    const [shouldPlay, setShouldPlay] = useState<boolean>(false);

    useEffect(() => {
        let isCancelled = false; // Flag to terminate the loop

        const runSpeadVocab = async () => {
            while (!isCancelled && shouldPlay) {
                const vocab = datas[Math.floor(Math.random() * datas.length)];
                await speadVocab(vocab); // Assuming speadVocab returns a Promise
            }
        };

        runSpeadVocab();

        return () => {
            isCancelled = true; // Cleanup: set the flag to terminate the loop
        };
    }, [shouldPlay, datas]); // useEffect dependencies

    return (
        <div>
            <ButtonMod
                variant={shouldPlay ? 'secondary' : 'light'}
                onClick={() => setShouldPlay(!shouldPlay)}
                text="Auto Read"
            />
        </div>
    );
}
