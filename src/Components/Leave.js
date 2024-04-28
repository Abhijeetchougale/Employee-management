import React, { useEffect, useState } from 'react';
import { getData, postData, updateData, deleteData } from '../Services/Service';
import useEmployeeData from '../Utility/useEmployeeData';
import useInputChange from '../Utility/useInputChange';
// import CommonTabel from './CommonTabel';
import EmpTabel from './EmpTabel';

const Leave = () => {

    const [leaveList, setleaveList] = useState([]);

    const { employeeList } = useEmployeeData()

    const header=['empName','leaveDate','noOfFullDayLeaves','noOfHalfDayLeaves','leaveReason']

    const { obj, inputChange, reset, setObj } = useInputChange({
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": "",
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
    })

    const getURL_END = 'GetAllLeaves';
    const endPOST_URL = 'AddLeave';
    const endUPDATE_URL = 'UpdateLeave';
    const endDELETE_URL = 'DeleteLeaveById?leaveid=';

    //  const getLeave = () => {
    //     getData(getURL_END)
    //     .then((result) => setleaveList(result))
    //     .catch(handleApiError);
    // }

    useEffect(() => {
        getLeave();
    }, []);

    const handleApiError = (error) => {
        console.error('API error:', error);
        alert('An error occurred. Please try again.');
    };

    const handleApiResult = (result) => {
        if (result.result) {
            alert(result.message);
            getLeave();
            reset();
        } else {
            alert(result.message);
        }
    };
    
//**************************GET DATA***********************/

    const getLeave = () => {
        getData(getURL_END)
        .then((result) => setleaveList(result))
        .catch(handleApiError);
    }

//***************************CREATE DATA********************/

    const onaddLeave = () => {
        postData(endPOST_URL, obj)
            .then(handleApiResult)
            .catch(handleApiError);
    }
//*************************UPDATE DATA*********************************/

    const onUpdateLeave = () => {
        updateData(endUPDATE_URL, obj)
           .then(handleApiResult)
           .catch(handleApiError)
    }
//**************************EDIT DATA********************************* */

    const onEdit = (adv) => {
        setObj(adv)
    }
//**************************DELETE DATA********************************* */

    const onDeleteAdvance = (Id) => {
        deleteData(endDELETE_URL, Id)
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
                                Leave Data
                            </div>
                            <div className='rounded-lg'>
                                <EmpTabel tabelData={leaveList} editData={onEdit} deleteData={onDeleteAdvance} columns={header}/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className=' py-3 text-2xl bg-green-300 font-bold'>
                                Leave Form
                            </div>
                            <div className='card-body  bg-indigo-200 '>
                                <div className='grid grid-cols-2 gap-x-4'>
                                    <div >
                                        <label className='text-xl'>Employee Id</label>
                                        <select name="employeeId" id="" value={obj.employeeId} onChange={inputChange} className='form-select  inputStyle'>
                                            <option >Select Employee</option>
                                            {
                                                employeeList.map((employee) => {
                                                    <option disabled>Select Employee</option>
                                                    return (
                                                        <option value={employee.empId}>{employee.empName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div >
                                        <label className='text-xl'>Leave Date </label>
                                        <input type="date" value={obj.leaveDate} onChange={inputChange} name='leaveDate' className='form-control inputStyle' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                    <div >
                                        <label className='text-xl'>No Of Full Day Leaves</label>
                                        <input type="text" value={obj.noOfFullDayLeaves} onChange={inputChange} name="noOfFullDayLeaves" className='form-control inputStyle' />
                                    </div>
                                    <div >
                                        <label className='text-xl'>No Of Half Day Leaves</label>
                                        <input type="text" value={obj.noOfHalfDayLeaves} onChange={inputChange} name="noOfHalfDayLeaves" className='form-control inputStyle' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-1 gap-x-4 mt-4'>
                                    <div >
                                        <label className='text-xl'>Leave Reason</label>
                                        <input type="text" value={obj.leaveReason} onChange={inputChange} name="leaveReason" className='form-control inputStyle' />
                                    </div>

                                </div>
                                <div className='grid grid-cols-1 gap-x-4 mt-4'>
                                    <div className='flex justify-evenly'>
                                        {obj.leaveId === 0 ?
                                            <button className='editButton' onClick={onaddLeave}>Add</button>
                                            :
                                            <button className='updateButton' onClick={onUpdateLeave}>Update</button>
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

export default Leave;


// const [leaveObj, setObj] = useState({
//     "leaveId": 0,
//     "employeeId": 0,
//     "leaveDate": "",
//     "leaveReason": "  `",
//     "noOfFullDayLeaves": 0,
//     "noOfHalfDayLeaves": 0
//   })


// const onAdvanceInputChange = (event) => {
//     const { name, value } = event.target;
//     setObj((preAdvance) => ({ ...preAdvance, [name]: value }))
// }

// const onReset = () => {
//     setObj(
//         {
//             "leaveId": 0,
//             "employeeId": 0,
//             "leaveDate": "",
//             "leaveReason": "  `",
//             "noOfFullDayLeaves": 0,
//             "noOfHalfDayLeaves": 0
//         }
//     )
// }