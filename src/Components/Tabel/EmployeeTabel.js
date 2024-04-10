import React from 'react';
import {rowColors } from '../../Constants/Constants';


const EmployeeTabel = ({employeeData, index, onEditData,onDeleteData}) => {
    return (
        <>
            <tr key={employeeData.empId} className={`${rowColors[index % rowColors.length]} hover:bg-pink-400 font-medium`}>
                <td className='border border-slate-300  text-black text-lg'>{index + 1}</td>
                <td className='border border-slate-300  text-black text-lg'>{employeeData.empName}</td>
                <td className='border border-slate-300  text-black text-lg'>{employeeData.empContactNo}</td>
                <td className='border border-slate-300  text-black text-lg'>{employeeData.empEmail}</td>
                <td className='border border-slate-300  text-black text-lg'>{employeeData.city}</td>
                <td className='border border-slate-300  text-black text-lg'>{employeeData.salary}</td>
                <td className='border border-slate-300  text-black text-lg'>
                    <button className='btn btn-sm btn-success m-2' onClick={() => onEditData(employeeData)}>Edit</button>
                    <button className='btn btn-sm btn-danger m-2' onClick={() => onDeleteData(employeeData.empId)}>Delete</button>
                </td>
            </tr>
        </>
    );
};

export default EmployeeTabel;