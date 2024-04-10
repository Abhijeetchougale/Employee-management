import React, { useState } from 'react';
import useEmployeeData from '../Utility/useEmployeeData';
import useInputChange from '../Utility/useInputChange';
import { postData, updateData, deleteData } from '../Services/Service';
import EmployeeTabel from './Tabel/EmployeeTabel';


const Employee = () => {
    const employee = useEmployeeData();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)

    const empObj = useInputChange({
        empId: 0,
        empName: "",
        empContactNo: "",
        empAltContactNo: "",
        empEmail: "",
        addressLine1: "",
        addressLine2: "",
        pincode: "",
        city: "",
        state: "",
        bankName: "",
        ifsc: "",
        accountNo: "",
        bankBranch: "",
        salary: 0
    })

    const endPOST_URL = 'CreateEmployee';
    const endUPDATE_URL = 'UpdateEmployee';
    const endDELETE_URL = 'DeleteEmployeeByEmpId?empid=';

    const validateForm = () => {
        return (
            empObj.obj.empName !== '' &&
            empObj.obj.empContactNo !== '' &&
            empObj.obj.empAltContactNo !== '' &&
            empObj.obj.empEmail !== '' &&
            empObj.obj.city !== '' &&
            empObj.obj.bankName !== '' &&
            empObj.obj.bankBranch !== '' &&
            empObj.obj.addressLine2 !== '' &&
            empObj.obj.addressLine1 !== '' &&
            empObj.obj.state !== '' &&
            empObj.obj.ifsc !== '' &&
            empObj.obj.accountNo !== '' &&
            empObj.obj.pincode !== '' &&
            empObj.obj.salary !== ''
        );
    }

    const saveEmployee = () => {
        setIsFormSubmitted(true);
        if (validateForm()) {
            postData(endPOST_URL, empObj.obj).then((result) => {
                try {
                    if (result.result) {
                        alert(result.message);
                        employee.getEmpData();
                        empObj.reset();
                    } else {
                        alert(result.message)
                    }
                } catch (error) {
                    alert(error.message)
                }
            })
        }

    }


    const updateEmployee = () => {
        updateData(endUPDATE_URL, empObj.obj).then((result) => {
            try {
                if (result.result) {
                    alert(result.message);
                    employee.getEmpData();
                    empObj.reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })
    }


    const deleteEmployee = (Id) => {
        deleteData(endDELETE_URL, Id).then((result) => {
            try {
                if (result.result) {
                    alert(result.message);
                    employee.getEmpData();
                    empObj.reset();
                } else {
                    alert(result.message)
                }
            } catch (error) {
                alert(error.message)
            }
        })
    }


    const onEditEmployee = (employee) => {
        empObj.setObj(employee)
    }


    return (
        <div className='container-fluid mx-auto px-4 w-[100%]'>
            <div className='row mt-3'>
                <div className='col-md-8 '>
                    <div className='overflow-auto'>
                        <div className='rounded py-3  text-2xl font-bold bg-green-300'>
                            Employee List
                        </div>
                        <div className='rounded-lg'>
                            <table className="w-[100%] table-auto rounded-lg border border-black">
                                <thead>
                                    <tr className=" text-2xl hover:bg-slate-600 bg-gray-400 ">
                                        <th className="border border-slate-300 py-3 ">Sr.No</th>
                                        <th className="border border-slate-300 py-3 ">Name</th>
                                        <th className="border border-slate-300 py-3 ">Contact No</th>
                                        <th className="border border-slate-300 py-3 ">Email</th>
                                        <th className="border border-slate-300 py-3 ">City</th>
                                        <th className="border border-slate-300 py-3 ">Salary</th>
                                        <th className="border border-slate-300 py-3 ">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employee.employeeList.map((employee, ind) =>
                                            <EmployeeTabel employeeData={employee} index={ind} onEditData={onEditEmployee} onDeleteData={deleteEmployee} />

                                        )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card'>
                        <div className='py-3 text-2xl bg-green-300 font-bold'>
                            Employee Form
                        </div>
                        <div className='card-body bg-indigo-200 '>
                            <div className='grid grid-cols-2 gap-x-4'>
                                <div>
                                    <label className='text-xl'>Name</label>
                                    <input type="text" value={empObj.obj.empName} onChange={empObj.inputChange} name="empName" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full'placeholder='Enter Name'/>
                                    {
                                    isFormSubmitted && empObj.obj.empName === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Contact No.</label>
                                    <input type="text" value={empObj.obj.empContactNo} onChange={empObj.inputChange} name='empContactNo' className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full'placeholder='Enter Contact Number'/>
                                    {
                                    isFormSubmitted && empObj.obj.empContactNo === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>Alternate Contact No</label>
                                    <input type="text" value={empObj.obj.empAltContactNo} onChange={empObj.inputChange} name='empAltContactNo' className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter Alternate Contact No.' />
                                    {
                                    isFormSubmitted && empObj.obj.empAltContactNo === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Email</label>
                                    <input type="text" value={empObj.obj.empEmail} onChange={empObj.inputChange} name="empEmail" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter Email'/>
                                    {
                                    isFormSubmitted && empObj.obj.empEmail === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>Address 1</label>
                                    <input type="text" value={empObj.obj.addressLine1} onChange={empObj.inputChange} name="addressLine1" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter Address 1'/>
                                    {
                                    isFormSubmitted && empObj.obj.addressLine1 === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Address 2</label>
                                    <input   type="text" value={empObj.obj.addressLine2} onChange={empObj.inputChange} name="addressLine2" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter Address 2' />
                                    {
                                    isFormSubmitted && empObj.obj.addressLine2 === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>Pin Code</label>
                                    <input type="text" value={empObj.obj.pincode} onChange={empObj.inputChange} name="pincode" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter Pin Code' />
                                    {
                                    isFormSubmitted && empObj.obj.pincode === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>City</label>
                                    <input type="text" value={empObj.obj.city} onChange={empObj.inputChange} name="city" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter City' />
                                    {
                                    isFormSubmitted && empObj.obj.city === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>State</label>
                                    <input type="text" value={empObj.obj.state} onChange={empObj.inputChange} name="state" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter State' />
                                    {
                                    isFormSubmitted && empObj.obj.state === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Bank Name</label>
                                    <input type="text" value={empObj.obj.bankName} onChange={empObj.inputChange} name='bankName' className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter Bank Name' />
                                    {
                                    isFormSubmitted && empObj.obj.bankName === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>IFSC Code</label>
                                    <input type="text" value={empObj.obj.ifsc} onChange={empObj.inputChange} name="ifsc" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter IFSC Code' />
                                    {
                                    isFormSubmitted && empObj.obj.ifsc === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Account Number</label>
                                    <input type="text" value={empObj.obj.accountNo} onChange={empObj.inputChange} name="accountNo" className='form-control hover:(bg-sky-10 border-b-orange-600)  w-full' placeholder='Enter Account Number' />
                                    {
                                    isFormSubmitted && empObj.obj.accountNo === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>Bank Branch</label>
                                    <input type="text" value={empObj.obj.bankBranch} onChange={empObj.inputChange} name='bankBranch' className='form-control  hover:border-b-orange-600 hover:bg-sky-100 hover:bg-sky-100 w-full' placeholder='Enter Bank Branch' />
                                    {
                                    isFormSubmitted && empObj.obj.bankBranch === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Salary</label>
                                    <input type="text" value={empObj.obj.salary} onChange={empObj.inputChange} name="salary" className='form-control  hover:border-b-orange-600 hover:bg-sky-100 w-full' placeholder='Enter Salary' />
                                    {
                                    isFormSubmitted && empObj.obj.salary === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-x-4 mt-4  '>
                                <div className='flex justify-evenly'>
                                    {empObj.obj.empId === 0 ?
                                        <button className='py-2 px-4 text-xl  bg-green-600 border-solid rounded-lg hover:bg-green-800' onClick={saveEmployee}>Add</button> :
                                        <button className='py-2 px-4 text-xl  bg-yellow-600 border-solid rounded-lg hover:bg-yellow-800' onClick={updateEmployee}>Update</button>
                                    }
                                    <button className='py-2 px-4 text-xl  bg-red-400 border-solid rounded-lg hover:bg-red-800' onClick={empObj.reset}>Reset</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employee;


// const onReset =()=>{
//     setEmployeeObj({
//         empId: 0,
//         empName: "",
//         empContactNo: "",
//         empAltContactNo: "",
//         empEmail: "",
//         addressLine1: "",
//         addressLine2: "",
//         pincode: "",
//         city: "",
//         state: "",
//         bankName: "",
//         ifsc: "",
//         accountNo: "",
//         bankBranch: "",
//         salary: 0
//     })
// }

// const [empObj.obj, setEmployeeObj] = useState({
//     empId: 0,
//     empName: "",
//     empContactNo: "",
//     empAltContactNo: "",
//     empEmail: "",
//     addressLine1: "",
//     addressLine2: "",
//     pincode: "",
//     city: "",
//     state: "",
//     bankName: "",
//     ifsc: "",
//     accountNo: "",
//     bankBranch: "",
//     salary: 0
// })

// const empObj.inputChange = (event) => {
//     const { name, value } = event.target
//     setEmployeeObj((prevEmp) => ({ ...prevEmp, [name]: value }));
// }
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"

