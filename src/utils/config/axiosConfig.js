import axios from 'axios';

const Axios = axios.create({
    baseURL: 'https://react-19b73.firebaseio.com/'
});

export default Axios;