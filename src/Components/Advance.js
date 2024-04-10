import React, { useEffect, useState } from 'react';
import { getData, postData, updateData, deleteData} from '../Services/Service';
import useEmployeeData from '../Utility/useEmployeeData';
import { rowColors } from '../Constants/Constants';
import useInputChange from '../Utility/useInputChange';

const Advance = () => {

    const [advanceList, setAdvanceList] = useState([]);

    const{ employeeList}=useEmployeeData()

    const [obj, inputChange, setObj, reset]= useInputChange(
        {
            "advanceId": 0,
            "employeeId": 0,
            "advanceDate": "",
            "advanceAmount": 0,
            "reason": ""
        }
    )

    const getURL_END='GetAllAdvance';
    const endPOST_URL ='AddAdvance';
    const endUPDATE_URL ='UpdateAdvance';
    const endDELETE_URL ='DeleteAdvanceById?advanceid=';

    useEffect(() => {
        getAdvance();
    }, [])

    const getAdvance =() => {
        try {
            getData(getURL_END).then((result)=>{
                setAdvanceList(result)
               })     
        } catch (error) {
            alert(error.message)
        }
        
    }


    const onaddAdvance =() =>{
        postData(endPOST_URL,obj).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getAdvance();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })       
    }

    const onUpdateAdvance =() => {
        updateData(endUPDATE_URL,obj).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getAdvance();
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

    const onDeleteAdvance = (advId) => {
        deleteData(endDELETE_URL,advId).then((result)=>{
            try {
                if (result.result) {
                    alert(result.message);
                    getAdvance();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })
    }

    
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
                                            <th className="border border-slate-300 ...">Employee Id</th>
                                            <th className="border border-slate-300 ...">Name</th>
                                            <th className="border border-slate-300 ...">Contact No</th>
                                            <th className="border border-slate-300 ...">Advance Data</th>
                                            <th className="border border-slate-300 ...">Advance Amount</th>
                                            <th className="border border-slate-300 ...">Reason</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                        {advanceList.map((advanceItem, index) => (
                                            <tr key={advanceItem.advanceId} className={`${rowColors[index % rowColors.length]} `}>

                                                <td className='border border-slate-300'>{index + 1}</td>
                                                <td className='border border-slate-300'>{advanceItem.employeeId}</td>
                                                <td className='border border-slate-300'>{advanceItem.empName}</td>
                                                <td className='border border-slate-300'>{advanceItem.empContactNo}</td>
                                                <td className='border border-slate-300'>{advanceItem.advanceDate}</td>
                                                <td className='border border-slate-300'>{advanceItem.advanceAmount}</td>
                                                <td className='border border-slate-300'>{advanceItem.reason}</td>
                                                <td className='border border-slate-300'>
                                                    <button className='btn btn-sm btn-success m-2' onClick={() => onEdit(advanceItem)}>Edit</button>
                                                    <button className='btn btn-sm btn-danger m-2' onClick={() => onDeleteAdvance(advanceItem.advanceId)}>Delete</button>
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
                                        <label>Advance Date</label>
                                        <input type="date" value={obj.advanceDate} onChange={inputChange} name='advanceDate' className='form-control'  />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Advance Amount</label>
                                        <input type="text" value={obj.advanceAmount} onChange={inputChange} name="advanceAmount" className='form-control' placeholder='Enter Amount' />
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Reason</label>
                                        <input type="text" value={obj.reason} onChange={inputChange} name="reason" className='form-control' />
                                    </div>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className='text-center'>
                                    {obj.advanceId === 0 ?
                                        <button className='btn btn-sm btn-primary m-2' onClick={onaddAdvance}>Add</button>
                                        :
                                        <button className='btn btn-sm btn-warning m-2' onClick={onUpdateAdvance}>Update</button>
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

export default Advance;



 // const [advanceObj, setAdvanceObj] = useState({
    //     "advanceId": 0,
    //     "employeeId": 0,
    //     "advanceDate": "",
    //     "advanceAmount": 0,
    //     "reason": ""
    // })
     

// const onAdvanceInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setObj((preAdvance) => ({ ...preAdvance, [name]: value }))
    // }

    // const onReset = () => {
    //     setAdvanceObj(
    //         {
    //             "advanceId": 0,
    //             "employeeId": 0,
    //             "advanceDate": "",
    //             "advanceAmount": 0,
    //             "reason": ""
    //         }
    //     )
    // }