import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { SocketContext } from "../socket";
import { CommentsList } from "./CommentsList";
import { Box, Input, Button, Modal, IconButton} from "@mui/material";
import { CheckRounded, CodeRounded, CommentRounded, SendRounded } from "@mui/icons-material";
import { sendComments } from "../services/operations";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  textAlign: 'end',
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Comments = () => {
  const socket = useContext(SocketContext);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const handleSendComment = (e) => {
      e.preventDefault();
      const time = new Date().toLocaleString();
      const id = uuidv4();
      const commentToSend = { ...comment, ...{ id, time }};
      socket.emit("comment", commentToSend);
      sendComments(commentToSend);
      setComment("");
      handleClose();
    };

    const onChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
        case "user":
          setComment((prev) => {
            return { ...prev, ...{ user_name: value } };
          });
          break;
        case "email":
          setComment((prev) => {
            return { ...prev, ...{ email: value } };
          });
          break;
        case "home":
          setComment((prev) => {
            return { ...prev, ...{ home_page: value } };
          });
          break;
        case "text":
          setComment((prev) => {
            return { ...prev, ...{ comment: value } };
          });
          break;
        default:
          console.log("it`s not each field");
      }
    };

    return (
      <>
        <CommentsList />
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{
            position: "fixed",
            bottom: "5%",
            right: "5%",
          }}
        >
          <CommentRounded fontSize="large" />
        </Button>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          onClose={handleClose}
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, "& .MuiInput-root": { m: 0.5, width: "100%" } }}>
            <Input
              id="standard-basic"
              placeholder="User name"
              variant="standard"
              name="user"
              size="small"
              type="text"
              onChange={onChange}
            />
            <Input
              id="standard-basic"
              placeholder="E-mail"
              type="email"
              variant="standard"
              size="small"
              name="email"
              onChange={onChange}
            />
            <Input
              id="standard-basic"
              placeholder="Home page"
              variant="standard"
              size="small"
              name="home"
              onChange={onChange}
            />
            <Input
              id="outlined-multiline-static"
              placeholder="Comment"
              multiline
              rows={4}
              name="text"
              onChange={onChange}
            />
            <IconButton aria-label="html">
              <CodeRounded fontSize="small" />
            </IconButton>
            <IconButton aria-label="check">
              <CheckRounded fontSize="small" />
            </IconButton>
            <IconButton aria-label="check" onClick={handleSendComment}>
              <SendRounded color="primary" fontSize="large" />
            </IconButton>
          </Box>
        </Modal>
      </>
    );
}