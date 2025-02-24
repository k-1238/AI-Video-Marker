import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import AppLayout from "@/layouts/app-layout";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  // State to hold initial data and selected template
  const [videoRequest, setVideoRequest] = useState({
    prompt: "",
    orientation: "",
    duration: 0,
    durationPerScene: 0,
    template: "",
    arrayText: [], // Add arrayText to the initial state
  });
  
  // Extract state from router and initialize local state
  useEffect(() => {
    if (router.query.prompt) {
      setVideoRequest((prev) => ({
        ...prev,
        prompt: router.query.prompt as string,
        orientation: router.query.orientation as string,
        duration: Number(router.query.duration),
        durationPerScene: Number(router.query.durationPerScene),
      }));
    } else if (router.query.textareas) {
      setVideoRequest((prev) => ({
        ...prev,
        arrayText: JSON.parse(router.query.textareas as string),
      }));
    } else {
      console.warn("No state data found");
      // router.push("/app/dashboard"); // Redirect if state is missing
    }
  }, [router.query]);
  

   // Handle template selection
   const handleTemplateSelect = (name: string) => {
    setVideoRequest((prev) => ({ ...prev, template:name }));
  };

  // console.log('video request', videoRequest)

  // Handle form submission
  const handleSubmit = async () => {
    try {
      alert("Template chosen successfully!");
  
      // Determine the query parameters based on videoRequest
      const queryParams = videoRequest.prompt
        ? {
            prompt: videoRequest.prompt,
            orientation: videoRequest.orientation,
            duration: videoRequest.duration,
            durationPerScene: videoRequest.durationPerScene,
            template: videoRequest.template,
          }
        : {
            arrayText: JSON.stringify(videoRequest.arrayText), // Ensure it's passed as a string
            template: videoRequest.template,
          };
  
      // Navigate to result page with the appropriate query
      router.push({
        pathname: "/app/result",
        query: queryParams,
      });
    } catch (e) {
      console.error("Error submitting template request:", e);
    }
  };

  return (
    <div>
      <AppLayout>
        <Typography variant="h4">Choose Your Template</Typography>
        <br />
        <Grid
        container
        spacing={{
          xs: 2,
          md: 3,
        }}
        columns={{
          xs: 4,
          sm: 8,
          md: 12,
        }}
        sx={{
          display: "flex",
          flexDirection: "row", // Ensure children are in a single row
          justifyContent: "space-between", // Adjust spacing between items
          flexWrap: "nowrap", // Prevent wrapping to the next line
        }}
      >
        {[{ id: 1, name: "Static" }, { id: 2, name: "Classic Fade" }, { id: 3, name: "Modern Slide" }].map((val) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={val.id}
            component="div"
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
                backgroundColor: videoRequest.template === val.name && "orange",
              }}
              onClick={() => handleTemplateSelect(`${val.name}`)}
            >
              <CardMedia
                component="img"
                image={`https://picsum.photos/1000/1000?random=${val.id}`}
                alt={`Template ${val.id}`}
                sx={{ aspectRatio: 2 / 1 }}
              />
              <CardContent>
                <Typography>{val.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      </AppLayout>
    </div>
  )
}

export default Page;
