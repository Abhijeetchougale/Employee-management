import React, { useEffect, useState } from 'react';
import { getData, postData, updateData, deleteData } from '../Services/Service';
import useEmployeeData from '../Utility/useEmployeeData';
import {rowColors} from '../Constants/Constants'
import useInputChange from '../Utility/useInputChange';
// import { obj } from '../Services/CommonObjects';

const Attendence = () => {

    const [attendenceList, setAttendenceList] = useState([]);

    const {employeeList}=useEmployeeData()
    // const state =useInputChange(obj)
    const { obj, inputChange, reset, setObj } = useInputChange({
        "attendanceId": 0,
        "employeeId": 0,
        "attendanceDate":"",
        "inTime":"",
        "outTime":"",   
        "isFullDay":true
    })


    // const [attendenceObj, setAttendenceObj] = useState(
    //     {
    //         "attendanceId": 0,
    //         "employeeId": 0,
    //         "attendanceDate":"",
    //         "inTime":"",
    //         "outTime":"",
    //         "isFullDay":true
    //     }
    // )

    const getURL_END='GetAllAttendance';
    const endPOST_URL ='AddAttendance';
    const endUPDATE_URL ='UpdateAttendance';
    const endDELETE_URL ='DeleteAttendanceById?attendanceid=';


    // const onAttendenceInputChange = (event) => {
    //         const {name, value, checked}= event.target
    //         if(name === "isFullDay"){
    //             setObj((prevAtte)=>({...prevAtte, [name]:checked}))
    //         }else{
    //             setObj((prevAtte)=>({...prevAtte, [name]:value}))
    //         }
            
    // }

    useEffect(() => {
        getAttendence();
    }, [])

    

    const getAttendence =() => {
        try {
            getData(getURL_END).then((result)=>{
                setAttendenceList(result)
               })     
        } catch (error) {
            alert(error.message)
        }
        
    }


    const createAttendence =() =>{
        postData(endPOST_URL,obj).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getAttendence();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })       
    }

    const updateAttendence =() => {
        updateData(endUPDATE_URL,obj).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getAttendence();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })
    }

    const onEditAttendence=(attendance)=>{
        setObj(attendance)
    }


    const ondeleteAttendence = (advId) => {
        deleteData(endDELETE_URL,advId).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getAttendence();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })
    }

    // const reset = () => {
    //     setObj(
    //         {
    //             "advanceId": 0,
    //             "employeeId": 0,
    //             "advanceDate": "",
    //             "advanceAmount": 0,
    //             "reason": ""
    //         }
    //     )
    // }
    return (
        <>
            <div className='container-fluid mx-auto px-4 w-[100%]'>
                <div className='row mt-3'>
                    <div className='col-md-8 '>
                        <div className='card'>
                            <div className='rounded py-3  text-2xl font-bold bg-sky-400'>
                                Employee List
                            </div>
                            <div className='card-body'>
                                <table className="w-[100%] table-auto rouded border border-slate-400">
                                    <thead>
                                        <tr>
                                            <th className="border border-slate-300 ...">Sr.No</th>
                                            <th className="border border-slate-300 ...">Name</th>
                                            <th className="border border-slate-300 ...">Contact No</th>
                                            <th className="border border-slate-300 ...">inTime</th>                                        
                                            <th className="border border-slate-300 ...">outTime</th>
                                            <th className="border border-slate-300 ...">isFullDay</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendenceList.map((attendence, index) => (
                                            <tr key={attendence.attendanceId} className={`${rowColors[index % rowColors.length]} `}>
                                                <td className='border border-slate-300'>{index + 1}</td>
                                                <td className='border border-slate-300'>{attendence.empName}</td>
                                                <td className='border border-slate-300'>{attendence.empContactNo}</td>
                                                <td className='border border-slate-300'>{attendence.inTime}</td>
                                                <td className='border border-slate-300'>{attendence.outTime}</td>
                                                <td className='border border-slate-300'>{attendence.isFullDay?"present":"absent"}</td>
                                                <td className='border border-slate-300'>
                                                    <button className='btn btn-sm btn-success m-2' onClick={() => onEditAttendence(attendence)}>Edit</button>
                                                    <button className='btn btn-sm btn-danger m-2' onClick={() => ondeleteAttendence(attendence.attendanceId)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='card-header bg-pink'>
                                Employee
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Employee Id</label>
                                        <select name="employeeId" id="" value={obj.employeeId} onChange={inputChange}  className='form-select'>
                                           {
                                            employeeList.map((employee)=>{
                                                return(
                                                    <option value={employee.empId}>{employee.empName}</option>
                                                )
                                            })
                                           }
                                        </select>
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Date</label>
                                        <input type="date" value={obj.attendanceDate} onChange={inputChange} name='attendanceDate' className='form-control' placeholder='Enter Contact Number' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>In Time</label>
                                        <input type="time" value={obj.inTime} onChange={inputChange} name='inTime' className='form-control' placeholder='Enter outTime.' />
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Out Time</label>
                                        <input type="time" value={obj.outTime} onChange={inputChange} name="outTime" className='form-control' placeholder='Enter Email' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Is Present</label>
                                        <input type="checkbox" value={obj.isFullDay} onChange={inputChange} name="isFullDay" className='form-check-input' />
                                    </div>

                                </div>

                            </div>
                            <div className='card-footer'>
                                <div className='text-center'>
                                    {obj.attendanceId === 0 ?
                                        <button className='btn btn-sm btn-primary m-2' onClick={createAttendence}>Add</button> 
                                        :
                                        <button className='btn btn-sm btn-warning m-2' onClick={updateAttendence}>Update</button>
                                    }


                                    <button className='btn btn-sm btn-danger ' onClick={reset}>Reset</button> 
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Attendence;



