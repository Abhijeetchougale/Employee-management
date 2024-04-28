import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        
        <>
            <nav className="navbar navbar-expand-lg navbar-light flex justify-between bg-sky-200">
                <span className='text-3xl font-bold text-white px-4 py-2 bg-sky-600 rounded-md' >Employee Details</span>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active text-2xl font-bold">
                        <Link className="nav-link bg-blue-500 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded" to="/">Employee </Link>
                    </li>
                    <li className="nav-item text-2xl font-bold">
                        <Link className="nav-link bg-blue-500 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded" to="/Attendence">Attendence</Link>
                    </li>
                    <li className="nav-item text-2xl font-bold">
                        <Link className="nav-link bg-blue-500 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded" to="/Advance">Advance</Link>
                    </li>
                    <li className="nav-item text-2xl font-bold">
                        <Link className="nav-link bg-blue-500 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded" to="/Leave">Leave</Link>
                    </li>
                    <li className="nav-item text-2xl font-bold">
                        <Link className="nav-link bg-blue-500 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded" to="/Salary">Salary</Link>
                    </li>
                </ul>
            </nav>

        </>
    );
};

export default Navbar;