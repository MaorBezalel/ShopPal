import { SERVER_URL } from '@/shared/constants';
import axios from 'axios';

export const getUserOrders = async (userId: string) => {
    const response = await axios.get(`${SERVER_URL}/orders/${userId}`);
    return response.data;
};
