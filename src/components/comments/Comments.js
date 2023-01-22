import { useState, useContext } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { commentSchema } from "../../services/validation";
import { SocketContext } from "../../socket";
import { CommentsList } from "./CommentsList";
import { Box, Button, Modal, IconButton} from "@mui/material";
import { CheckRounded, CodeRounded, CommentRounded } from "@mui/icons-material";
import { sendComments } from "../../services/operations";
import { Form, Input } from "./Form.styled";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  textAlign: "end",
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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      user_name: "",
      email: "",
      home_page: '',
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: (values, { resetForm }) => {
      const time = new Date();
      const commentToSend = { ...values, ...{ time } };
      socket.emit("comments", commentToSend);
      sendComments(commentToSend);
      handleClose();
      resetForm();
    },
  });

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
            <Form onSubmit={formik.handleSubmit}>
              <Input
                id="user_name"
                required
                label={"User name"}
                variant="standard"
                type="user_name"
                onChange={formik.handleChange}
                value={formik.values.user_name}
              />
              <Input
                id="email"
                label={"Email"}
                variant="standard"
                type="email"
                onChange={formik.handleChange}
                placeholder="example@gmail.com"
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
                helperText={
                  formik.touched.email &&
                  formik.errors.email &&
                  formik.errors.email
                }
              />
              <Input
                id="home_page"
                label={"Home page"}
                variant="standard"
                type="home_page"
                onChange={formik.handleChange}
                value={formik.values.home_page}
              />
              <Input
                id="comment"
                required
                label={"Comment"}
                variant="standard"
                type="comment"
                onChange={formik.handleChange}
                value={formik.values.comment}
              />
              <IconButton aria-label="html">
                <CodeRounded fontSize="small" />
              </IconButton>
              <IconButton aria-label="check">
                <CheckRounded fontSize="small" />
              </IconButton>
              <Button variant="contained" type="submit">
                Send
              </Button>
            </Form>
          </Box>
        </Modal>
      </>
    );
}