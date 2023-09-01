import type { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res
    .status(502)
    .json({
      message:
        "Server is under maintenance. Add, Edit and Delete is temporary down.",
    });
}

export default handler;
export const config = {
  api: {
    externalResolver: true,
  },
};
