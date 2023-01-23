import { Box, Stack,Paper } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { getReplys } from '../../services/operations';
import { styled } from "@mui/material/styles";
import { SocketContext } from '../../socket';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

export const ReplysList = ({ commentId }) => {
  const socket = useContext(SocketContext);
  const [replys, setReplys] = useState([]);
  const replysList = replys.filter((item) => item.parentId === commentId);

    useEffect(() => {
        getReplys()
          .then((res) => setReplys(res));
      socket.on('replys', (msg) => {
        setReplys(prev => [...prev, msg])
      })
    }, [socket]);

    return (
      <Box sx={{ width: "100%" }}>
        <Stack>
          {!replysList[0] ? (
            <Item>No replys</Item>
          ) : (
            replysList.map((item, i) => {
              return (
                <Item key={i}>
                  <Box sx={{ width: "100%", backgroundColor: "#90caf9" }}>
                    {item.user_name} {item.time}
                  </Box>
                  {item.comment}
                </Item>
              );
            })
          )}
        </Stack>
      </Box>
    );
}