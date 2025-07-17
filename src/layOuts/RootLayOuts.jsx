
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';

const RootLayOuts = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayOuts;