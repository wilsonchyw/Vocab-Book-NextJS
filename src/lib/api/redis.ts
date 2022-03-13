import { createClient } from "redis";
import LOG from "lib/log";

let client: any = null;

async function getClient() {
    if (!client) {
        client = createClient({
            url: "redis://redis:6379",
        });
        await client.connect();
        client.on("error", (err: any) => {
            LOG("Redis Client Error", err);
            client = null;
        });
    }
    return client;
}

async function set(key: string, value: any) {
    const client = await getClient();
    await client.set(key, JSON.stringify(value));
}

async function get(key: string){
    const client = await getClient();
    return client
        .get(key)
        .then((result:string) => result)
        .catch((err:any) => LOG(err));
}

async function clear(key: string) {
    const client = await getClient();
    LOG("Deleting user cache", key);
    await client.del(key);
}

const redis = {
    get: get,
    set: set,
    clear: clear,
};
export default redis;
