import React, { useContext, useState, useEffect } from 'react';
import { User } from '../layouts/app';
import Datatables from '../modules/datatables';
import axios from 'axios';

const initialState = {
    task_name: '',
    user_name: '',
    release: '',
    progress: '',
    complete_date: '',
    achievement_date: '',
};

const Dashboard: React.FC = () => {
    const user = useContext(User);
    const [todos, setTodos] = useState(initialState);

    const [state, setState] = useState('');
    // const [todos, setTodos] = useState([]);

    // console.log('--dashboard--');
    // console.log(user);
    // console.log('----');

    // useEffect(() => {
    //     const getTodos = async () => {
    //         try {
    //             // const response = await axios.post('/api/get_todos', { test: true });
    //             const response = await axios.get('/api/get_todos', {
    //                 params: {
    //                     mytodo: true,
    //                 },
    //             });
    //             // const response = await axios.get('/api/get_todos');
    //             console.log('--response--');
    //             console.log(response);
    //             console.log('----');
    //             setTodos(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     getTodos();
    // }, []);

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
