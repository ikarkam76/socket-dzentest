import axios from 'axios';
import { Report } from "notiflix/build/notiflix-report-aio";

const BASE_URL = process.env.BASE_URL;
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export const getComments = async () => {
    try {
        const { data } = await axios.get('/api');
       return data.result;
    } catch (err) {
        console.log(err.message);
    }
};

export const sendComments = async (commentToSend) => {
  try {
        await axios.post('/api', commentToSend);
        Report.success("Success!", "You comment sended successfully.", "Okay");
    } catch (err) {
        Report.failure("Something went wrong", err.message, "Okay");
    }
}

export const sendReply = async (replyToSend) => {
  try {
    await axios.post("/api/reply", replyToSend);
    Report.success("Success!", "You reply sended successfully.", "Okay");
  } catch (err) {
    Report.failure("Something went wrong", err.message, "Okay");
  }
};

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

export const uploadFile = async (file, id) => {
  try {
    console.log('oper', file, id);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", id);
    const [name, ext] = file.name.split(".");
    if (ext === "txt") {
      await axios.post("/api/upload/file", formData);
    } else {
      await axios.post("/api/upload/image", formData);
    }
  } catch (error) {
    console.log(error);
    Report.failure("Something went wrong", error.message, "Okay");
  }
}