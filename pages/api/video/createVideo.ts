import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import AuthOptions from "../auth/[...nextauth]";
import { VideoModel } from "../../../models/video";
import { UserModel } from "../../../models/users";
import { ConnectDB } from "../../../config/db";
import axios from "axios";

export default async function createVideo(
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

    // Extract userId from session
    const userEmail = session?.user?.email;
    const user = await UserModel.findOne({ email: userEmail });
    const userId = user?._id.toString();

    let videoResultUrl;
    // if (req.body.template === "Static") {
    //   const formData = new FormData();
    //   if (req.body.arrayText) {
    //     formData.append("prompt_text", req.body.arrayText)
    //   } else if (req.body.prompt) {
    //     formData.append("prompt_text", req.body.prompt)
    //   } else {
    //     throw new Error("No Array Text Or Prompt Text Found")
    //   }
    //   formData.append("duration_total", req.body.duration)
    //   formData.append("duration_per_scene", req.body.durationPerScene)
    //   formData.append("orientation", req.body.orientation)
    //   formData.append("font_color", "white")
    //   formData.append("font_size", "20")
    //   formData.append("transition", "none")
    //   videoResultUrl = await axios.post(`${process.env.VIDEO_BACKEND_URL}/api/generate-ai`, formData);
    // } else if (req.body.template === "Classic Fade") {
    //   const formData = new FormData();
    //   if (req.body.arrayText) {
    //     formData.append("prompt_text", req.body.arrayText)
    //   } else if (req.body.prompt) {
    //     formData.append("prompt_text", req.body.prompt)
    //   } else {
    //     throw new Error("No Array Text Or Prompt Text Found")
    //   }

    //   // console.log('form data', formData)
    //   formData.append("duration_total", req.body.duration)
    //   formData.append("duration_per_scene", req.body.durationPerScene)
    //   formData.append("orientation", req.body.orientation)
    //   formData.append("font_color", "yellow")
    //   formData.append("font_size", "16")
    //   formData.append("transition", "fade")
    //   console.log('form data', formData)
    //   videoResultUrl = await axios.post(`${process.env.VIDEO_BACKEND_URL}/api/generate-ai`, formData);
    // } else if (req.body.template === "Modern Slide") {
    //   const formData = new FormData();
    //   if (req.body.arrayText) {
    //     formData.append("prompt_text", req.body.arrayText)
    //   } else if (req.body.prompt) {
    //     formData.append("prompt_text", req.body.prompt)
    //   } else {
    //     throw new Error("No Array Text Or Prompt Text Found")
    //   }
    //   formData.append("duration_total", req.body.duration)
    //   formData.append("duration_per_scene", req.body.durationPerScene)
    //   formData.append("orientation", req.body.orientation)
    //   formData.append("font_color", "cyan")
    //   formData.append("font_size", "22")
    //   formData.append("transition", "slide")
    //   videoResultUrl = await axios.post(`${process.env.VIDEO_BACKEND_URL}/api/generate-ai`, formData);
    // }

    if (req.body.template === "Static") {
      const formData = new FormData();
    
      if (req.body.arrayText) {
        // formData.append("array_text", req.body.arrayText);
        // Convert the array into a JSON string
        const arrayTextJsonString = JSON.stringify(req.body.arrayText);
        formData.append("array_text", arrayTextJsonString);
        
        // Assign manually for duration, durationPerScene, and orientation if arrayText is provided
        formData.append("duration_per_scene", 10); // set duration per scene to 10 seconds
        formData.append("duration_total", req.body.arrayText.length * 10); // calculate total duration
        formData.append("orientation", "square"); // default to square orientation
        formData.append("type", "video"); 
      } else if (req.body.prompt) {
        formData.append("prompt_text", req.body.prompt);
        
        // If prompt is provided, use req.body values
        formData.append("duration_total", req.body.duration);
        formData.append("duration_per_scene", req.body.durationPerScene);
        formData.append("orientation", req.body.orientation);
      } else {
        throw new Error("No Array Text Or Prompt Text Found");
      }
    
      formData.append("font_color", "white");
      formData.append("font_size", "20");
      formData.append("transition", "none");
      
      videoResultUrl = await axios.post(`${process.env.VIDEO_BACKEND_URL}/api/generate-ai`, formData);
      
    } else if (req.body.template === "Classic Fade") {
      const formData = new FormData();
    
      if (req.body.arrayText) {
        // formData.append("array_text", req.body.arrayText);

        const arrayTextJsonString = JSON.stringify(req.body.arrayText);
        formData.append("array_text", arrayTextJsonString); // Append the 
        
        // Assign manually for duration, durationPerScene, and orientation if arrayText is provided
        formData.append("duration_per_scene", 10); // set duration per scene to 10 seconds
        formData.append("duration_total", req.body.arrayText.length * 10); // calculate total duration
        formData.append("orientation", "square"); // default to square orientation
        formData.append("type", "video"); 
        console.log('form data', formData)
      } else if (req.body.prompt) {
        formData.append("prompt_text", req.body.prompt);
        
        // If prompt is provided, use req.body values
        formData.append("duration_total", req.body.duration);
        formData.append("duration_per_scene", req.body.durationPerScene);
        formData.append("orientation", req.body.orientation);
      } else {
        throw new Error("No Array Text Or Prompt Text Found");
      }
    
      formData.append("font_color", "yellow");
      formData.append("font_size", "16");
      formData.append("transition", "fade");
    
      videoResultUrl = await axios.post(`${process.env.VIDEO_BACKEND_URL}/api/generate-ai`, formData);
    
    } else if (req.body.template === "Modern Slide") {
      const formData = new FormData();
    
      if (req.body.arrayText) {
        // formData.append("array_text", req.body.arrayText);

        const arrayTextJsonString = JSON.stringify(req.body.arrayText);
        formData.append("array_text", arrayTextJsonString); // Append the 
        
        // Assign manually for duration, durationPerScene, and orientation if arrayText is provided
        formData.append("duration_per_scene", 10); // set duration per scene to 10 seconds
        formData.append("duration_total", req.body.arrayText.length * 10); // calculate total duration
        formData.append("orientation", "square"); // default to square orientation
        formData.append("type", "video"); 
      } else if (req.body.prompt) {
        formData.append("prompt_text", req.body.prompt);
        
        // If prompt is provided, use req.body values
        formData.append("duration_total", req.body.duration);
        formData.append("duration_per_scene", req.body.durationPerScene);
        formData.append("orientation", req.body.orientation);
      } else {
        throw new Error("No Array Text Or Prompt Text Found");
      }
    
      formData.append("font_color", "cyan");
      formData.append("font_size", "22");
      formData.append("transition", "slide");
    
      videoResultUrl = await axios.post(`${process.env.VIDEO_BACKEND_URL}/api/generate-ai`, formData);
    }

    // Type-check the request body
    // const { userId } = req.body;
    // console.log('user id', userId)

    // Create the video in the database
    const video = await VideoModel.create({
      videoUrl: videoResultUrl?.data?.data,
      userId: userId ?? '',
    });

    return res.status(200).json({
      data: video,
    });
  } catch (error) {
    console.log(error)
    console.error("Error creating video:", error.response?.data);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
