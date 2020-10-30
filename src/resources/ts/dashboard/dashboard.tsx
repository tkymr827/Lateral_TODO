import React, { useContext } from 'react';
import { User } from '../layouts/app';

const Dashboard: React.FC = () => {
    const user = useContext(User);

    console.log('--dashboard--');
    console.log(user);
    console.log('----');

    return (
        <>
            <div className="top">
                <div className="mystatus"></div>
                <div className="linklist"></div>
            </div>
            <div className="bottom"></div>
        </>
    );
};

export default Dashboard;
