import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/employees';

class EmployeesService {
    getAll() {
        return axios.get(API_URL + "/", { headers: authHeader() });
    }
    getAllByStatus(id) {
        return axios.get(API_URL + "/bystatus/" + id, { headers: authHeader() });
    }
    getTodayById(id) {
        return axios.get(API_URL + "/getTodayById/" + id, { headers: authHeader() });
    }
    updateStatus(data) {
        return axios.post(API_URL + "/update", data, { headers: authHeader() });
    }
    getLogs(id) {
        return axios.get(API_URL + "/getLogs/" + id, { headers: authHeader() });
    }
}

export default new EmployeesService();