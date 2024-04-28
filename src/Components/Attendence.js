import React, { useEffect, useState } from 'react';
import { getData, postData, updateData, deleteData } from '../Services/Service';
import useEmployeeData from '../Utility/useEmployeeData';
import useInputChange from '../Utility/useInputChange';
import EmpTabel from '../Components/EmpTabel'

const Attendence = () => {

    const [attendenceList, setAttendenceList] = useState([]);
    const { employeeList } = useEmployeeData()

    const header=['empName','attendanceDate','inTime','outTime','isFullDay']
    const { obj, inputChange, reset, setObj } = useInputChange({
        "attendanceId": 0,
        "employeeId": 0,
        "attendanceDate": "",
        "inTime": "",
        "outTime": "",
        "isFullDay": true
    })

    const getURL_END = 'GetAllAttendance';
    const endPOST_URL = 'AddAttendance';
    const endUPDATE_URL = 'UpdateAttendance';
    const endDELETE_URL = 'DeleteAttendanceById?attendanceid=';



    useEffect(() => {
        getAttendence();
    },[])

    const handleApiError =(error)=>{
        console.error('API Error:', error);
        alert("An error occured. Please try again.")
    };

    const handleApiResult=(result)=>{
            if(result.result) if (result.result) {
                alert(result.message);
                getAttendence();
                reset();
            } else {
                alert(result.message);
            }
    }


//**************************GET DATA***********************/
    const getAttendence = () => {
        getData(getURL_END)
        .then((result) => setAttendenceList(result))
        .catch(handleApiError);

    }

//***************************CREATE DATA********************/

    const createAttendence = () => {
        postData(endPOST_URL, obj)
        .then(handleApiResult)
        .catch(handleApiError);
    }
//*************************UPDATE DATA*********************************/

    const updateAttendence = () => {
        updateData(endUPDATE_URL, obj)
           .then(handleApiResult)
           .catch(handleApiError)
    }
//**************************EDIT DATA********************************* */

    const onEditAttendence = (attendance) => {
        setObj(attendance)
    }

//**************************DELETE DATA********************************* */

    const ondeleteAttendence = (advId) => {
        deleteData(endDELETE_URL, advId)
            .then(handleApiResult)
            .catch(handleApiError);
    }
    

    return (
        <>
            <div className='container-fluid mx-auto px-4 w-[100%]'>
                <div className='row mt-3'>
                    <div className='col-md-8 '>
                        <div className='overflow-auto'>
                            <div className='rounded py-3  text-2xl font-bold bg-green-300'>
                                Attendence List
                            </div>
                            <div className='card-body'>
                          
                                <EmpTabel tabelData={attendenceList} editData={onEditAttendence} deleteData={ondeleteAttendence} columns={header}/>                                
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='py-3 text-2xl bg-green-300 font-bold'>
                                Attendence Form
                            </div>
                            <div className='card-body s bg-indigo-200'>
                                <div className='grid grid-cols-2 gap-x-4'>
                                    <div>
                                        <label className='text-xl'>Employee Id</label>
                                        <select name="employeeId" id="" value={obj.employeeId} onChange={inputChange} className='form-select inputStyle'>                                                     
                                            <option >Select Employee</option>
                                            {                                                
                                                employeeList.map((employee) => {
                                                    return (                                                        
                                                        <option value={employee.empId}>{employee.empName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label className='text-xl'>Date</label>
                                        <input type="datetime-local" value={obj.attendanceDate} onChange={inputChange} name='attendanceDate' className='form-control inputStyle' placeholder='Enter Contact Number' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                    <div>
                                        <label className='text-xl'>In Time</label>
                                        <input type="datetime-local" value={obj.inTime} onChange={inputChange} name='inTime' className='form-control inputStyle' placeholder='Enter outTime.' />
                                    </div>
                                    <div>
                                        <label className='text-xl'>Out Time</label>
                                        <input type="datetime-local" value={obj.outTime} onChange={inputChange} name="outTime" className='form-control inputStyle' placeholder='Enter Email' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                    <div>                                        
                                        <input type="checkbox" value={obj.isFullDay} onChange={inputChange} name="isFullDay" className='form-check-input inputStyle' />
                                        <label className='text-xl ms-2'>Is Present</label>
                                    </div>

                                </div>
                                <div className='grid grid-cols-1 gap-x-4 mt-4'>
                                    <div className='flex justify-evenly'>
                                        {obj.attendanceId === 0 ?
                                            <button className='editButton' onClick={createAttendence}>Add</button>
                                            :
                                            <button className='updateButton' onClick={updateAttendence}>Update</button>
                                        }


                                        <button className='resetButton' onClick={reset}>Reset</button>
                                    </div>

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


    // const onAttendenceInputChange = (event) => {
    //         const {name, value, checked}= event.target
    //         if(name === "isFullDay"){
    //             setObj((prevAtte)=>({...prevAtte, [name]:checked}))
    //         }else{
    //             setObj((prevAtte)=>({...prevAtte, [name]:value}))
    //         }

    // }
    
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

          {/* <table className="w-[100%] table-auto rounded-lg border border-black">
                                    <thead>
                                        <tr className=" text-2xl hover:bg-slate-600 bg-gray-400 ">
                                            <th className="border border-slate-300 py-3">Sr.No</th>
                                            <th className="border border-slate-300 py-3">Name</th>
                                            <th className="border border-slate-300 py-3">Contact No</th>
                                            <th className="border border-slate-300 py-3">inTime</th>
                                            <th className="border border-slate-300 py-3">outTime</th>
                                            <th className="border border-slate-300 py-3">isFullDay</th>
                                            <th className="border border-slate-300 py-3">Action</th>

                                        </tr>
                                    </thead>
                                        {attendenceList.map((attendence, ind) => (
                                           <CommonTabel tabelData={attendence} index={ind} editData={onEditAttendence} deleteData={ondeleteAttendence} />
                                        ))}

                                </table> */}