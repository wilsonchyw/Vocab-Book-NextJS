const redis = require("redis")
const createClient= redis.createClient


let client = null;

async function getClient() {
    if (!client) {
        client = createClient({
            url: "redis://redis:6379",
        });
        await client.connect();
        client.on("error", (err) => {
            console.log("Redis Client Error", err);
            client = null;
        });
    }
    return client;
}

async function set(key, value) {
    const client = await getClient();
    await client.set(key, JSON.stringify(value));
}

async function get(key){
    const client = await getClient();
    return client
        .get(key)
        .then((result) => result)
        .catch((err) => console.log(err));
}



getClient()
.then(async client=>{
    const keys = await client.keys('*');
    console.log(keys)
})