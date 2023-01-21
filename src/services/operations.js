import axios from 'axios'

const BASE_URL = process.env.BASE_URL;
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export const getComments = async () => {
    try {
        const responce = await axios.get('/api');
        console.log(responce);
        return responce;
    } catch (err) {
        console.log((err.message));
    }
};

export const sendComments = async (commentToSend) => {
    try {
        await axios.post('/api', commentToSend);
        await getComments();
    } catch (err) {
        console.log(err.message);
    }
}