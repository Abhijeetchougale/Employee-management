import React, { useEffect, useState } from 'react';
import { getData, postData, updateData, deleteData} from '../Services/Service';
import useEmployeeData from '../Utility/useEmployeeData';
import useInputChange from '../Utility/useInputChange';
import { rowColors } from '../Constants/Constants';

const Leave = () => {

    const [leaveList, setleaveList] = useState([]);

    const {employeeList}=useEmployeeData()

    // const [leaveObj, setObj] = useState({
    //     "leaveId": 0,
    //     "employeeId": 0,
    //     "leaveDate": "",
    //     "leaveReason": "  `",
    //     "noOfFullDayLeaves": 0,
    //     "noOfHalfDayLeaves": 0
    //   })

      const { obj, inputChange, reset, setObj } = useInputChange({
        "leaveId": 0,
        "employeeId": 0,
        "leaveDate": "",
        "leaveReason": "",
        "noOfFullDayLeaves": 0,
        "noOfHalfDayLeaves": 0
    })
     
    const getURL_END='GetAllLeaves';
    const endPOST_URL ='AddLeave';
    const endUPDATE_URL ='UpdateLeave';
    const endDELETE_URL ='DeleteLeaveById?leaveid=';

    useEffect(() => {
        getLeave();
    }, [])

    // const onAdvanceInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setObj((preAdvance) => ({ ...preAdvance, [name]: value }))
    // }

    const getLeave =() => {
        try {
            getData(getURL_END).then((result)=>{
                setleaveList(result)
               })     
        } catch (error) {
            alert(error.message)
        }
        
    }


    const onaddLeave =() =>{
        postData(endPOST_URL,obj).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getLeave();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })       
    }

    const onUpdateLeave =() => {
        updateData(endUPDATE_URL,obj).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getLeave();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })
    }

    const onEdit = (adv) => {
        setObj(adv)
    }

    const onDeleteAdvance = (Id) => {
        deleteData(endDELETE_URL,Id).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getLeave();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })
    }

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
                                    <thead className='text-2xl font-bold'>
                                        <tr>
                                            <th className="border border-slate-300 ...">Sr.No</th>
                                            <th className="border border-slate-300 ...">Employee Name</th>
                                            <th className="border border-slate-300 ...">Name</th>
                                            <th className="border border-slate-300 ...">Contact No</th>
                                            <th className="border border-slate-300 ...">Advance Data</th>
                                            <th className="border border-slate-300 ...">Advance Amount</th>
                                            <th className="border border-slate-300 ...">Reason</th>

                                         </tr>
                                    </thead>
                                    <tbody>
                                        {leaveList.map((leaveItem, index) => (
                                            <tr key={leaveItem.advanceId} className={`${rowColors[index % rowColors.length]} `}>

                                                <td className='border border-slate-300 text-black text-lg'>{index + 1}</td>
                                                <td className='border border-slate-300 text-black text-lg'>{leaveItem.empName}</td>
                                                {/* <td className='border border-slate-300'>{leaveItem.empName}</td> */}
                                                <td className='border border-slate-300 text-black text-lg' >{leaveItem.leaveDate}</td>
                                                <td className='border border-slate-300 text-black text-lg'>{leaveItem.noOfFullDayLeaves}</td>
                                                <td className='border border-slate-300 text-black text-lg'>{leaveItem.noOfHalfDayLeaves}</td>
                                                <td className='border border-slate-300 text-black text-lg'>{leaveItem.leaveReason}</td>
                                                <td className='border border-slate-300 text-black text-lg'>
                                                    <button className='btn btn-sm btn-success m-2' onClick={() => onEdit(leaveItem)}>Edit</button>
                                                    <button className='btn btn-sm btn-danger m-2' onClick={() => onDeleteAdvance(leaveItem.leaveId)}>Delete</button>
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
                                Advance
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Employee Id</label>
                                        <select name="employeeId" id="" value={obj.employeeId} onChange={inputChange} className='form-select'>
                                            {
                                                employeeList.map((employee) => {
                                                    return (
                                                        <option value={employee.empId}>{employee.empName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Leave Date </label>
                                        <input type="date" value={obj.leaveDate} onChange={inputChange} name='leaveDate' className='form-control'  />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>No Of Full Day Leaves</label>
                                        <input type="text" value={obj.noOfFullDayLeaves} onChange={inputChange} name="noOfFullDayLeaves" className='form-control'  />
                                    </div>
                                    <div className='col-md-6'>
                                        <label>No Of Half Day Leaves</label>
                                        <input type="text" value={obj.noOfHalfDayLeaves} onChange={inputChange} name="noOfHalfDayLeaves" className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Leave Reason</label>
                                        <input type="text" value={obj.leaveReason} onChange={inputChange} name="leaveReason" className='form-control'  />
                                    </div>
                        
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className='text-center'>
                                    {obj.leaveId === 0 ?
                                        <button className='btn btn-sm btn-primary m-2' onClick={onaddLeave}>Add</button>
                                        :
                                        <button className='btn btn-sm btn-warning m-2' onClick={onUpdateLeave}>Update</button>
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

export default Leave;



