import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import AuthOptions from "../auth/[...nextauth]";
import { UserModel } from "../../../models/users";
import { VideoModel } from "../../../models/video";
import { ConnectDB } from "../../../config/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // const { id } = req.query

  // Fetch session
  const session = await getServerSession(req, res, AuthOptions);
  console.log('session', session)
  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract userId from session
  const userEmail = session?.user?.email;
  const user = await UserModel.findOne({ email: userEmail });
  const userId = user?._id.toString();

  try {
    await ConnectDB();

    const videos = await VideoModel.find({ userId: mongoose.Types.ObjectId.createFromHexString(userId) });
    const videoUrls = videos.map(({ videoUrl }) => ({ videoUrl }));

    return res.status(200).json({
      data: videoUrls,
    });

  } catch (error) {
    console.log("ERROR: ", error)
  }
};

// export default handler;
