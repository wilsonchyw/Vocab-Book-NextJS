import type { NextApiRequest ,NextApiResponse} from "next";

const UNTIL = new Date('Mar 10 2022')
const MESSAGE = "This is a test mesage"

function message(req: NextApiRequest, res: NextApiResponse<string>) {
    if(new Date()<UNTIL){
        res.state(200).send(MESSAGE)
    }else{
        res.state(204).end()
    }
}

export default message;