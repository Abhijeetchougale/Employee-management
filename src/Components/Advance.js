import React, { useEffect,useState } from 'react';
import { getData, postData, updateData, deleteData } from '../Services/Service';
import useEmployeeData from '../Utility/useEmployeeData';
import useInputChange from '../Utility/useInputChange';
import EmpTabel from './EmpTabel';

const Advance = () => {

    const [advanceList, setAdvanceList] = useState([]);

    const { employeeList } = useEmployeeData();

    const header=['employeeId','advanceDate','advanceAmount','reason']

    const { obj, inputChange, setObj, reset } = useInputChange(
        {
            "advanceId": 0,
            "employeeId": 0,
            "advanceDate": "",
            "advanceAmount": 0,
            "reason": ""
        }
    )

    const getURL_END = 'GetAllAdvance';
    const endPOST_URL = 'AddAdvance';
    const endUPDATE_URL = 'UpdateAdvance';
    const endDELETE_URL = 'DeleteAdvanceById?advanceid=';

    useEffect(() => {
        getAdvance();
    },[])

    const handleApiError = (error) => {
        console.error('API error:', error);
        alert('An error occurred. Please try again.');
    };

    const handleApiResult = (result) => {
        if (result.result) {
            alert(result.message);
            getAdvance();
            reset();
        } else {
            alert(result.message);
        }
    };

//**************************GET DATA***********************/
   const getAdvance = () => {
    getData(getURL_END)
    .then((result) => setAdvanceList(result))
    .catch(handleApiError);
    }

//***************************CREATE DATA********************/
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


    return (
        <>
            <div className='container-fluid mx-auto px-4 w-[100%]'>
                <div className='row mt-3'>
                    <div className='col-md-8 '>
                        <div>
                            <div className='rounded py-3  text-2xl font-bold bg-green-300'>
                                Advance Data
                            </div>
                            <div className='rounded-lg'>
                                <EmpTabel tabelData={advanceList} editData={onEdit} deleteData={onDeleteAdvance} columns={header}/>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='card'>
                            <div className='py-3 text-2xl bg-green-300 font-bold'>
                                Advance
                            </div>
                            <div className='card-body  bg-indigo-200 '>
                                <div className='grid grid-cols-2 gap-x-4'>
                                    <div>
                                        <label className='text-xl'>Employee Id</label>
                                        <select name="employeeId" value={obj.employeeId} onChange={inputChange} className='form-select inputStyle'>
                                        <option>Select Employee</option>
                                            {employeeList.map((employee) => (
                                                <option key={employee.empId} value={employee.empId}>{employee.empName}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className='text-xl'>Advance Date</label>
                                        <input type="date" value={obj.advanceDate} onChange={inputChange} name='advanceDate' className='form-control inputStyle' />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-x-4 mt-4'>
                                    <div>
                                        <label className='text-xl'>Advance Amount</label>
                                        <input type="text" value={obj.advanceAmount} onChange={inputChange} name="advanceAmount" className='form-control inputStyle' placeholder='Enter Amount' />
                                    </div>
                                    <div>
                                        <label className='text-xl'>Reason</label>
                                        <input type="text" value={obj.reason} onChange={inputChange} name="reason" className='form-control inputStyle' />
                                    </div>
                                </div>
                                
                                <div className='grid grid-cols-1 gap-x-4 mt-4  '>
                                <div className='flex justify-evenly'>
                                    {obj.advanceId === 0 ?
                                        <button className='editButton' onClick={onaddAdvance}>Add</button> :
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
  {/* <table className="w-[100%] table-auto rounded-lg border border-black">
                                    <thead>
                                        <tr className=" text-2xl hover:bg-slate-600 bg-gray-400 ">
                                            <th className="border border-slate-300 py-3">Sr.No</th>
                                            <th className="border border-slate-300 py-3">Employee Id</th>
                                            <th className="border border-slate-300 py-3">Name</th>
                                            <th className="border border-slate-300 py-3">Contact No</th>
                                            <th className="border border-slate-300 py-3">Advance Data</th>
                                            <th className="border border-slate-300 py-3">Advance Amount</th>
                                            <th className="border border-slate-300 py-3">Reason</th>
                                            <th className="border border-slate-300 py-3 ">Action</th>
                                        </tr>
                                    </thead>
                                        {
                                        advanceList.map((advanceItem, ind) =>
                                            <CommonTabel tabelData={advanceItem} index={ind} editData={onEdit} deleteData={onDeleteAdvance} />

                                        )}

                                </table> */}