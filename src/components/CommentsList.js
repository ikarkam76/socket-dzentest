import { Box, List, ListItem, Accordion, AccordionSummary, Typography,AccordionDetails, IconButton } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../socket";
import { AccountCircleRounded, ReplyRounded, ExpandMoreRounded } from "@mui/icons-material";

export const CommentsList = () => {
  const socket = useContext(SocketContext);
  const [comments, setComments] = useState([]);

        useEffect(() => {
          socket.on("comment", (msg) => {
            setComments(prev => [...prev, msg])
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
                </AccordionDetails>
              </Accordion>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}