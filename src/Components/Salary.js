import React, { useEffect, useState, useCallback } from 'react';
import { getData, postData, updateData, deleteData } from '../Services/Service';
import useEmployeeData from '../Utility/useEmployeeData';
import useInputChange from '../Utility/useInputChange';
// import CommonTabel from './CommonTabel';
import EmpTabel from './EmpTabel';
import axios from 'axios'
const Salary = () => {

    const [salaryList, setsalaryList] = useState([]);

    const { employeeList } = useEmployeeData()
    const header = ['empName', 'salaryDate', 'totalAdvance', 'presentDays', 'salaryAmount']

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
    }, []);


    const handleApiError = (error) => {
        console.error('API error:', error);
        alert('An error occurred. Please try again.');
    };

    const handleApiResult = (result) => {
        if (result.result) {
            alert(result.message);
            getSalary();
            reset();
        } else {
            alert(result.message);
        }
    };

    //**************************GET DATA***********************/

    const getSalary = () => {
        getData(getURL_END)
            .then((result) => setsalaryList(result))
            .catch(handleApiError);
    }

    //**************************CREATE DATA***********************/

    const onaddAdvance = () => {
        postData(endPOST_URL, obj)
            .then(handleApiResult)
            .catch(handleApiError);
    }
    //*************************UPDATE DATA*********************************/

    const onUpdateAdvance = () => {
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

    const getAttenceByEmpId = async (event) => {
        const attendance = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAttendanceByEmployeeId?empId=" + event.target.value);
        const advance = await axios.get("https://onlinetestapi.gerasim.in/api/TeamSync/GetAllAdvanceByEmpId?empid=" + event.target.value);
        debugger;
        const totalPresentDays = attendance.data.data.length;
        let totalDavAmt = 0;
        for (let index = 0; index < advance.data.data.length; index++) {
            totalDavAmt = totalDavAmt + advance.data.data[index].advanceAmount;
        }
        const perDaySalary = employeeList.find(m => m.empId == event.target.value).salary / 30;

        const totalSalary = ((perDaySalary * totalPresentDays) - totalDavAmt).toFixed(2);


    }


    return (
        <>
            <div className='container-fluid mx-auto px-4 w-[100%]'>
                <div className='row mt-3'>
                    <div className='col-md-8 '>
                        <div className='overflow-auto'>
                            <div className='rounded py-3  text-2xl font-bold bg-green-300'>
                                Salary Data
                            </div>
                            <div className='rounded-lg'>

                                <EmpTabel tabelData={salaryList} editData={onEdit} deleteData={onDeleteAdvance} columns={header} />

                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='py-3 text-2xl bg-green-300 font-bold'>
                                Salary Details
                            </div>
                            <div className='card-body  bg-indigo-200'>
                                <div className='grid grid-cols-2 gap-x-4'>
                                    <div >
                                        <label className='text-xl'>Employee Id</label>
                                        <select name="employeeId" id="" onChange={(event) => { getAttenceByEmpId(event) }} className='form-select inputStyle'>

                                            {
                                                employeeList.map((employee) => {

                                                    return (
                                                        <option value={employee.empId}>{employee.empName}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div >
                                        <label className='text-xl'>Salary Date</label>
                                        <input type="date" value={obj.salaryDate} onChange={inputChange} name='salaryDate' className='form-control  inputStyle' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-4'>
                                    <div >
                                        <label className='text-xl'>Total Advance</label>
                                        <input type="text" value={obj.totalAdvance} onChange={inputChange} name="totalAdvance" className='form-control  inputStyle' />
                                    </div>
                                    <div >
                                        <label className='text-xl'>Present Days</label>
                                        <input type="text" value={obj.presentDays} onChange={inputChange} name="presentDays" className='form-control  inputStyle' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-4'>
                                    <div >
                                        <label className='text-xl'>Salary Amount</label>
                                        <input type="text" value={obj.salaryAmount} onChange={inputChange} name="salaryAmount" className='form-control  inputStyle' />
                                    </div>

                                </div>
                                <div className='grid grid-cols-1 gap-x-4 mt-4 '>
                                    <div className='flex justify-evenly'>
                                        {obj.salaryId === 0 ?
                                            <button className='editButton' onClick={onaddAdvance}>Add</button>
                                            :
                                            <button className='updateButton' onClick={onUpdateAdvance}>Update</button>
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

export default Salary;



// const getSalary = useCallback(() => {
//     getData(getURL_END)
//         .then((result) => setsalaryList(result))
//         .catch(handleApiError);
// }, [getURL_END]);