import { Box, List, ListItem, Accordion, AccordionSummary, Typography,AccordionDetails, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { AccountCircleRounded, ReplyRounded, ExpandMoreRounded } from "@mui/icons-material";
import socket from "../socket";

export const CommentsList = () => {
  const [comments, setComments] = useState([{user: 'ivan', email:'Oleg@jgjg.fjff', time: '2022.225.25'}]);

        useEffect(() => {
          socket.on("comment", (msg) => {
            setComments(prev => [...prev, msg])
          });
        },[]);



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
                    {item.user}
                  </Typography>
                  <Typography style={{ marginLeft: "10px" }}>
                    {item.time}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.text}</Typography>
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