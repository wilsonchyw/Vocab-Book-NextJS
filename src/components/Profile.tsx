import Divider from "components/Divider";
import Mode from "components/Profile/Mode";
import { toggleAutoPlay, toggleDetail, toggleDialog, toggleVerifierDisplay } from "components/slices";
import VoiceSetting from "components/VoiceSetting";
import apiHandler from "lib/fetchHandler";
import { firebase } from "lib/firebaseInit";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState, useRef, useMemo } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ButtonMod from "components/Profile/ButtonMod";
import useAgent from "lib/useAgent";
import { Alert } from "react-bootstrap";
import Login from "./Login";
import ReadVocab from "./Profile/ReadVocab";
import { Vocab } from "lib/vocab";
const Profile: FunctionComponent = ({ datas}:{datas:Vocab[]}) => {
    const profileRef = useRef(null);
    const [isSigningIn, setSigningIn] = useState<Boolean>(false);
    const isMobile = useAgent();
    const route = useRouter();
    const dispatch = useDispatch();
    const { detail, dialog, user, vocabLength, autoPlay, verifierDisplay, isLocalLogin } = useSelector((state: RootState) => ({ ...state.visible, ...state.user }));
    const signout = (): void => {
        toggle();
        route.push("/");
        //dispatch(setLogin(false));
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
        //const el = document.querySelector(".identity");

        function listenOuterClick(event) {
            if (dialog) {
                const el = profileRef.current;
                const { left, right, bottom, top } = el.getBoundingClientRect();
                const between = (a: number, b: number, c: number): boolean => a <= b && b <= c;
                //console.log({ left, right, bottom, top });
                const { clientX, clientY } = event;
                //console.log({ clientX, clientY });
                if (!between(left, clientX, right) || !between(top, clientY, bottom)) {
                    //console.log("click outside");
                    toggle();
                }
            }
        }
        window.addEventListener("click", listenOuterClick);
        return () => {
            window.removeEventListener("click", listenOuterClick);
        };
    });

    const alert = useMemo(
        () =>
            isLocalLogin ? (
                <Alert style={{ display: "inline-block", whiteSpace: "pre-wrap" }}>
                    {`It is highly recommended that you login before using this application.\n\nOtherwise data store locally only. Learning progress will not sync between devices.\n\nAlso, some functions may not be supported`}{" "}
                </Alert>
            ) : null,
        [isLocalLogin]
    );
    return (
        dialog && (
            <Card className="identity" style={{ width: "300px", height: "600px" }} ref={profileRef}>
                <Card.Header className="bg-secondary text-white">Profile & Setting</Card.Header>
                <Card.Body className="settting">
                    {isSigningIn ? (
                        <Login dismiss={() => setSigningIn(false)} />
                    ) : (
                        <>
                            <Card.Title>Hello {user ? user : "Guest"}</Card.Title>
                            {alert}
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
                                <VoiceSetting toggle={toggle} datas={datas}/>
                                <Divider content="Learning progress" offset="mx-1" />
                                <ButtonMod variant="secondary" onClick={() => route.push("/chart")} text="View" />{" "}
                                <ButtonMod variant="secondary" onClick={exportData} text="Export" disabled={isLocalLogin} />
                            </Card.Text>
                            <hr className="my-12" />
                            {isLocalLogin ? <ButtonMod variant="primary" onClick={() => setSigningIn(true)} text="Sign in" /> : <ButtonMod variant="danger" onClick={signout} text="Logout" />}
                            <ButtonMod variant="secondary" onClick={toggle} text="Dismiss" />
                        </>
                    )}
                </Card.Body>
            </Card>
        )
    );
};

export default Profile;
