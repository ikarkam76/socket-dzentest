import { Box, List, ListItem, Accordion, AccordionSummary, Typography,AccordionDetails, IconButton, Modal } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { getComments, getReplys } from "../../services/operations";
import { useFormik } from "formik";
import { sendReply } from "../../services/operations";
import { commentSchema } from "../../services/validation";
import { Form, FormInput } from "./Form.styled";

import { SocketContext } from "../../socket";
import { AccountCircleRounded, ReplyRounded, ExpandMoreRounded } from "@mui/icons-material";
import { RepliesList } from "../replys/ReplysList";
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

export const CommentsList = () => {
  const socket = useContext(SocketContext);
  const [comments, setComments] = useState([]);
  const [replys, setReplys] = useState([]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [commentId, setCommentId] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  useEffect(() => {
    getComments().then((res) => setComments(res));
    getReplys().then((res) => setReplys(res));
          socket.on("comment", (msg) => {
            setComments(prev => [...prev, msg]);
          });
          socket.on("replys", (msg) => {
            setReplys((prev) => [...prev, msg]);
          });
  });
  
    const formik = useFormik({
      initialValues: {
        user_name: "",
        email: "",
        home_page: '',
        comment: "",
      },
      validationSchema: commentSchema,
      onSubmit: (values, { resetForm }) => {
        const parentId = commentId;
        const time = new Date().toISOString().slice(0, 19).replace("T", " ");
        const replyToSend = { ...values, ...{ time, parentId } };
        socket.emit('replys', replyToSend);
        sendReply(replyToSend);
        handleClose();
        resetForm();
      },
    });

  return (
    <Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        onClose={handleClose}
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            "& .MuiInput-root": { m: 0.5, width: "100%" },
          }}
        >
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
            <CaptchaTest />
          </Form>
        </Box>
      </Modal>

      <List>
        {comments.map((item, i) => {
          const { id, user_name, time, comment } = item;
          return (
            <ListItem key={id}>
              <Accordion
                style={{ width: "100%" }}
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreRounded />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ background: "#90caf9" }}
                >
                  <AccountCircleRounded />
                  <Typography style={{ marginLeft: "10px" }}>
                    {user_name}
                  </Typography>
                  <Typography style={{ marginLeft: "10px" }}>
                    {time
                      .toLocaleString()
                      .slice(0, 19)
                      .replace("T", " ")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{comment}</Typography>
                  <IconButton
                    onClick={() => {
                      handleOpen();
                      setCommentId(id);
                    }}
                  >
                    <ReplyRounded />
                  </IconButton>
                  <RepliesList commentId={item.id} replies={replys} />
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}