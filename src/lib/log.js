const genContent = (e, ...message) => {    
    const time = process.env.TIME_ZONE ? new Date().toLocaleString("en-US", { timeZone: process.env.TIME_ZONE }) : new Date().toJSON().replace(/[A-Z]/g, " ");
    message = message.map((msg) => (typeof msg === "object" ? JSON.stringify(msg,null,2) : msg));
    if (process.env.NODE_ENV == "test" || process.env.NODE_ENV === "production") return `${time} ${message.join(" ")}`;
    const regex = /\((.*):(\d+):(\d+)\)$/;
    const match = regex.exec(e.stack.split("\n")[2]);
    if (!match) return `${time} anonymous ${message.join(" ")}`;
    const location = match[0].split("/").pop().slice(0, -1).padEnd(15);
    return `${time} ${location} ${message.join(" ")}`;
};

const LOG = (...message) => {
    const e = new Error();
    const content = genContent(e, ...message);
    console.log(content);
};


export default LOG;
