import Divider from 'components/Divider';
import { setVoide, setRate } from 'components/slices/voiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FunctionComponent } from 'react';
import { Dropdown } from "react-bootstrap";
import { RootState } from 'store';
import { MouseEvent } from "react"
//typeof window !== "undefined" ? window.speechSynthesis.getVoices().filter((x) => x.lang.includes("en"))
const voiceList = [
    {
        "name": "English (United Kingdom)",
        "lang": "en-GB"
    },
    {
        "name": "English (United States)",
        "lang": "en-US"
    },
    {
        "name": "German (Germany)",
        "lang": "de-DE"
    },
    {
        "name": "French (France)",
        "lang": "fr-FR"
    },
    {
        "name": "Polish (Poland)",
        "lang": "pl-PL"
    },
    {
        "name": "Italian (Italy)",
        "lang": "it-IT"
    },
    {
        "name": "Spanish (Spain)",
        "lang": "es-ES"
    }]

const VoiceSetting: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { name, rate } = useSelector((state: RootState) => state.voice)
    const handleRangeChange = (event: MouseEvent<HTMLButtonElement>) => {
        dispatch(setRate(event.target.value))
    }
    return (
        <>
            <Divider content="voice" />
            <Dropdown className="mt-1">
                <Dropdown.Toggle variant="light" id="dropdown-basic" size="sm">
                    <span>{name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="secondary">
                    {voiceList.map(voice => (
                        <Dropdown.Item onClick={() => dispatch(setVoide({ name: voice.name, lang: voice.lang }))} key={voice.name} className="m-1">{voice.name}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <label className="form-label mt-1">Rate: {rate}</label>
            <input type="range" className="form-range" min="0.2" max="1.5" step="0.1" value={rate} onChange={handleRangeChange} />
        </>
    )
}

export default VoiceSetting