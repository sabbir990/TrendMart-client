import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to={'/'} className="text-4xl font-extrabold font-mocondo text-purple-600">
            TrendMart
        </Link>
    );
};

export default Logo;
