import{ useEffect, useState } from 'react';
import axios from 'axios';
import { COMMON_URL } from '../Constants/Constants';
const useEmployeeData = () => {
    const [employeeList, setEmployeeList]= useState([])
    const [dataKeys, setDataKeys]= useState([])
    
    useEffect(()=>{
        getEmpData();
    },[])

    const getEmpData =async()=>{
        const response = await axios.get(`${COMMON_URL}GetAllEmployee`)
        setEmployeeList (response.data.data)
        setDataKeys(Object.keys(response.data.data[0]))
    }
    return {employeeList,getEmpData,dataKeys}
    
};

export default useEmployeeData;