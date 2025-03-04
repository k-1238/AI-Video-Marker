import React, { useState, useEffect } from "react";
import { Badge, Grid2 as Grid, Typography } from "@mui/material";
import AppLayout from "@/layouts/app-layout";
import VideoCard from "@/components/videoCard";
import { fetchVideos, Video } from "@/services";
import loadingAnimation  from "../../data/triangle.json";
import Lottie from "react-lottie";

const Page = () => {
  const [videos, setVideos] = useState<{ src: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const videoData = await fetchVideos(); // Assuming this returns an object

        // Convert the object to an array before mapping
        const videoArray = Array.isArray(videoData) ? videoData.flat() : Object.values(videoData).flat();

        // Extract only video URLs
        setVideos(videoArray.map(video => ({ src: video.videoUrl })));
        setIsLoading(false)

      } catch (error) {
        setIsLoading(false)
        console.error('Failed to fetch videos:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <AppLayout>
        <div className="mt-6">
          <Typography variant="h4">Completed All Videos</Typography>

          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <Lottie options={{ loop: true, animationData: loadingAnimation }} height={200} width={200} />
            </div>
          ) : (

            <Grid
              container
              textAlign={"center"}
              justifyItems={"center"}
              marginTop={"30px"}
              paddingX={"50px"}
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 2, sm: 8, md: 12 }}
            >
              {videos.length > 0 ? videos.map((video, index) => (
                <Grid xs={2} sm={4} md={4} key={index} component="div" border={"2px solid #8b5cf6"} borderRadius={"10px"} padding={"20px"}>
                  <Badge color="primary" variant="dot">
                    <video width="400" controls>
                      <source src={video.src} type="video/mp4" />
                    </video>
                  </Badge>

                </Grid>
              )): (
                <Typography>No Videos</Typography>
              )}
            </Grid>
          )}



        </div>

      </AppLayout>
    </div>
  );
};

export default Page;