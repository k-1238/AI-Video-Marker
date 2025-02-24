import { useState } from 'react';
import axios from 'axios';

interface VideoRequest {
  prompt?: string;
  orientation?: string;
  duration?: number;
  durationPerScene?: number;
  template?: string;
  arrayText?: string[];
  // userId : string
}

interface UsePostInputVideoPropResult {
  isLoading: boolean;
  error: string | null;
  postVideo: (data: VideoRequest) => Promise<{ videoUrl: string } | undefined>;
}

export const usePostInputVideoProp = (): UsePostInputVideoPropResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postVideo = async (data: VideoRequest): Promise<{ videoUrl: string } | undefined> => {
    console.log('data received', data)
    setIsLoading(true);
    setError(null); // Reset any previous errors

    try {
      const response = await axios.post('/api/video/createVideo', data);
      console.log('Video generated:', response.data);

      // Return the video URL from the response
      return { videoUrl: response.data.data.videoUrl }; // Adjust based on your API response structure
    } catch (err: any) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'An error occurred');
      return undefined; // Return undefined in case of error
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, postVideo };
};


export interface Video {
  thumbnail: string;
  src: string;
}

export const fetchVideos = async (): Promise<Video[]> => {
  try {
    const response = await axios.get(`/api/video`);
    return response.data; // Assuming the response has a 'videos' array
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    throw error;
  }
};
