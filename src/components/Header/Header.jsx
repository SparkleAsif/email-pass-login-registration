import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='bg-slate-800 text-white p-4 shadow-md'>
    <div className='container mx-auto flex justify-between items-center'>
        <div className='text-2xl font-bold'>
            <Link to="/">MyApp</Link>
        </div>
        <nav className='space-x-6'>
            <Link className='hover:text-sky-300 transition duration-300' to="/">Home</Link>
            <Link className='hover:text-sky-300 transition duration-300' to="/login">Login</Link>
            <Link className='hover:text-sky-300 transition duration-300' to="/register">Register</Link>
        </nav>
    </div>
</div>

    );
};

export default Header;