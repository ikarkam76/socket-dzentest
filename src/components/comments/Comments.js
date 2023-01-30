import { useState, useContext } from "react";
import { useFormik } from "formik";
import { commentSchema } from "../../services/validation";
import { SocketContext } from "../../socket";
import { CommentsList } from "./CommentsList";
import { Box, Button, Modal } from "@mui/material";
import { CommentRounded } from "@mui/icons-material";
import { sendComments, uploadFile } from "../../services/operations";
import { FileInput, Form, FormInput } from "./Form.styled";
import CaptchaTest from "./CaptchaTest";

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
  const [file, setFile] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      user_name: "",
      email: "",
      home_page: "",
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: (values, { resetForm }) => {
      const time = new Date().toISOString().slice(0, 19).replace("T", " ");
      const id = Date.now() + values.user_name;
      const commentToSend = { ...values, ...{ time, id } };
      socket.emit("comments", commentToSend);
      sendComments(commentToSend);
      if (file) {
        uploadFile(file, id);
      }
      handleClose();
      resetForm();
    },
  });

    return (
      <>
        <CommentsList />
        <Button
          variant="contained"
          onClick={() => {
            handleOpen();
          }}
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
              <FormInput
                id="user_name"
                required
                label={"User name"}
                variant="standard"
                type="user_name"
                onChange={formik.handleChange}
                value={formik.values.user_name}
              />
              <FormInput
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
              <FormInput
                id="home_page"
                label={"Home page"}
                variant="standard"
                type="home_page"
                onChange={formik.handleChange}
                value={formik.values.home_page}
              />
              <FormInput
                id="comment"
                required
                label={"Comment"}
                variant="standard"
                type="comment"
                onChange={formik.handleChange}
                value={formik.values.comment}
              />
              <FileInput
                type="file"
                name="file"
                accept=".txt, image/png, image/jpeg, image/gif"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <CaptchaTest />
            </Form>
          </Box>
        </Modal>
      </>
    );
}