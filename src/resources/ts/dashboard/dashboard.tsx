import React, { useContext, useState, useEffect } from 'react';
import { User } from '../layouts/app';
import { MDBDataTableV5, MDBInput } from 'mdbreact';
// import Datatables from '../modules/datatables';
import axios from 'axios';

const initialState = {
    doing: 0,
    completed: 0,
    expired: 0,
};

const Dashboard: React.FC = () => {
    const user = useContext(User);
    const [taskcount, setTaskCount] = useState(initialState);
    console.log(user);
    const [datatable, setDatatable] = useState({
        columns: [
            {
                label: 'チェックボックス',
                field: 'checkbox',
                sort: 'disabled',
                width: 50,
            },
            {
                label: 'タスク名',
                field: 'task_name',
                sort: 'asc',
                width: 200,
            },
            {
                label: '投稿者名',
                field: 'user_name',
                sort: 'asc',
                width: 150,
            },
            {
                label: '公開範囲',
                field: 'release',
                sort: 'asc',
                width: 100,
            },
            {
                label: '進行度',
                field: 'progress',
                sort: 'asc',
                width: 100,
            },
            {
                label: '完了日',
                field: 'complete_date',
                sort: 'asc',
                width: 150,
            },
            {
                label: '達成日',
                field: 'achievement_date',
                sort: 'asc',
                width: 150,
            },
        ],
        rows: [],
    });

    useEffect(() => {
        const getTodos = async () => {
            try {
                const response = await axios.get('/api/get_todos', { params: { mytodo: true } });
                console.log(response.data);
                // const rows = response.data.todos.map((todo: { [key: string]: string }) => ({
                const rows = response.data.map((todo: { [key: string]: string }) => ({
                    checkbox: <MDBInput label="" type="checkbox" />,
                    task_name: todo.task_name,
                    user_name: todo.user_name,
                    release: todo.release,
                    // release: todo.release ? 'Private' : 'Public',
                    // progress: todo.progress,
                    progress: countProgress(todo.progress),
                    // progress: checkProgress(
                    //     todo.progress,
                    //     todo.achievement_date,
                    //     response.data.now
                    // ),
                    complete_date: todo.complete_date,
                    achievement_date: todo.achievement_date,
                }));

                setDatatable(state => ({ ...state, rows: rows }));
            } catch (error) {
                console.error(error);
            }
        };
        getTodos();
    }, []);

    // let test = 0;
    const countProgress = (progress: string) => {
        if (progress === '進行中') {
            setTaskCount(state => ({ ...state, doing: state.doing + 1 }));
        } else if (progress === '完了') {
            setTaskCount(state => ({ ...state, completed: state.completed + 1 }));
        } else {
            setTaskCount(state => ({ ...state, expired: state.expired + 1 }));
        }

        // test = progress === '期限切れ' ? test + 1 : test + 0;
        // console.log(test);
        return progress;
    };

    // const checkProgress = (progress: string, achievement_date: string, now: string) => {
    //     if (progress === '進行中' && achievement_date < now) {
    //         setTaskCount(state => ({ ...state, expired: taskcount.expired + 2 }));
    //         return '期限切れ';
    //     } else if (progress === '進行中') {
    //         setTaskCount(state => ({ ...state, doing: taskcount.doing + 1 }));
    //     } else {
    //         setTaskCount(state => ({ ...state, completed: taskcount.completed + 3 }));
    //     }
    //     return progress;
    // };

    return (
        <>
            <div className="top">
                <div className="mystatus">
                    <div className="mystatus_head">{user.name}さんのTodo状況</div>
                    <ul className="mystatus_status">
                        <li>進行中{taskcount.doing}件</li>
                        <li>完了{taskcount.completed}件</li>
                        <li>期限切れ{taskcount.expired}件</li>
                    </ul>
                </div>
                <div className="linklist"></div>
            </div>
            <div className="bottom">
                <div className="contents_title"></div>
                {/* <Datatables /> */}
                <MDBDataTableV5
                    className="datatables"
                    searchTop
                    searchBottom={false}
                    barReverse
                    hover
                    entries={10}
                    entriesOptions={[10, 20, 100]}
                    info={false}
                    paging={false}
                    scrollY
                    maxHeight="400px"
                    pagesAmount={4}
                    data={datatable}
                    checkboxFirstColumn={true}
                />
            </div>
        </>
    );
};

export default Dashboard;
