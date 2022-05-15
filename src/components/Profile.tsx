import Divider from "components/Divider";
import Mode from "components/Profile/Mode";
import { setLogin, toggleAutoPlay, toggleDetail, toggleDialog } from "components/slices";
import VoiceSetting from "components/VoiceSetting";
import apiHandler from "lib/fetchHandler";
import { firebase } from "lib/firebaseInit";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ButtonMod from "components/Profile/ButtonMod";

const Profile: FunctionComponent = () => {
    const route = useRouter();
    const dispatch = useDispatch();
    const { detail, dialog, user, vocabLength, autoPlay } = useSelector((state: RootState) => ({ ...state.visible, ...state.user }));
    const signout = (): void => {
        toggle();
        route.push("/");
        dispatch(setLogin(false));
        localStorage.removeItem("token");
        firebase.auth().signOut();
    };

    const toggle = () => dispatch(toggleDialog());

    const exportData = () =>
        apiHandler({ url: "/vocab/export", responseType: "blob" }, (response: any) => {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "export.csv"); //or any other extension
            document.body.appendChild(link);
            link.click();
        });

    return (
        dialog && (
            <Card className="identity">
                <Card.Header className="bg-secondary text-white">Profile & Setting</Card.Header>
                <Card.Body className="settting">
                    <Card.Title>Hello {user ? user : "Guest"}</Card.Title>
                    {user && (
                        <>
                            <Card.Text>
                                {`You have learnt ${vocabLength} words`}
                                <Divider content="Mode" className="mx-1" />
                                <Mode />

                                <Divider content="Auto play" className="mx-1" />
                                <ButtonMod variant={autoPlay.onCorrect ? "secondary" : "light"} onClick={() => dispatch(toggleAutoPlay("onCorrect"))} text="Input correct" />{' '}
                                <ButtonMod variant={autoPlay.onVerifierClick ? "secondary" : "light"} onClick={() => dispatch(toggleAutoPlay("onVerifierClick"))} text="Verifier click" />

                                <Divider content="Expand" className="mx-1" />
                                <ButtonMod variant={detail.always ? "secondary" : "light"} onClick={() => dispatch(toggleDetail("always"))} text="All" />{' '}
                                <ButtonMod variant={detail.onCorrect ? "secondary" : "light"} onClick={() => dispatch(toggleDetail("onCorrect"))} text="On correct" />

                                <VoiceSetting toggle={toggle} />
                                <Divider content="Learning progress" className="mx-1" />
                                <ButtonMod variant="secondary" onClick={() => route.push("/chart")} text="View" />{' '}
                                <ButtonMod variant="secondary" onClick={exportData} text="Export" />
                            </Card.Text>
                            <hr className="my-12" />
                            <ButtonMod variant="danger" onClick={signout} text="Logout" />{' '}
                        </>
                    )}
                    <ButtonMod variant="secondary" onClick={toggle} text="Dismiss" />
                </Card.Body>
            </Card>
        )
    );
};

export default Profile;
