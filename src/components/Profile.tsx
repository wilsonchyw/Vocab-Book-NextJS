import Divider from "components/Divider";
import Mode from "components/Profile/Mode";
import { setLogin, toggleAutoPlay, toggleDetail, toggleDialog, toggleVerifierDisplay } from "components/slices";
import VoiceSetting from "components/VoiceSetting";
import apiHandler from "lib/fetchHandler";
import { firebase } from "lib/firebaseInit";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ButtonMod from "components/Profile/ButtonMod";
import useAgent from "lib/useAgent";

const Profile: FunctionComponent = () => {
    const isMobile = useAgent();
    const route = useRouter();
    const dispatch = useDispatch();
    const { detail, dialog, user, vocabLength, autoPlay, verifierDisplay } = useSelector((state: RootState) => ({ ...state.visible, ...state.user }));
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

    useEffect(() => {
        function listenOuterClick(event) {
            if (dialog) {
                const between = (a: number, b: number, c: number): boolean => a <= b && b <= c;
                const el = document.querySelector(".identity");
                const { left, right, bottom, top } = el.getBoundingClientRect();
                const { clientX, clientY } = event;
                if (!between(left, clientX, right) || !between(top, clientY, bottom)) toggle();
            }
        }
        window.addEventListener("click", listenOuterClick);

        return () => {
            window.removeEventListener("click", listenOuterClick);
        };
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
                                <Divider content="Mode" offset="mx-1" />
                                <Mode />
                                <Divider content="Auto play" offset="mx-1" />
                                <ButtonMod variant={autoPlay.onCorrect ? "secondary" : "light"} onClick={() => dispatch(toggleAutoPlay("onCorrect"))} text="Input correct" />{" "}
                                <ButtonMod variant={autoPlay.onVerifierClick ? "secondary" : "light"} onClick={() => dispatch(toggleAutoPlay("onVerifierClick"))} text="Verifier click" />
                                <Divider content="Expand" offset="mx-1" />
                                <ButtonMod variant={detail.always ? "secondary" : "light"} onClick={() => dispatch(toggleDetail("always"))} text="All" />{" "}
                                <ButtonMod variant={detail.onCorrect ? "secondary" : "light"} onClick={() => dispatch(toggleDetail("onCorrect"))} text="On correct" />
                                {isMobile && <ButtonMod variant={verifierDisplay ? "secondary" : "light"} onClick={() => dispatch(toggleVerifierDisplay())} text="Verifier" />}
                                <VoiceSetting toggle={toggle} />
                                <Divider content="Learning progress" offset="mx-1" />
                                <ButtonMod variant="secondary" onClick={() => route.push("/chart")} text="View" /> <ButtonMod variant="secondary" onClick={exportData} text="Export" />
                            </Card.Text>
                            <hr className="my-12" />
                            <ButtonMod variant="danger" onClick={signout} text="Logout" />{" "}
                        </>
                    )}
                    <ButtonMod variant="secondary" onClick={toggle} text="Dismiss" />
                </Card.Body>
            </Card>
        )
    );
};

export default Profile;
