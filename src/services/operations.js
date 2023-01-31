import axios from 'axios';
import { Report } from "notiflix/build/notiflix-report-aio";

// const BASE_URL = process.env.BASE_URL;
// axios.defaults.baseURL = BASE_URL;
// axios.defaults.withCredentials = true;

export const getComments = async () => {
    try {
      const { data } = await axios.get(
        "https://commentsappbackend.onrender.com/api"
      );
       return data.result;
    } catch (err) {
        console.log(err.message);
    }
};

export const getReplys = async () => {
  try {
    const { data } = await axios.get(
      "https://commentsappbackend.onrender.com/api/reply"
    );
    return data.result;
  } catch (err) {
    console.log(err.message);
  }
};

export const getImages = async () => {
  try {
    const { data } = await axios.get(
      "https://commentsappbackend.onrender.com/api/images"
    );
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const sendComments = async (commentToSend) => {
  try {
        await axios.post(
          "https://commentsappbackend.onrender.com/api",
          commentToSend
        );
        Report.success("Success!", "You comment sended successfully.", "Okay");
    } catch (err) {
        Report.failure("Something went wrong", err.message, "Okay");
    }
}

export const sendReply = async (replyToSend) => {
  try {
    await axios.post(
      "https://commentsappbackend.onrender.com/api/reply",
      replyToSend
    );
    Report.success("Success!", "You reply sended successfully.", "Okay");
  } catch (err) {
    Report.failure("Something went wrong", err.message, "Okay");
  }
};

export const uploadFile = async (file, id) => {
  try {
    const formData = new FormData();
    formData.append("file", file, Date.now() + '_' + file.name);
    formData.append("parentId", id);
    const [name, ext] = file.name.split(".");
    if (ext === "txt") {
      await axios.post("https://commentsappbackend.onrender.com/api/upload/file", formData);
    } else {
      await axios.post("https://commentsappbackend.onrender.com/api/upload/image", formData);
    }
    Report.success("File uploaded!", `Name: ${name}`, "Okay");
  } catch (error) {
    console.log(error);
    Report.failure("Something went wrong", error.message, "Okay");
  }
};

