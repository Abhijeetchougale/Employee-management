import{ useEffect, useState } from 'react';
import axios from 'axios';
import { COMMON_URL } from '../Constants/Constants';
const useEmployeeData = () => {
    const [employeeList, setEmployeeList]= useState([])
    
    useEffect(()=>{
        getEmpData();
    },[])

    const getEmpData =async()=>{
        const response = await axios.get(`${COMMON_URL}GetAllEmployee`)
        setEmployeeList (response.data.data)
    }
    return {employeeList,getEmpData}
    
};

export default useEmployeeData;