import { Box, Stack,Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { getReplys } from '../services/operations';
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));

export const ReplysList = ({commentId}) => {
    const [replys, setReplys] = useState([]);

    useEffect(() => {
        getReplys()
          .then((res) => res.filter((item) => item.comment_id === commentId))
          .then((res) => setReplys(res));
    }, [commentId]);

    return (
      <Box sx={{ width: "100%" }}>
        <Stack>
                {!replys[0] ?  <Item>No replys</Item> : replys.map((item, i) => {
                    return (
                      <Item key={item.id}>
                        <Box
                          sx={{ width: "100%", backgroundColor: "#90caf9" }}
                            >
                                {item.user_name}  {item.time}
                            </Box>
                            {item.comment}
                      </Item>
                    );
          })}
        </Stack>
      </Box>
    );
}