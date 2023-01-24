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

export const getFiles = async () => {
  return axios
    .get("/api/files", { responseType: "blob" })
    .then((response) => {
      let imageNode = document.getElementById("image");
      let imgUrl = URL.createObjectURL(response.data);
      imageNode.src = imgUrl;
    })
    .catch((error) => {
      alert(
        "something goes wrong! Maybe image url broken, try another img url."
      );
    });
  // try {
  //   const response = await axios.get("/api/files", {
  //     responseType: "arraybuffer",
  //   });
  //   const buffer64 = Buffer.from(response.data, "binary").toString("base64");
  //   return buffer64;
  // } catch (error) {
    
  // }
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