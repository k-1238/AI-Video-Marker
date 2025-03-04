import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
} from "@mui/material";
import { MdClose } from "react-icons/md";
// import { usePostInputVideoProp } from "@/services";
import { convertLengthToDuration } from "../../utils/common";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Asynchronous from "./ui/Asynchronous";

interface InputModalProps {
  open: boolean;
  handleClose: () => void;
  status: "free" | "pro"; // User status determines available options
}

const InputModal: React.FC<InputModalProps> = ({ open, handleClose, status }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [orientation, setOrientation] = useState<string>("square");
  const [length, setLength] = useState<string>("30 seconds");
  const [durationPerScene, setDurationPerScene] = useState<string>("15 seconds");
  const [voice, setVoice] = useState<string | null>(null);
  const { data: session } = useSession()

  const router = useRouter();

  // console.log('session', session)

  // Options for orientation and length
  const orientationOptions = ["square", "portrait", "landscape"];
  const lengthOptions = ["30 seconds", "1 minute", "1.5 minutes", "2 minutes"];
  const durationPerSceneOptions = ["15 seconds", "10 seconds"];

  const handleSubmit = async () => {
    try {
      // Convert length to duration in seconds
      const duration = convertLengthToDuration(length);

      const data = { prompt, orientation, duration, durationPerScene: convertLengthToDuration(durationPerScene), voice };

      router.push({
        pathname: "/app/choose-template",
        query: data,
      });
      // Close the modal on success
      //   handleClose();
    } catch (err) {
      console.error("Error posting video data:", err);
    }
  };

  const isPro = session && session?.user?.priceName?.name?.trim().toLowerCase() === "premium";

  // console.log('is pro', isPro)

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 5,
          borderRadius: 2,
          position: "relative",
          color: "black",
        }}
      >
        {/* Close Icon */}
        <MdClose
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
            fontSize: "24px",
            color: "#000",
          }}
        />
        <Typography variant="h6" gutterBottom>
          Generate Video
        </Typography>
        <TextField
          fullWidth
          label="Prompt or Keyword"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          inputProps={{ maxLength: 120 }}
          helperText={`${prompt.length}/120 characters`}
          margin="normal"
        />
        <Asynchronous setVoice={setVoice}/>
        <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
          Orientation
        </Typography>
        <RadioGroup
          value={orientation}
          onChange={(e) => setOrientation(e.target.value)}
        >
          <Grid container spacing={2}>
            {orientationOptions.map((option) => (
              <Grid item xs={6} key={option}>
                <Box display="flex" justifyContent="space-even" alignItems="center">
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    label={option.charAt(0).toUpperCase() + option.slice(1)}
                    disabled={!isPro && option !== "square"}
                  />
                  {!isPro && option !== "square" && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 1, color: "orange", fontSize: 10 }}
                    >
                      Pro
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
        <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
          Length
        </Typography>
        <RadioGroup
          value={length}
          onChange={(e) => setLength(e.target.value)}
        >
          <Grid container spacing={2}>
            {lengthOptions.map((option) => (
              <Grid item xs={6} key={option}>
                <Box display="flex" justifyContent="space-even" alignItems="center">
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    label={option}
                    disabled={
                      !isPro &&
                      (option === "1.5 minutes" || option === "2 minutes")
                    }
                  />
                  {!isPro &&
                    (option === "1.5 minutes" || option === "2 minutes") && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1, color: "orange", fontSize: 10 }}
                      >
                        Pro
                      </Typography>
                    )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
        <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
          Duration Per Scene
        </Typography>
        <RadioGroup
          value={durationPerScene}
          onChange={(e) => setDurationPerScene(e.target.value)}
        >
          <Grid container spacing={2}>
            {durationPerSceneOptions.map((option) => (
              <Grid item xs={6} key={option}>
                <Box display="flex" justifyContent="space-even" alignItems="center">
                  <FormControlLabel
                    value={option}
                    control={<Radio />}
                    label={option}
                    disabled={
                      !isPro &&
                      (option === "10 seconds")
                    }
                  />
                  {!isPro &&
                    (option === "10 seconds") && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ ml: 1, color: "orange", fontSize: 10 }}
                      >
                        Pro
                      </Typography>
                    )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </RadioGroup>
        <Box mt={5} display="flex" justifyContent="space-between">
          <Button variant="outlined" size="large" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InputModal;