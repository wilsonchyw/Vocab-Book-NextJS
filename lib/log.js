const fs = require("fs");
const path = require("path");

const genContent = (e, ...message) => {
    const time = process.env.TIME_ZONE ? new Date().toLocaleString("en-US", { timeZone: process.env.TIME_ZONE }) : new Date().toJSON().replace(/[A-Z]/g, " ");
    message = message.map((msg) => (typeof msg === "object" ? JSON.stringify(msg) : msg));
    if(process.env.NODE_ENV==="production") return `${time} ${message.join(" ")}`
    const regex = /\((.*):(\d+):(\d+)\)$/;
    const match = regex.exec(e.stack.split("\n")[2]);
    const location = match[0].split("/").pop().slice(0, -1).padEnd(15);
    
    return `${time} ${location} ${message.join(" ")}`;
};

const LOG = (...message) => {
    const e = new Error();
    const content = genContent(e, ...message);
    console.log(content);
};

LOG.save = (...message) => {
    const e = new Error();
    const content = genContent(e, ...message);
    console.log(content);
    fs.appendFile(path.join(path.resolve(), "log.txt"), content + "\n", function (err) {
        if (err) console.log(err);
    });
};

export default LOG;
