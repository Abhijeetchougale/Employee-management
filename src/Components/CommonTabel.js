import React from 'react';
import { rowColors } from '../Constants/Constants';

const CommonTabel = (props) => {
console.log(props)
    const { tabelData, index, editData, deleteData , keyData} = props;
    return (
        <>
             <tbody>
                    {
                        tabelData.empId !== undefined && 
                        (
                        <tr key={tabelData.tabelId} className={`${rowColors[index % rowColors.length]}  hover:bg-pink-300 font-medium`}>                        
                            <td className='border border-slate-300 text-black text-lg'>{index + 1}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empName}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empContactNo} </td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empEmail} </td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.city}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.salary}</td>
                            <td className='border border-slate-300 text-black text-lg '>
                                <button className='py-1 px-1 rounded bg-green-600 hover:bg-green-300 mx-3' onClick={() => editData(tabelData)}><i class="fa-solid fa-pen-to-square fa-xs"></i></button>
                                <button className='py-1 px-1 rounded bg-red-600 hover:bg-red-300' onClick={() => deleteData(tabelData.advanceId)}><i class="fa-solid fa-trash-can fa-xs"></i></button>
                            </td>
                        </tr>
                        )
                    }
                    
                    {
                        tabelData.attendanceId !==undefined && 
                       ( <tr key={tabelData.tabelId} className={`${rowColors[index % rowColors.length]}  hover:bg-pink-300 font-medium`}>
                            <td className='border border-slate-300 text-black text-lg'>{index + 1}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empName}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empContactNo}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.inTime}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.outTime}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.isFullDay ? "present" : "absent"}</td>
                            <td className='border border-slate-300 text-black text-lg '>
                                <button className='py-1 px-1 rounded bg-green-600 hover:bg-green-300 mx-3' onClick={() => editData(tabelData)}><i class="fa-solid fa-pen-to-square fa-xs"></i></button>
                                <button className='py-1 px-1 rounded bg-red-600 hover:bg-red-300' onClick={() => deleteData(tabelData.advanceId)}><i class="fa-solid fa-trash-can fa-xs"></i></button>
                            </td>
                        </tr>)
                    }

                   { 
                        tabelData.advanceId !==undefined && 
                       ( <tr key={tabelData.tabelId} className={`${rowColors[index % rowColors.length]}  hover:bg-pink-300 font-medium`}>
                             <td className='border border-slate-300 text-black text-lg'>{index + 1}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.employeeId}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empName}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empContactNo}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.advanceDate}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.advanceAmount}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.reason}</td>
                            <td className='border border-slate-300 text-black text-lg '>
                                <button className='py-1 px-1 rounded bg-green-600 hover:bg-green-300 mx-3' onClick={() => editData(tabelData)}><i class="fa-solid fa-pen-to-square fa-xs"></i></button>
                                <button className='py-1 px-1 rounded bg-red-600 hover:bg-red-300' onClick={() => deleteData(tabelData.advanceId)}><i class="fa-solid fa-trash-can fa-xs"></i></button>
                            </td>
                        </tr>)
                    }
                    {
                         tabelData.leaveId !==undefined && 
                        ( <tr key={tabelData.tabelId} className={`${rowColors[index % rowColors.length]}  hover:bg-pink-300 font-medium`}>
                            <td className='border border-slate-300 text-black text-lg'>{index + 1}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empName}</td>
                            <td className='border border-slate-300 text-black text-lg' >{tabelData.leaveDate}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.noOfFullDayLeaves}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.noOfHalfDayLeaves}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.leaveReason}</td>
                        
                            <td className='border border-slate-300 text-black text-lg '>
                                <button className='py-1 px-1 rounded bg-green-600 hover:bg-green-300 mx-3' onClick={() => editData(tabelData)}><i class="fa-solid fa-pen-to-square fa-xs"></i></button>
                                <button className='py-1 px-1 rounded bg-red-600 hover:bg-red-300' onClick={() => deleteData(tabelData.advanceId)}><i class="fa-solid fa-trash-can fa-xs"></i></button>
                            </td>
                        </tr>)
                    }

                    {
                         tabelData.salaryId !==undefined && 
                        ( <tr key={tabelData.tabelId} className={`${rowColors[index % rowColors.length]}  hover:bg-pink-300 font-medium`}>
                            <td className='border border-slate-300 text-black text-lg'>{index + 1}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.empName}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.salaryDate}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.totalAdvance}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.presentDays}</td>
                            <td className='border border-slate-300 text-black text-lg'>{tabelData.salaryAmount}</td>
                            <td className='border border-slate-300 text-black text-lg '>
                                <button className='py-1 px-1 rounded bg-green-600 hover:bg-green-300 mx-3' onClick={() => editData(tabelData)}><i class="fa-solid fa-pen-to-square fa-xs"></i></button>
                                <button className='py-1 px-1 rounded bg-red-600 hover:bg-red-300' onClick={() => deleteData(tabelData.advanceId)}><i class="fa-solid fa-trash-can fa-xs"></i></button>
                            </td>
                        </tr>)
                    }

                    
                
            </tbody> 

         
        </>
    );
};

export default CommonTabel;


