
import axios from 'axios';
import { COMMON_URL } from '../Constants/Constants';

export const getData = async (get) => {
    try {
        const response = await axios.get(`${COMMON_URL}${get}`);
        return response.data.data;
    } catch (error) {
        alert(error.message);
    }
};

export const postData = async (endPOST_URL, obj) => {
    try {
        const response = await axios.post(`${COMMON_URL}${endPOST_URL}`, obj);
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};

export const updateData = async (endUPDATE_URL, obj) => {
    try {
        const response = await axios.post(`${COMMON_URL}${endUPDATE_URL}`, obj);
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};

export const deleteData = async (endDELETE_URL, id) => {
    try {
        const response = await axios.get(`${COMMON_URL}${endDELETE_URL}${id}`);
        return response.data;
    } catch (error) {
        alert(error.message);
    }
};


