// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   Grid2 as Grid,
//   IconButton,
//   Typography,
// } from "@mui/material";
// import AppLayout from "@/layouts/app-layout";
// import {
//   MdAddCircleOutline,
// } from "react-icons/md";
// import InputModal from "@/components/inputModal";


// const Page = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   const handleOpenModal = () => setIsModalOpen(true);
//   const handleCloseModal = () => setIsModalOpen(false);

//   return (
//     <div>
//       <AppLayout>
//         <Typography variant="h4">Add New Video</Typography>
//         <br />
//         <Grid
//           container
//           spacing={{
//             xs: 2,
//             md: 3,
//           }}
//           columns={{
//             xs: 2,
//             sm: 8,
//             md: 12,
//           }}
//         >
//           <Grid
//             size={{
//               xs: 2,
//               sm: 4,
//               md: 4,
//             }}
//           >
//             <Card
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: "80%",
//                 height: "auto", 
//                 aspectRatio: "1 / 1", 
//                 padding: "10px",
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
//               }}
//             >
//               <CardContent>
//                 <IconButton 
//                   color="primary" 
//                   sx={{ mt: 2, fontSize: 48 }}
//                   onClick={handleOpenModal}
//                 >
//                     <MdAddCircleOutline size={48} />
//                 </IconButton>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//         <InputModal open={isModalOpen} handleClose={handleCloseModal} status="free" />
//       </AppLayout>
//     </div>
//   )
// }

// export default Page;

import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Modal,
  Box,
  Button,
} from "@mui/material";
import { MdAddCircleOutline, MdSearch, MdEdit } from "react-icons/md";
import AppLayout from "@/layouts/app-layout";
import InputModal from "@/components/inputModal";

const Page = () => {
  const router = useRouter();
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);

  const handleOpenSelectionModal = () => setIsSelectionModalOpen(true);
  const handleCloseSelectionModal = () => setIsSelectionModalOpen(false);

  const handleKeywordSelection = () => {
    handleCloseSelectionModal();
    setIsInputModalOpen(true);
  };

  const handleScriptSelection = () => {
    handleCloseSelectionModal();
    router.push("/app/input-content");
  };

  return (
    <AppLayout>
      <Typography variant="h4">Add New Video</Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
              aspectRatio: "1 / 1",
              padding: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
            onClick={handleOpenSelectionModal}
          >
            <CardContent>
              <IconButton color="primary" sx={{ mt: 2, fontSize: 48 }}>
                <MdAddCircleOutline size={48} />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Selection Modal choose options */} 
      <Modal open={isSelectionModalOpen} onClose={handleCloseSelectionModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            Choose Generate Script Option
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<MdSearch size={24} />}
              onClick={handleKeywordSelection}
            >
              Automatic Generated Script
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<MdEdit size={24} />}
              onClick={handleScriptSelection}
            >
              Manually Input Script
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Input Modal */}
      <InputModal open={isInputModalOpen} handleClose={() => setIsInputModalOpen(false)} status="free" />
    </AppLayout>
  );
};

export default Page;

