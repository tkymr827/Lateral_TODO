import React, { useContext, useState, useEffect } from 'react';
import { User } from '../layouts/app';
import { MDBDataTableV5, MDBInput } from 'mdbreact';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';

const initialState = {
    doing: 0,
    completed: 0,
    expired: 0,
};

const Dashboard: React.FC = () => {
    const user = useContext(User);
    const [taskcount, setTaskCount] = useState(initialState);
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
                const rows = response.data.map((todo: { [key: string]: string }) => ({
                    checkbox: <MDBInput label="" type="checkbox" />,
                    task_name: todo.task_name,
                    user_name: todo.user_name,
                    release: todo.release,
                    progress: countProgress(todo.progress),
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

    const countProgress = (progress: string) => {
        if (progress === '進行中') {
            setTaskCount(state => ({ ...state, doing: state.doing + 1 }));
        } else if (progress === '完了') {
            setTaskCount(state => ({ ...state, completed: state.completed + 1 }));
        } else {
            setTaskCount(state => ({ ...state, expired: state.expired + 1 }));
        }
        return progress;
    };

    return (
        <>
            <div className="top">
                <div className="mystatus">
                    <div className="mystatus_head">{user.name}さんのTodo状況</div>
                    <ul className="mystatus_status">
                        <li>
                            進行中<span>{taskcount.doing}件</span>
                        </li>
                        <li>
                            完了<span>{taskcount.completed}件</span>
                        </li>
                        <li>
                            期限切れ<span>{taskcount.expired}件</span>
                        </li>
                    </ul>
                </div>
                <div className="linklist">
                    <div className="linklist_content">
                        <div className="linklist_content-title">List</div>
                        <Link to="/link">
                            <Button className="linklist_content_btn" variant="info">
                                List
                            </Button>
                        </Link>
                    </div>
                    <div className="linklist_content">
                        <div className="linklist_content-title">POST</div>
                        <Link to="/post">
                            <Button className="linklist_content_btn" variant="info">
                                Post btn
                            </Button>
                        </Link>
                    </div>
                    <div className="linklist_content">
                        <div className="linklist_content-title">Setting</div>
                        <Link to="/setting">
                            <Button className="linklist_content_btn" variant="info">
                                Setting btn
                            </Button>
                        </Link>
                    </div>
                    <div className="linklist_content">
                        <div className="linklist_content-title">Sample</div>
                        <Button className="linklist_content_btn" variant="info">
                            sample btn
                        </Button>
                    </div>
                    <div className="linklist_content">
                        <div className="linklist_content-title">Setting</div>
                        <Button className="linklist_content_btn" variant="info">
                            sample btn
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="contents_title">自分のTODO一覧</div>
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
