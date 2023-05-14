import axios from 'axios';
import config from '../config';
import { getTokenUserLocal } from 'helpers/localStorage';
class ServiceDriverAnUsers {
    async create(data) {
        return await axios.post(`${config.baseUrl}/user/driver`, data, { headers: { Authorization: `Bearer ${getTokenUserLocal()}` } });
    }

    async getAll() {
        return await axios.get(`${config.baseUrl}/users`, { headers: { Authorization: `Bearer ${getTokenUserLocal()}` } });
    }

    async getById(id) {
        return await axios.get(`${config.baseUrl}/user/${id}`, {
            headers: { Authorization: `Bearer ${getTokenUserLocal()}` }
        });
    }

    async deleteById(id) {
        return await axios.delete(`${config.baseUrl}/user/${id}`, {
            headers: { Authorization: `Bearer ${getTokenUserLocal()}` }
        });
    }
}
export const userService = new ServiceDriverAnUsers();
