import React, { useCallback, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    TextareaAutosize,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { GiStarSwirl } from "react-icons/gi";
import axios from "axios";
import CustomizedInputBase from "./ui/Asynchronous";

interface InputModalProps {
    open: boolean;
    handleClose: () => void;
    status: "free" | "pro"; // User status determines available options
}

const TTSModal: React.FC<InputModalProps> = ({ open, handleClose, status }) => {
    const [prompt, setPrompt] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [voice, setVoice] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const generateText = useCallback(async () => {
        
        console.log("text: ", prompt)
        setIsLoading(true);
        try {
            const response = await axios.post('/api/speech/generateText', { prompt });
            setText(response.data.data.data)
        } catch (err: any) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }, [setIsLoading, setText, prompt])

    const handleSubmit = async () => {
        try {
            console.log("text: ", text)
            // const response = await axios.post('/api/speech/createSpeech', { text });
            // const transcriptions = response.data.transcriptions;
            // const audio_files = response.data.audio_files;

        } catch (err) {
            console.error("Error posting video data:", err);
        }
    };

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
                    Generate speech based on your prompt
                </Typography>
                <TextField
                    fullWidth
                    label="Prompt or Keyword"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    inputProps={{ maxLength: 120 }}
                    helperText={`Generate a text from a topic or prompt.${prompt.length}/120 characters`}
                    margin="normal"
                />
                <Button
                    fullWidth
                    disabled={isLoading}
                    onClick={generateText}
                    variant="contained"
                    style={{ backgroundColor: "#8b5cf6" }}
                    startIcon={<GiStarSwirl size={24} />}
                >
                    Automatic Generated Script
                </Button>
                <Box mt={2}>
                    <TextareaAutosize minRows={5} ref={null} value={text} onChange={(e) => setText(e.target.value)} autoFocus style={{ width: "100%", borderRadius: "5px", backgroundColor: "white", padding: "10px" }} placeholder="Enter your text here in the language you want..." />
                </Box>
                <CustomizedInputBase setVoice={setVoice}/>
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

export default TTSModal;