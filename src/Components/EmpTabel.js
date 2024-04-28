import React from 'react';
import { rowColors } from '../Constants/Constants';

const EmpTabel = ({ tabelData, columns, editData, deleteData }) => {

        return (
                <>
                        <table className="tabel">
                                <thead>
                                        <tr className=" trHeading ">
                                                {

                                                        columns.map(item =>
                                                                <th className="tabelHadingCell ">{Object.values(item)}</th>
                                                        )

                                                }
                                                <th className="tabelHadingCell ">Action</th>
                                        </tr>
                                </thead>
                                <tbody>
                                        {
                                                tabelData.map((item, index) => {
                                                        return (<tr key={index + 1} className={`${rowColors[index % rowColors.length]}  hover:bg-pink-300 font-medium`}>
                                                                {
                                                                        columns.map((col, index) => {
                                                                                return (<td key={index + 1} className='tdTbodyCell'>{item[col]}</td>)

                                                                        })
                                                                }
                                                                <td className='tdTbodyCell '>
                                                                        <button className='editButton' onClick={() => editData(tabelData)}><i className="fa-solid fa-pen-to-square fa-xs"></i></button>
                                                                        <button className='deleteButton' onClick={() => deleteData(tabelData.Id)}><i className="fa-solid fa-trash-can fa-xs"></i></button>
                                                                </td>
                                                        </tr>)
                                                })
                                        }
                                </tbody>
                        </table>
                </>
        );
};

export default EmpTabel;

