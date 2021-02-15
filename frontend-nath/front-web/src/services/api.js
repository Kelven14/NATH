import axios from 'axios';


const api = axios.create({
    baseURL:'http://localhost:8080/',
    headers: {
        Authorization: localStorage.getItem( '&app-token'),
      }
});
export default api;
 
    