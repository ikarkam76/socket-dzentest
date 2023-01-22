import { Box, List, ListItem, Accordion, AccordionSummary, Typography,AccordionDetails, IconButton } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { getComments } from "../services/operations";
import { SocketContext } from "../socket";
import { AccountCircleRounded, ReplyRounded, ExpandMoreRounded } from "@mui/icons-material";
import { ReplysList } from "./ReplysList";

export const CommentsList = () => {
  const socket = useContext(SocketContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments().then((res) => setComments(res));
          socket.on("comment", (msg) => {
            setComments(prev => [...prev, msg]);
          });
        },[socket]);

  return (
    <Box>
      <List>
        {comments.map((item, i) => {
          return (
            <ListItem key={i}>
              <Accordion style={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreRounded />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ background: "#90caf9" }}
                >
                  <AccountCircleRounded />
                  <Typography style={{ marginLeft: "10px" }}>
                    {item.user_name}
                  </Typography>
                  <Typography style={{ marginLeft: "10px" }}>
                    {item.time}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.comment}</Typography>
                  <IconButton>
                    <ReplyRounded />
                  </IconButton>
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