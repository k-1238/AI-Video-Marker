import React, { useState } from "react";
import { Card, CardMedia, Box, IconButton, Modal, Backdrop, Fade } from "@mui/material";
import { FaPlay } from "react-icons/fa";

interface VideoCardProps {
  videoThumbnail: string; // URL for the thumbnail image
  videoSrc: string; // URL for the video source
}

const VideoCard: React.FC<VideoCardProps> = ({ videoThumbnail, videoSrc }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const defaultThumbnail = "https://via.placeholder.com/300x180";

  return (
    <>
      {/* Video Card */}
      <Card
        elevation={2}
        sx={{
          borderRadius: "12px",
          transition: "box-shadow 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: 250, // Adjust height as needed
          "&:hover": { boxShadow: 6 },
          position: "relative",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Video Thumbnail */}
        <CardMedia
          component="video"
          src={videoSrc}
          muted
          autoPlay={isHovered} // Autoplay on hover
          loop
          poster={videoThumbnail || defaultThumbnail} // Fallback thumbnail
          sx={{
            height: 250,
            objectFit: "cover",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            backgroundColor: "white",
            borderRadius: "50%", // Circular shape
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            cursor: "pointer",
          }}
          onClick={handleOpenModal}
        >
          <FaPlay size={24} color="lightblue" />
        </Box>
      </Card>

      {/* Modal for Playing Video */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={isModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 800,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 2,
            }}
          >
            <CardMedia
              component="video"
              src={videoSrc}
              controls
              autoPlay
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default VideoCard;