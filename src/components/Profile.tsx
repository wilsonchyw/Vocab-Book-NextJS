import Divider from 'components/Divider';
import { changeFilterType, toggleDialog, toggleAutoPlay, setLogin, toggleDetail } from "components/slices";
import { setRevisionInterval } from "components/slices/userSlice";
import VoiceSetting from "components/VoiceSetting";
import { firebase } from 'lib/firebaseInit';
import { FunctionComponent } from 'react';
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import DateRangePicker from "components/DateRangePicker"
import { useRouter } from "next/router";
import apiHandler from "lib/fetchHandler";



const intervals = [0, 1, 2, 3, 7, 14, 21, 30, 60]

const Profile: FunctionComponent = () => {
    const route = useRouter()
    const dispatch = useDispatch()
    const { detail, dialog, user, vocabLength, autoPlay, revisionInterval, filterType } = useSelector((state: RootState) => ({ ...state.visable, ...state.user, ...state.list }))
    const signout = (): void => {
        toggle()
        route.push("/")
        dispatch(setLogin(false))
        localStorage.removeItem("token")
        firebase.auth().signOut()
    }
    const changeMode = (type: string): void => {
        dispatch(changeFilterType(type))
        if(type!="range")toggle()
    }
    const toggle = () => dispatch(toggleDialog())

    const exportData = () => apiHandler({ url: "/vocab/export", responseType: 'blob' }, (response: any) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'export.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
    })


    return (
        dialog && <Card className="identity" style={{ width: '18rem' }}>
            <Card.Header className="bg-secondary text-white">Profile</Card.Header>
            <Card.Body>
                <Card.Title>Hello {user ? user : "Guest"}</Card.Title>

                {user &&
                    <>
                        <Card.Text>
                            {`You have learnt ${vocabLength} words`}
                            <Divider content="Mode" className="mx-1" />
                            <Button variant={filterType === "keyword" ? "secondary" : "light"} onClick={() => changeMode("keyword")} size="sm">All words</Button>
                            <Button variant={filterType === "forgettingCurve" ? "secondary" : "light"} onClick={() => changeMode("forgettingCurve")} size="sm">Revision</Button>
                            <Button variant={filterType === "range" ? "secondary" : "light"} onClick={() => changeMode("range")} size="sm">Range</Button>

                            {filterType === "range" && <DateRangePicker />}

                            {filterType === "forgettingCurve" &&
                                <>
                                    <Divider content="Interval (days)" className="mx-1" />
                                    <ButtonGroup className="me-2" aria-label="First group" size="sm">
                                        {intervals.map(interval =>
                                            <Button variant={revisionInterval.includes(interval) ? "secondary" : "light"} onClick={() => dispatch(setRevisionInterval(interval))} key={interval}>{interval}</Button>
                                        )}
                                    </ButtonGroup>
                                </>
                            }

                            <Divider content="Auto play" className="mx-1" />
                            <Button variant={autoPlay.onCorrect ? "secondary" : "light"} onClick={() => dispatch(toggleAutoPlay('onCorrect'))} size="sm">Input correct</Button>
                            <Button variant={autoPlay.onVerifierClick ? "secondary" : "light"} onClick={() => dispatch(toggleAutoPlay('onVerifierClick'))} size="sm">Verifier click</Button>

                            <Divider content="Expand" className="mx-1" />
                            <Button variant={detail.all ? "secondary" : "light"} onClick={() => dispatch(toggleDetail('all'))} size="sm">All</Button>
                            <Button variant={detail.onCorrect ? "secondary" : "light"} onClick={() => dispatch(toggleDetail('onCorrect'))} size="sm">On correct</Button>

                            <VoiceSetting />

                            <Divider content="Learning progress" className="mx-1" />
                            <Button variant="secondary" onClick={() => route.push('/chart')} size="sm">View</Button>{" "}
                            <Button variant="secondary" onClick={exportData} size="sm">Export</Button>

                        </Card.Text>
                        <hr className="my-12" />
                        <Button variant="danger" onClick={signout} size="sm">Logout</Button>{' '}
                    </>
                }
                <Button variant="secondary" onClick={toggle} size="sm">Dismiss</Button>
            </Card.Body>
        </Card>
    )
}

export default Profile