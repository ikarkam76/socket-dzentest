import axios from 'axios'

const BASE_URL = process.env.BASE_URL;
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export const getComments = async () => {
    try {
        const { data } = await axios.get('/api');
       return data.result;
    } catch (err) {
        console.log((err.message));
    }
};

export const sendComments = async (commentToSend) => {
    try {
        await axios.post('/api', commentToSend);
        console.log('comment sended!');
    } catch (err) {
        console.log(err.message);
    }
}

export const getReplys = async () => {
  try {
    const { data } = await axios.get("/api/reply");
    return data.result;
  } catch (err) {
    console.log(err.message);
  }
};

export const sendReply = async (commentToSend) => {
  try {
    await axios.post("/api/reply", commentToSend);
    console.log("reply sended!");
  } catch (err) {
    console.log(err.message);
  }
};