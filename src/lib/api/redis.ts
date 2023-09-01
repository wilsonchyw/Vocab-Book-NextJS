import { createClient } from "redis";
import LOG from "lib/log";

let client: any = null;

async function getClient() {
  try {
    if (!client) {
      client = createClient({
        url: "redis://redis:6378",
      });
      await client.connect();
      client.on("error", (err: any) => {
        LOG("Redis Client Error", err);
        client = null;
      });
    }
    return client;
  } catch (e) {
    return false;
  }
}

async function set(key: string, value: any) {
  const client = await getClient();
  if (!client) return;
  await client.set(key, JSON.stringify(value));
}

async function get(key: string) {
  const client = await getClient();
  if (!client) return false;
  return client
    .get(key)
    .then((result: string) => result)
    .catch((err: any) => LOG(err));
}

async function clear(key: string) {
  const client = await getClient();
  if (!client) return;
  LOG("Deleting user cache", key);
  await client.del(key);
}

const redis = {
  get: get,
  set: set,
  clear: clear,
};
export default redis;
