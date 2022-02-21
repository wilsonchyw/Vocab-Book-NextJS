import { firebaseAdmin } from "lib/api/firebaseInit";
import { clearCache } from "lib/api/knex";
import LOG from "lib/log";
import type { NextApiRequest, NextApiResponse } from "next";

export type controller = {
    [key: string]: (req: NextApiRequest) => Promise<any>;
};

function wrapper(controller: controller) {
    return (req: NextApiRequest, res: NextApiResponse<any>) => {
        const token = req.headers.authorization;
        if (!token) return res.status(400).json({ message: "Missing Authorization header value" });

        const method: string = req.method.toLowerCase();
        firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken: any) => ({ ...req, user: decodedToken.uid }))
            .then(controller[method])
            .then((result: any) => res.status(200).json(result))
            .catch((error: any) => {
                if (error.errorNum === 0 || error.errorNum === 12154) {
                    LOG("oracle disconnect");
                    clearCache();
                    return res.status(400).json({ message: "Server problem, please try again" });
                }
                console.log(error);
                LOG.save(error);
                return res.status(400).json({ message: error.toString() });
            });
    };
}

export default wrapper;
