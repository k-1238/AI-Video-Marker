import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import AppLayout from "@/layouts/app-layout";
import { usePostInputVideoProp } from "@/services";
import { useRouter } from "next/router";
import Lottie from "react-lottie";
import loadingAnimation from "../../data/triangle.json"

const VideoContent = () => {
  const router = useRouter();
  const { postVideo, isLoading, error } = usePostInputVideoProp();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Extract videoRequest from router.query
  console.log('array text', router.query.arrayText)
  const videoRequest = router.query.arrayText
    ? {
      arrayText: JSON.parse(router.query.arrayText as string),
      template: router.query.template as string
    }
    : {
      voice: router.query.voice as string,
      prompt: router.query.prompt as string,
      orientation: router.query.orientation as string,
      duration: Number(router.query.duration),
      durationPerScene: Number(router.query.durationPerScene),
      template: router.query.template as string,
    };

  // console.log('vide request', videoRequest)
  // Call postVideo and handle response
  useEffect(() => {
    const submitVideoRequest = async () => {
      if (videoUrl || !videoRequest) return;
      try {
        // const videoRequestWithUserId = {
        //   ...videoRequest,
        //   userId: session?.user?.id,
        // };

        console.log("video run");

        const response = await postVideo(videoRequest);
        console.log("Video generated:", response);
        setVideoUrl((prev) => (prev === response?.videoUrl ? prev : response?.videoUrl));
      } catch (e) {
        console.error("Error processing video request:", e);
      }
    };

    submitVideoRequest();
  }, [router.query, videoUrl]);


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Lottie options={{ loop: true, animationData: loadingAnimation }} height={200} width={200} />
      </div>
    );
  }

  if (error) {
    return (
      <Typography color="error">
        Failed to process the video: {error}
      </Typography>
    );
  }

  const handleDownload = () => {
    // Create an anchor element dynamically
    const anchor = document.createElement("a");
    anchor.href = videoUrl || '';
    anchor.download = "video.mp4"; // Name of the downloaded file
    anchor.click(); // Trigger the download
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          color: "primary.main",
        }}
      >
        Your Video Is Ready
      </Typography>
      <video width="600" controls>
        <source src={videoUrl} type="video/mp4" />
        {/* Your browser does not support the video tag. */}
      </video>
      <Button variant="contained" onClick={handleDownload}>
        Download
      </Button>
    </Box>
  );
};

const Page = () => (
  <div>
    <AppLayout visibleDrawer={false}>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Skeleton variant="text" width="50%" height={40} />
            <Skeleton variant="rectangular" width={600} height={338} />
            <Skeleton variant="text" width="30%" />
          </Box>
        }
      >
        <VideoContent />
      </Suspense>
    </AppLayout>
  </div>
);

export default Page;