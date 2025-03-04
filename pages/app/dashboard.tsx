import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  IconButton,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { MdAddCircleOutline } from "react-icons/md";
import AppLayout from "@/layouts/app-layout";
import InputModal from "@/components/inputModal";
import TTSModal from "@/components/TTSModal";
import { Button } from '@/components/ui/MovingBorders'

export enum SelectType {
  VIDEO = "video",
  TTS = "speech",
}

const Page = () => {
  const router = useRouter();
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [isTTSModalOpen, setIsTTSModalOpen] = useState(false);
  const [selectType, setSelectType] = useState<SelectType | null>(null);

  const generateList = [
    { title: "Create a new Video", type: SelectType.VIDEO },
    { title: "Create a Text to Speech", type: SelectType.TTS },
  ];

  const handleOpenSelectionModal = (type: SelectType) => {
    if (type === SelectType.VIDEO)
      setIsSelectionModalOpen(true);
    else
      setIsTTSModalOpen(true);
    setSelectType(type);
  };

  const handleCloseSelectionModal = () => setIsSelectionModalOpen(false);

  const handleKeywordSelection = () => {
    handleCloseSelectionModal();
    setIsInputModalOpen(true);
  };

  const handleScriptSelection = () => {
    router.push("/app/input-content");
  };

  return (
    <AppLayout>
      <Typography variant="h4">Ongoing Projects</Typography>
      <br />
      <div className="flex flex-row px-6 gap-4">
        {generateList.map((item) => (
          <Button key={item.title} duration={Math.floor(Math.random() * 10000) + 10000}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#1b2451",
                border: "2px solid #8b5cf6",
                aspectRatio: "1 / 1",
                height: "185px",
                width: "300px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                borderRadius: "2rem"
              }}
              onClick={() => handleOpenSelectionModal(item.type)}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton color="primary" sx={{ mt: 2, fontSize: 48 }}>
                  <MdAddCircleOutline size={48} />
                </IconButton>
                <Typography variant="h6" color="white">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Button>
        ))}

        {/* Selection Modal choose options */}
        <Modal open={isSelectionModalOpen} onClose={handleCloseSelectionModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgb(30 41 59 / var(--tw-border-opacity, 1))",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "2px solid",
              borderColor: "#8b5cf6",
            }}
          >
            <Typography variant="h6" mb={2}>
              Choose Generate Script Option
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                className="px-5 p-3"
                variant="contained"
                onClick={handleKeywordSelection}
              >
                Automatic Generated Script
              </Button>
              <Button
                className="px-5 p-3"
                variant="contained"
                color="secondary"
                onClick={handleScriptSelection}
              >
                Manually Input Script
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Input Modal */}
        {selectType === SelectType.VIDEO ? (
          <InputModal
            open={isInputModalOpen}
            handleClose={() => setIsInputModalOpen(false)}
            status="free"
          />
        ) : (<TTSModal open={isTTSModalOpen} handleClose={() => setIsTTSModalOpen(false)} status="free" />)}
      </div>
    </AppLayout>
  );
};

export default Page;
