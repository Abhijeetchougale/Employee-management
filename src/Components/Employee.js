import React, { useState } from 'react';
import useEmployeeData from '../Utility/useEmployeeData';
import useInputChange from '../Utility/useInputChange';
import { postData, updateData, deleteData } from '../Services/Service';
import EmpTabel from './EmpTabel';


const Employee = () => {
    const { employeeList, getEmpData } = useEmployeeData();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    // const header = ['empId'="Id",'empName'='Name', 'empContactNo'='Contact No.', 'empEmail'='Email', 'city'='City', 'salary'='Salary'];
    const header = [
        'empId',
        'empName' ,
        'empContactNo' ,
        'empEmail' ,
        'city',
        'salary'
    ];
    const { obj, inputChange, reset, setObj } = useInputChange({
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
    });

    const endPOST_URL = 'CreateEmployee';
    const endUPDATE_URL = 'UpdateEmployee';
    const endDELETE_URL = 'DeleteEmployeeByEmpId?empid=';

    const validateForm = () => {
        // Add more specific validation logic here if needed
        return Object.values(obj).every(value => value !== '');
    };

    const handleApiError = (error) => {
        console.error('API error:', error);
        alert('An error occurred. Please try again.');
    };

    const handleApiResult = (result) => {
        if (result.result) {
            alert(result.message);
            getEmpData();
            reset();
        } else {
            alert(result.message);
        }
    };
//***************************CREATE DATA********************/

    const saveEmployee = () => {
        setIsFormSubmitted(true);
        if (validateForm()) {
            postData(endPOST_URL, obj)
                .then(handleApiResult)
                .catch(handleApiError);
        }
    };

 //*************************UPDATE DATA*********************************/
 const updateEmployee = () => {
        updateData(endUPDATE_URL, obj)
            .then(handleApiResult)
            .catch(handleApiError);
    };
//**************************EDIT DATA********************************* */

    const onEditEmployee = (employee) => {
        setObj(employee);
    };
//**************************DELETE DATA********************************* */

    const deleteEmployee = (Id) => {
        deleteData(endDELETE_URL, Id)
            .then(handleApiResult)
            .catch(handleApiError);
    };

   


    return (
        <div className='container-fluid mx-auto px-4 w-[100%]'>
            <div className='row mt-3'>
                <div className='col-md-8 '>
                    <div className='overflow-auto'>
                        <div className='rounded py-3  text-2xl font-bold bg-green-300'>
                            Employee List
                        </div>
                        <div className='rounded-lg'>
                            
                            <EmpTabel tabelData={employeeList} editData={onEditEmployee} deleteData={deleteEmployee} columns={header}/>

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
                                    <input type="text" value={obj.empName} onChange={inputChange} name="empName" className='form-control inputStyle' placeholder='Enter Name' />
                                    {
                                        isFormSubmitted && obj.empName === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Contact No.</label>
                                    <input type="text" value={obj.empContactNo} onChange={inputChange} name='empContactNo' className='form-control inputStyle' placeholder='Enter Contact Number' />
                                    {
                                        isFormSubmitted && obj.empContactNo === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>Alternate Contact No</label>
                                    <input type="text" value={obj.empAltContactNo} onChange={inputChange} name='empAltContactNo' className='form-control inputStyle' placeholder='Enter Alternate Contact No.' />
                                    {
                                        isFormSubmitted && obj.empAltContactNo === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Email</label>
                                    <input type="text" value={obj.empEmail} onChange={inputChange} name="empEmail" className='form-control inputStyle' placeholder='Enter Email' />
                                    {
                                        isFormSubmitted && obj.empEmail === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>Address 1</label>
                                    <input type="text" value={obj.addressLine1} onChange={inputChange} name="addressLine1" className='form-control inputStyle' placeholder='Enter Address 1' />
                                    {
                                        isFormSubmitted && obj.addressLine1 === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Address 2</label>
                                    <input type="text" value={obj.addressLine2} onChange={inputChange} name="addressLine2" className='form-control inputStyle' placeholder='Enter Address 2' />
                                    {
                                        isFormSubmitted && obj.addressLine2 === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>Pin Code</label>
                                    <input type="text" value={obj.pincode} onChange={inputChange} name="pincode" className='form-control inputStyle' placeholder='Enter Pin Code' />
                                    {
                                        isFormSubmitted && obj.pincode === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>City</label>
                                    <input type="text" value={obj.city} onChange={inputChange} name="city" className='form-control inputStyle' placeholder='Enter City' />
                                    {
                                        isFormSubmitted && obj.city === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>State</label>
                                    <input type="text" value={obj.state} onChange={inputChange} name="state" className='form-control inputStyle' placeholder='Enter State' />
                                    {
                                        isFormSubmitted && obj.state === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Bank Name</label>
                                    <input type="text" value={obj.bankName} onChange={inputChange} name='bankName' className='form-control inputStyle' placeholder='Enter Bank Name' />
                                    {
                                        isFormSubmitted && obj.bankName === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>IFSC Code</label>
                                    <input type="text" value={obj.ifsc} onChange={inputChange} name="ifsc" className='form-control inputStyle' placeholder='Enter IFSC Code' />
                                    {
                                        isFormSubmitted && obj.ifsc === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Account Number</label>
                                    <input type="text" value={obj.accountNo} onChange={inputChange} name="accountNo" className='form-control hover:(bg-sky-10 border-b-orange-600)  w-full' placeholder='Enter Account Number' />
                                    {
                                        isFormSubmitted && obj.accountNo === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                <div>
                                    <label className='text-xl'>Bank Branch</label>
                                    <input type="text" value={obj.bankBranch} onChange={inputChange} name='bankBranch' className='form-control  hover:border-b-orange-600 hover:bg-sky-100 hover:bg-sky-100 w-full' placeholder='Enter Bank Branch' />
                                    {
                                        isFormSubmitted && obj.bankBranch === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                                <div>
                                    <label className='text-xl'>Salary</label>
                                    <input type="text" value={obj.salary} onChange={inputChange} name="salary" className='form-control inputStyle' placeholder='Enter Salary' />
                                    {
                                        isFormSubmitted && obj.salary === '' && <div className='text-danger'>This field is required</div>
                                    }
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-x-4 mt-4  '>
                                <div className='flex justify-evenly'>
                                    {obj.empId === 0 ?
                                        <button className='editButton' onClick={saveEmployee}>Add</button> :
                                        <button className='updateButton' onClick={updateEmployee}>Update</button>
                                    }
                                    <button className='resetButton' onClick={reset}>Reset</button>
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

// const [obj, setEmployeeObj] = useState({
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

// const inputChange = (event) => {
//     const { name, value } = event.target
//     setEmployeeObj((prevEmp) => ({ ...prevEmp, [name]: value }));
// }
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"
// className="border border-slate-300 py-3 hover:back"

 {/* <table className="w-[100%] table-auto rounded-lg border border-black"> 
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
                                
                                        {
                                        employeeList.map((employee, ind) =>
                                            <CommonTabel tabelData={employee} index={ind} editData={onEditEmployee} deleteData={deleteEmployee}  keyData={ dataKeys} />

                                        )}                             
                            </table>  */}
