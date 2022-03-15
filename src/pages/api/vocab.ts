import getKnex from "lib/api/knex";
import redis from "lib/api/redis";
import wrapper, { controller } from "lib/api/wrapper";
import LOG from "lib/log";
import verifier from "lib/verifier";
import type { NextApiRequest ,NextApiResponse} from "next";
type Data = {
    name: string;
};

interface vocabController {
    [key: string]: Function;
}

function uuid(): string {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4();
}

const vocabController: controller = {
    get: getVocab,
    post: addVocab,
    put: updateVocab,
    delete: delVocab,
};

async function getVocab(req: NextApiRequest) {
    console.log("getVocab call")
    const cache = await redis.get(req.user);
    if (cache) {
        LOG(`return from redis ${req.user}`);
        return cache;
    } else {
        const result = await getKnex().select(["id", "type", "meaning", "vocabulary", "inflection", "createAt", "example"]).from("vocab").where("user", req.user);
        await redis.set(req.user, result);
        LOG("save redis success");
        return result;
    }
}

async function addVocab(req: NextApiRequest) {
    verifier.atLeast(["type", "meaning", "vocabulary", "inflection"], req.body);
    const vocab = req.body;
    vocab.createAt = Date.now();
    vocab.id = uuid();
    vocab.user = req.user;
    await redis.clear(req.user);
    return getKnex()("vocab").insert(vocab).returning("id");
}

async function updateVocab(req: NextApiRequest) {
    verifier.atMost(["type", "meaning", "vocabulary", "inflection", "id", "createAt", "user", "example"], req.body);
    const id = req.body.id;
    const { id: omitted, ...vocab } = req.body;
    await redis.clear(req.user);
    return getKnex()("vocab").where({ id: id }).update(vocab);
}

async function delVocab(req: NextApiRequest) {
    verifier.exact(["id"], req.body);
    const id = req.body.id;
    await redis.clear(req.user);
    return getKnex()("vocab").where({ id: id }).del();
}

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    wrapper(vocabController)(req, res)
}

export default handler;
export const config = {
    api: {
        externalResolver: true,
    },
};
