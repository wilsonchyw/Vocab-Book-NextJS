import GitHubIcon from '@mui/icons-material/GitHub';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import SpeedIcon from '@mui/icons-material/Speed';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import TranslateIcon from '@mui/icons-material/Translate';
import { setVocabs } from 'components/slices';
import apiHandler from "lib/fetchHandler";
import getLocalToken from 'lib/localToken';
import ReactPageScroller from 'lib/react-page-scroller';
import type { Vocab } from 'lib/vocab';
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

function FadeInSection(props: any) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
    }, []);
    return (
        <div
            style={{ height: `${props.height}vh` }}
            className={`fade-in-section ${isVisible ? 'is-visible' : ''} `}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}

function Index(): NextPage {
    const dispatch = useDispatch()
    const [page, setPage] = useState<number>(0)

    function fetchData() {
        apiHandler({ url: "/vocab" }, (result: Vocab[]) => {
            console.log(result)
            dispatch(setVocabs(result))
        })
    }

    useEffect(() => {
        if (getLocalToken()) fetchData()
    }, [])

    return (
        <>
            <FadeInSection height={75}>
                <FirstComponent />
            </FadeInSection>
            <FadeInSection height={75}>
                <SecondComponent />
            </FadeInSection>
            <FadeInSection height={100}>
                <ThirdComponent />
            </FadeInSection>
        </>


    )

    return (
        <Stack gap={0}>
            <ReactPageScroller
                pageOnChange={setPage}
                customPageNumber={page}
                animationTimer={500}
                renderAllPagesOnFirstRender={false}
            >
                <FirstComponent height={100} />
                <SecondComponent height={75} />
                <ThirdComponent height={100} />
            </ReactPageScroller>
        </Stack>

    )
}

export default Index

function FirstComponent(): FunctionComponent {
    const router = useRouter()
    return (
        <div className="bg-dark h-100 d-flex align-items-center">
            <div className="container px-5 ">
                <div className="row gx-5 align-items-center justify-content-center">
                    <div className="col-lg-8 col-xl-7 col-xxl-6">
                        <div className="my-5 text-center text-xl-start">
                            <h1 className="display-5 fw-bolder text-white mb-2">Vocabulary Repository</h1>
                            <p className="lead fw-normal text-white-50 mb-4">Vocabsitory is an application combined with the forgetting curve to learn new words. It helps to learn vocabulary in an more efficient way.</p>
                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                <a className="btn btn-primary btn-lg px-4 me-sm-3" onClick={() => router.push("/vocab")}>Get Started</a>
                                <a className="btn btn-outline-light btn-lg px-4 d-flex align-items-center" href="https://github.com/wilsonych/Vocab-Book-NextJS"><GitHubIcon />Follow</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                        <img width={550} height={400} src="/screenshot4.png" alt="Vocabsitory" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function SecondComponent(): FunctionComponent {
    return (
        <div className="bg-white h-100 d-flex align-items-center">
            <div className="container ">
                <div className="row gx-5 align-items-center justify-content-center">
                    <div className="col-lg-6 ">
                        <img width={700} height={500} src="/forgetting-curve.png" alt="forgetting curve" />
                    </div>
                    <div className="col-lg-8 col-xl-7 col-xxl-6">
                        <div className="my-5 text-center text-xl-start">
                            <p className="lead fw-normal text-secondary mb-4 text-center">The forgetting curve hypothesizes the decline of memory retention in time. This curve shows how information is lost over time when there is no attempt to retain it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ThirdComponent(): FunctionComponent {
    return (
        <div className="bg-light h-100 d-flex align-items-center">
            <div className="container ">
                <div className="row gx-5">
                    <div className="col-lg-4 mb-5 mb-lg-0"><h2 className="fw-bolder mb-0">Comprehensive features</h2></div>
                    <div className="col-lg-8">
                        <div className="row gx-5 row-cols-1 row-cols-md-2">
                            <div className="col mb-5 h-100">
                                <h2 className="h5"><TranslateIcon />Multiple language</h2>
                                <p className="mb-0">Vocabsitory suport multiple language pronouncing. You could choose your perfered accent and speak rate</p>
                            </div>
                            <div className="col mb-5 h-100 ">
                                <h2 className="h5"><SpellcheckIcon />Revision</h2>
                                <p className="mb-0">Various methods of revision are provided. Revise by words, meanings, pronouncing, forgetting curve or randomly.</p>
                            </div>
                            <div className="col mb-5 h-100">
                                <h2 className="h5"><ImportantDevicesIcon />Mobile compatible</h2>
                                <p className="mb-0">Access your own vocab at any time, any device</p>
                            </div>
                            <div className="col h-100">
                                <h2 className="h5"><SpeedIcon />Speedy and reliable</h2>
                                <p className="mb-0">Cache by CloudFlare and deploy on Cloud server.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}