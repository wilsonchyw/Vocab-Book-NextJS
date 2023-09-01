import Divider from "components/Divider";
import { setVoide, setRate } from "components/slices/voiceSlice";
import { useDispatch, useSelector } from "react-redux";
import { FunctionComponent } from "react";
import { Dropdown } from "react-bootstrap";
import { RootState } from "store";
import { MouseEvent } from "react";
import ReadVocab from "./Profile/ReadVocab";
import { Vocab } from "lib/vocab";
//typeof window !== "undefined" ? window.speechSynthesis.getVoices().filter((x) => x.lang.includes("en"))
const voiceList = [
    {
        name: "English (United Kingdom)",
        lang: "en-GB",
    },
    {
        name: "English (Canada)",
        lang: "en-CA",
    },
    {
        name: "English (United States)",
        lang: "en-US",
    },
    {
        name: "German (Germany)",
        lang: "de-DE",
    },
    {
        name: "French (France)",
        lang: "fr-FR",
    },
    {
        name: "Polish (Poland)",
        lang: "pl-PL",
    },
    {
        name: "Italian (Italy)",
        lang: "it-IT",
    },
    {
        name: "Spanish (Spain)",
        lang: "es-ES",
    },
];

const VoiceSetting: FunctionComponent = ({ toggle,datas }: { toggle: Function,datas:Vocab[] }) => {
    const dispatch = useDispatch();
    const { name, rate } = useSelector((state: RootState) => state.voice);

    const handleRangeChange = (event: MouseEvent<HTMLButtonElement>) => dispatch(setRate(event.target.value));

    const handleVoiceChange = (voice: { name: string; lang: string }) => {
        dispatch(setVoide({ name: voice.name, lang: voice.lang }));
        toggle();
    };

    return (
        <>
            <Divider content="voice" />
            <ReadVocab datas={datas}/>
            <Dropdown className="mt-1">
                <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
                    <span>{name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="secondary">
                    {voiceList.map((voice) => (
                        <Dropdown.Item onClick={() => handleVoiceChange(voice)} key={voice.name} className="m-1">
                            {voice.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Divider content={`speed ${rate}`} />
            <input
                type="range"
                className="form-range"
                min="0.2"
                max="1.5"
                step="0.1"
                value={rate}
                onChange={handleRangeChange}
            />
        </>
    );
};

export default VoiceSetting;
