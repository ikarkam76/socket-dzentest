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

export const sendReply = async (replyToSend) => {
  try {
    console.log(replyToSend);
    await axios.post("/api/reply", replyToSend);
    console.log("reply sended!");
  } catch (err) {
    console.log(err.message);
  }
};

export const uploadFile = async (file, id) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const [name, ext] = file.name.split(".");
    if (ext === "txt") {
      const responce = await axios.post("/api/upload/file", formData);
      console.log(responce);
      await axios.post("/api/files", { file: responce, parentId: id });
    } else {
      const { data } = await axios.post("/api/upload/image", formData);
      console.log(data.image);
      await axios.post("/api/images", { image: 'gol',  parentId: id });
    }
  } catch (error) {
    console.log(error.message);
  }

    
}