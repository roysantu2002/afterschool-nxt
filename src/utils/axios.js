import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-19b73.firebaseio.com/'
});

export default instance;