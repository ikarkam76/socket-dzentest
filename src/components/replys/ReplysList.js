import { Box, Stack,Paper } from '@mui/material';
import {  useEffect, useContext } from 'react';
import { styled } from "@mui/material/styles";
import { SocketContext } from '../../socket';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

export const RepliesList = ({ commentId, replies }) => {
  const socket = useContext(SocketContext);
  const repliesList = replies.filter((item) => item.parentId === commentId);

    useEffect(() => {
        
      
    }, [socket]);

    return (
      <Box sx={{ width: "100%" }}>
        <Stack>
          {repliesList[0] && (
            repliesList.map((item, i) => {
              return (
                <Item key={i}>
                  <Box sx={{ width: "100%", backgroundColor: "#90caf9" }}>
                    {item.user_name}{" "}
                    {item.time.toLocaleString().slice(0, 19).replace("T", " ")}
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