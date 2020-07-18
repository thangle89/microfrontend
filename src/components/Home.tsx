import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return <div>Home Page
        <div>
            <Link to='/myModule'>My module</Link>
        </div>
    </div>;
}

export default Home;