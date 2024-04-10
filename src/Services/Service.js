// import React from 'react'
import axios from 'axios'
import { COMMON_URL } from '../Constants/Constants'

export const getData=async(get)=>{
    const response = await axios.get(`${COMMON_URL}${get}`)
    return response.data.data
}

export const getEmpData =async()=>{
    const response = await axios.get(`${COMMON_URL}GetAllEmployee`)
    return response.data.data
}

export const postData =async(endPOST_URL,obj)=>{
    const response = await axios.post(`${COMMON_URL}${endPOST_URL}`,obj)
    return response.data
   
}

export const updateData =async(endUPDATE_URL,obj)=>{
    const response = await axios.post(`${COMMON_URL}${endUPDATE_URL}`,obj)
    return response.data
   
}

export const deleteData =async(endDELETE_URL,id)=>{
    const response = await axios.get(`${COMMON_URL}${endDELETE_URL}${id}`)
    return response.data
   
}

// export const resetData