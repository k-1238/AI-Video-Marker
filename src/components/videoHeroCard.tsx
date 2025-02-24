import React from 'react';
import { Card, CardMedia } from '@mui/material';

export default function VideoHeroCard() {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 1600,
        borderRadius: '14px',
        boxShadow: 3,
        margin: 'auto',
      }}
    >
      {/* Video */}
      <CardMedia
        component="video"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        muted
        loop
        sx={{
          height: 800,
          objectFit: 'cover',
        }}
      />
    </Card>
  );
}