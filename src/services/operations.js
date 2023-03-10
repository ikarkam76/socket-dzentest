import axios from 'axios';
import { Report } from "notiflix/build/notiflix-report-aio";

// const BASE_URL = process.env.BASE_URL;
// axios.defaults.baseURL = BASE_URL;
// axios.defaults.withCredentials = true;

export const getComments = async () => {
  try {
    const { data } = await axios.get('https://comments-backend-mongo.onrender.com/api');
    return data.result;
  } catch (err) {
      console.log(err.message);
  }
};

export const getReplys = async () => {
  try {
    const { data } = await axios.get("https://comments-backend-mongo.onrender.com/api/reply");
    return data.result;
  } catch (err) {
    console.log(err.message);
  }
};

export const getImages = async () => {
  try {
    const { data } = await axios.get(
      "https://comments-backend-mongo.onrender.com/api/images"
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const sendComments = async (commentToSend) => {
  try {
        await axios.post(
          "https://comments-backend-mongo.onrender.com/api",
          commentToSend
        );
    } catch (err) {
        Report.failure("Something went wrong", err.message, "Okay");
    }
}

export const sendReply = async (replyToSend) => {
  try {
    await axios.post(
      "https://comments-backend-mongo.onrender.com/api/reply",
      replyToSend
    );
  } catch (err) {
    Report.failure("Something went wrong", err.message, "Okay");
  }
};

export const uploadFile = async (file, id) => {
  try {
    const [name, ext] = file.name.split(".");
    const formData = new FormData();
    formData.append("file", file, Date.now() + '_' + name);
    formData.append("parentId", id);
    if (ext === "txt") {
      await axios.post("https://comments-backend-mongo.onrender.com/api/file", formData);
    } else {
      await axios.post("https://comments-backend-mongo.onrender.com/api/image", formData);
    }
  } catch (error) {
    console.log(error);
    Report.failure("Something went wrong", error.message, "Okay");
  }
};

