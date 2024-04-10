import React, { useEffect, useState } from 'react';
import { getData, postData, updateData, deleteData } from '../Services/Service';
import useEmployeeData from '../Utility/useEmployeeData';
import useInputChange from '../Utility/useInputChange';
import {rowColors} from '../Constants/Constants'

const Salary = () => {

    const [salaryList, setsalaryList] = useState([]);

    const { employeeList } = useEmployeeData()



    const { obj, inputChange, reset, setObj } = useInputChange({
        "salaryId": 0,
        "employeeId": 0,
        "salaryDate": "",
        "totalAdvance": 0,
        "presentDays": 0,
        "salaryAmount": 0
    })

    const getURL_END = 'GetAllSalary';
    const endPOST_URL = 'AddSalary';
    const endUPDATE_URL = 'UpdateSalary';
    const endDELETE_URL = 'DeleteSalaryById?salaryid=';

    useEffect(() => {
        getSalary();
    }, [])


    const getSalary = () => {
        try {
            getData(getURL_END).then((result) => {
                setsalaryList(result)
            })
        } catch (error) {
            alert(error.message)
        }

    }


    const onaddAdvance = () => {
        postData(endPOST_URL, obj).then((result) => {
            try {
                if (result.result) {
                    alert(result.message);
                    getSalary();
                    reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })
    }

    const onUpdateAdvance = () => {
        updateData(endUPDATE_URL, obj).then((result) => {
            try {
                if (result.result) {
                    alert(result.message);
                    getSalary();
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
        deleteData(endDELETE_URL, Id).then((result) => {
            try {
                if (result.result) {
                    alert(result.message);
                    getSalary();
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
                            <div className='rounded-md'>
                                <table className="w-[100%] table-auto rounded-md border border-slate-400 bg-red-400">
                                    <thead>
                                        <tr>
                                            <th className="border border-slate-300 ...">Sr.No</th>
                                            <th className="border border-slate-300 ...">Employee Name</th>
                                            <th className="border border-slate-300 ...">Salary Date</th>
                                            <th className="border border-slate-300 ...">Total Advance</th>
                                            <th className="border border-slate-300 ...">Present Days</th>
                                            <th className="border border-slate-300 ...">Salary Amount</th>
                                            Details
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {salaryList.map((salaryItem, index) => (
                                            <tr key={salaryItem.advanceId} className={`${rowColors[index % rowColors.length]} `}>
                                                <td className='border border-slate-300'>{index + 1}</td>
                                                <td className='border border-slate-300'>{salaryItem.empName}</td>
                                                <td className='border border-slate-300'>{salaryItem.salaryDate}</td>
                                                <td className='border border-slate-300'>{salaryItem.totalAdvance}</td>
                                                <td className='border border-slate-300'>{salaryItem.presentDays}</td>
                                                <td className='border border-slate-300'>{salaryItem.salaryAmount}</td>
                                                <td className='border border-slate-300'>
                                                    <button className='btn btn-sm btn-success m-2' onClick={() => onEdit(salaryItem)}>Edit</button>
                                                    <button className='btn btn-sm btn-danger m-2' onClick={() => onDeleteAdvance(salaryItem.salaryId)}>Delete</button>
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
                                        <label>Salary Date</label>
                                        <input type="date"  value={obj.salaryDate} onChange={inputChange} name='salaryDate' className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Total Advance</label>
                                        <input type="text" value={obj.totalAdvance} onChange={inputChange} name="totalAdvance" className='form-control' />
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Present Days</label>
                                        <input type="text" value={obj.presentDays} onChange={inputChange} name="presentDays" className='form-control' />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Salary Amount</label>
                                        <input type="text" value={obj.salaryAmount} onChange={inputChange} name="salaryAmount" className='form-control' />
                                    </div>

                                </div>
                            </div>
                            <div className='card-footer'>
                                <div className='text-center'>
                                    {obj.salaryId === 0 ?
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

export default Salary;



