import axios from 'axios';
import { SERVER_URL } from '@/shared/constants';

export const API = axios.create({ baseURL: SERVER_URL, withCredentials: true });

export const API_PRIVATE = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
