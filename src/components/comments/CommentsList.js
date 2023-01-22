import { Box, List, ListItem, Accordion, AccordionSummary, Typography,AccordionDetails, IconButton, Modal, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { getComments } from "../../services/operations";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { sendReply } from "../../services/operations";
import { commentSchema } from "../../services/validation";
import { Form, Input } from "./Form.styled";

import { SocketContext } from "../../socket";
import { AccountCircleRounded, ReplyRounded, ExpandMoreRounded } from "@mui/icons-material";
import { ReplysList } from "../replys/ReplysList";

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
  const [open, setOpen] = useState(false);
  const [commentId, setCommentId] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getComments().then((res) => setComments(res));
          socket.on("comment", (msg) => {
            setComments(prev => [...prev, msg]);
          });
  });
  
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
        const comment_id = commentId;
        const time = new Date();
        const replyToSend = { ...values, ...{ time, comment_id } };
        socket.emit('replys', replyToSend);
        sendReply(replyToSend);
        handleClose();
        resetForm();
      },
    });


  return (
    <Box>
      <List>
        {comments.map((item, i) => {
          const {id, user_name, time, comment } = item;
          return (
            <ListItem key={id}>
              <Accordion style={{ width: "100%" }}>
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
                    {time.toLocaleString()}
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
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
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
                        <Button variant="contained" type="submit">
                          Send
                        </Button>
                      </Form>
                    </Box>
                  </Modal>
                  <ReplysList commentId={item.id} />
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}