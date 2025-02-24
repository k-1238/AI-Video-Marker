import React, { useState, useEffect } from "react";
import { Grid2 as Grid, Typography } from "@mui/material";
import AppLayout from "@/layouts/app-layout";
import VideoCard from "@/components/videoCard";
import { fetchVideos, Video } from "@/services";

const Page = () => {
  const [videos, setVideos] = useState<{ src: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoData = await fetchVideos(); // Assuming this returns an object
        console.log('video data', videoData);
  
        // Convert the object to an array before mapping
        const videoArray = Array.isArray(videoData) ? videoData.flat() : Object.values(videoData).flat();
        console.log('video array', videoArray)
  
        // Extract only video URLs
        setVideos(videoArray.map(video => ({ src: video.videoUrl })));
  
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };
  
    fetchData();
  }, []);
  
  console.log('videos', videos)

  return (
    <div>
      <AppLayout>
        <Typography variant="h4">All Videos</Typography>
        <br />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {videos.map((video, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} component="div">
              <video width="400" controls>
                <source src={video.src} type="video/mp4" />
              </video>
            </Grid>
          ))}
        </Grid>
      </AppLayout>
    </div>
  );
};

export default Page;