import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import AuthOptions from "../auth/[...nextauth]";
import { ConnectDB } from "../../../config/db";
import axios from "axios";

export default async function createSpeech(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await ConnectDB();
        // Ensure the method is POST
        if (req.method !== "POST") {
            return res.status(405).json({ message: "Method not allowed" });
        }
        // Fetch session
        const session = await getServerSession(req, res, AuthOptions);
        if (!session || !session.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const formData = new FormData();
        formData.append("text", req.body.text);

        const result = await axios.post(`${process.env.SPEECH_BACKEND_URL}/text-to-speech/generate-text-to-speech`, formData);
        return result;
    } catch (error) {
        console.log(error)
        console.error("Error creating video:", error.response?.data);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
