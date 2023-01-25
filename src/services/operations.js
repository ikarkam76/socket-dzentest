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

export const getList = async () => {
  try {
    const {data} = await axios.get("/api/list");
    return data;
  } catch (error) {
    console.log(error.message);
  }
}


export const getFiles = async (name) => {
  try {
    const response = await axios.post("/api/get/files", name, {
      responseType: "blob",
    });
    const imgUrl = URL.createObjectURL(response.data);
    return imgUrl;
  } catch (error) {
    console.log(error.message);
  }
}

export const sendReply = async (replyToSend) => {
  try {
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
      const { data } = await axios.post("/api/upload/file", formData);
      await axios.post("/api/files", { file: data.file, parentId: id });
    } else {
      const { data } = await axios.post("/api/upload/image", formData);
      await axios.post("/api/images", { image: data.image, parentId: id });
    }
  } catch (error) {
    console.log(error.message);
  }

    
}