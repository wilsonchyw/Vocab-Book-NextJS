import Document, { Html, Head, Main, NextScript } from "next/document";
import type { NextPage } from "next";

const NewDocument: NextPage = () => {
    return (
        <Html>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
                <title>Vocabsitory - Learn vocabulary in an efficient way</title>
                <meta name="theme-color" content="#fff" />
                <meta name="description" content="This is a vocabulary book app combined with the forgetting curve to learn new words. Create your vocab book here and make revisions in any device"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
export default NewDocument;
