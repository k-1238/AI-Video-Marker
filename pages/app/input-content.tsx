// import React from "react";
// import { Box, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
// import update from 'immutability-helper';
// import type { Identifier } from 'dnd-core'
// import { DndProvider, useDrag, useDrop, XYCoord } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import AppLayout from "@/layouts/app-layout";

// export interface Item {
//   id: number
//   text: string
// }

// const Page = () => {
//   const [items, setItems] = React.useState([
//     {
//       id: 1,
//       text: 'Write a cool JS library',
//     },
//     {
//       id: 2,
//       text: 'Make it generic enough',
//     },
//     {
//       id: 3,
//       text: 'Write README',
//     },
//     {
//       id: 4,
//       text: 'Create some examples',
//     },
//     {
//       id: 5,
//       text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
//     },
//     {
//       id: 6,
//       text: '???',
//     },
//     {
//       id: 7,
//       text: 'PROFIT',
//     },
//   ])
//   const moveItem = React.useCallback((dragIndex: number, hoverIndex: number) => {
//     setItems((prevCards: Item[]) =>
//       update(prevCards, {
//         $splice: [
//           [dragIndex, 1],
//           [hoverIndex, 0, prevCards[dragIndex] as Item],
//         ],
//       }),
//     );
//   }, []);
//   return (
//     <div>
//       <DndProvider backend={HTML5Backend}>
//         <AppLayout visibleDrawer={false}>
//           <Box sx={{ maxWidth: 500, margin: "auto", marginTop: 5 }}>
//             <Paper sx={{ padding: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Draggable List with Material UI and React DnD
//               </Typography>
//               <List>
//                 {items.map((item, index) => (
//                   <DraggableListItem key={index} id={item.id} index={index} item={item} moveItem={moveItem} />
//                 ))}
//               </List>
//             </Paper>
//           </Box>
//         </AppLayout>
//       </DndProvider>
//     </div>
//   )
// }

// const DraggableListItem = ({ id, item, index, moveItem }: { id: number, item: Item, index: number, moveItem: (fromIndex: number, toIndex: number) => void }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [{ handlerId }, drop] = useDrop<{ index: number; id: string; type: string }, void, { handlerId: Identifier | null }>({
//     accept: 'LIST_ITEM',
//     collect(monitor) {
//       return {
//         handlerId: monitor.getHandlerId(),
//       }
//     },
//     hover: (draggedItem: { index: number; id: string; type: string }, monitor) => {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = draggedItem.index;
//       const hoverIndex = index;
//       if (dragIndex === hoverIndex) {
//         return;
//       }
//       const hoverBoundingRect = ref.current?.getBoundingClientRect();
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }
//       moveItem(dragIndex, hoverIndex);
//       draggedItem.index = hoverIndex;
//     },
//   });
//   const [{ isDragging }, drag] = useDrag({
//     type: 'LIST_ITEM',
//     item: () => ({ id, index }),
//     collect: (monitor: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
//       isDragging: monitor.isDragging(),
//     }),
//   });
//   drag(drop(ref));
//   return (
//     <div ref={ref} data-handler-id={handlerId}>
//       <ListItem
//         style={{
//           opacity: isDragging ? 0.5 : 1,
//           cursor: "move",
//           backgroundColor: isDragging ? "#f4f4f4" : "white",
//         }}
//       >
//         <ListItemText primary={item.text} />
//       </ListItem>
//     </div>
//   );
// };

// export default Page;

import React from "react";
import { Box, Paper, Typography, TextareaAutosize, Button } from "@mui/material";
import AppLayout from "@/layouts/app-layout";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter } from "next/router";

// Define the structure for the textareas state
export interface TextareaItem {
  id: number;
  text: string;
}

const MIN_LENGTH = 120;

const Page = () => {
  const [textareas, setTextareas] = React.useState<TextareaItem[]>([]);
  const router = useRouter();

  const handleTextChange = (id: number, value: string) => {
    setTextareas((prev) =>
      prev.map((textarea) =>
        textarea.id === id ? { ...textarea, text: value } : textarea
      )
    );
  };

  const swapItems = (index1: number, index2: number) => {
    setTextareas((prevTextareas) => {
      const updatedTextareas = [...prevTextareas];
      [updatedTextareas[index1], updatedTextareas[index2]] = [
        updatedTextareas[index2],
        updatedTextareas[index1],
      ];
      return updatedTextareas;
    });
  };

  const handleSubmit = () => {
    const query = textareas.map((textarea) => textarea.text);
    router.push({
      pathname: "/app/choose-template",
      query: { textareas: JSON.stringify(query) },
    });
  };

   // Check if all textareas meet the minimum length requirement
   const isFormValid = textareas.every((textarea) => textarea.text.length >= MIN_LENGTH);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <AppLayout visibleDrawer={false}>
          <Box sx={{ maxWidth: 500, margin: "auto", marginTop: 5 }}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ marginBottom: 4 }}>
                Input Script Scenes
              </Typography>
              {textareas.map((textarea, index) => (
                <DraggableTextarea
                  key={textarea.id}
                  index={index}
                  id={textarea.id}
                  item={textarea}
                  swapItems={swapItems}
                  handleTextChange={handleTextChange}
                />
              ))}
              <Button
                variant="contained"
                sx={{ marginTop: 2 }}
                onClick={() =>
                  setTextareas((prev) => [
                    ...prev,
                    { id: prev.length + 1, text: "" },
                  ])
                }
              >
                Add New Scene
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: 2, marginLeft: 2 }}
                onClick={handleSubmit}
                disabled={!isFormValid} // Disable button if any textarea is invalid
              >
                Submit
              </Button>
            </Paper>
          </Box>
        </AppLayout>
      </div>
    </DndProvider>
  );
};

const DraggableTextarea = ({
  id,
  index,
  item,
  swapItems,
  handleTextChange,
}: {
  id: number;
  index: number;
  item: TextareaItem;
  swapItems: (index1: number, index2: number) => void;
  handleTextChange: (id: number, value: string) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState(false);

  const [, drop] = useDrop({
    accept: "TEXTAREA",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        swapItems(draggedItem.index, index);
        draggedItem.index = index; // Update dragged index
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TEXTAREA",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

   // Handle text change and validate length
   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    handleTextChange(id, newValue);
    setError(newValue.length < MIN_LENGTH);
  };

  return (
    <Button
      ref={ref}
      variant="outlined"
      sx={{
        display: "block",
        width: "100%",
        marginBottom: 2,
        padding: 2,
        textAlign: "left",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <textarea
        rows={3}
        maxLength={150}
        placeholder="Enter at least 120 characters..."
        value={item.text}
        onChange={handleChange}
        style={{
          color: "black",
          backgroundColor: "white",
          width: "100%",
          padding: "8px",
          border: error ? "1px solid red" : "1px solid #ccc",
          resize: "none",
          overflow: "hidden",
        }}
      />
      {error && (
        <Typography variant="caption" color="error">
          Minimum length required: 120 characters
        </Typography>
      )}
    </Button>
  );
};

export default Page;






