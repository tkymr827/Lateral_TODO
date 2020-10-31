import React, { useContext } from 'react';
import { User } from '../layouts/app';
import Datatables from '../modules/datatables';

const Dashboard: React.FC = () => {
    const user = useContext(User);

    console.log('--dashboard--');
    console.log(user);
    console.log('----');

    return (
        <>
            <div className="top">
                <div className="mystatus">
                    <div className="mystatus_head">〇〇さんのTodo状況</div>
                    <ul className="mystatus_status">
                        <li>進行中〇〇件</li>
                        <li>完了〇〇件</li>
                        <li>期限切れ〇〇件</li>
                    </ul>
                </div>
                <div className="linklist"></div>
            </div>
            <div className="bottom">
                <div className="contents_title"></div>
                <Datatables />
            </div>
        </>
    );
};

export default Dashboard;
