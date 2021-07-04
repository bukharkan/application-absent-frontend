import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/user/';

class UserService {
    update(data) {
        return axios.post(API_URL + "update", data, { headers: authHeader() });
    }
    getProfilebyId(data) {
        return axios.post(API_URL + "profile/", data, { headers: authHeader() });
    }
}

export default new UserService();