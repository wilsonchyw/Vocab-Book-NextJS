const https = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const hostname = "localhost";
const port = process.env.PORT || 5000;
const app = next({ hostname, port });
const handle = app.getRequestHandler();
const Cors = require("cors");

const options = {
    key: fs.readFileSync("nginx/certificate/privkey.pem"),
    cert: fs.readFileSync("nginx/certificate/fullchain.pem"),
};

function initMiddleware(middleware) {
    return (req, res) =>
        new Promise((resolve, reject) => {
            middleware(req, res, (result) => {
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        });
}

const cors = initMiddleware(
    Cors({
        methods: ["GET", "POST", "PUT", "OPTION","DELETE"],
    })
);

app.prepare().then(() => {
    https
        .createServer(options, async (req, res) => {
            const parsedUrl = parse(req.url, true);
            console.log(`Handle request by process ${process.pid} , Method: ${req.method}`)
            await cors(req, res);
            handle(req, res, parsedUrl);
        })
        .listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on https://${hostname}:${port}`);
        });
});
