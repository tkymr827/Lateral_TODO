import React, { useContext, useState, useEffect } from 'react';
import { User } from '../layouts/app';
import { MDBDataTableV5, MDBInput } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import DetaillModal from '../modules/detail_modal';

const initialState = {
    doing: 0,
    completed: 0,
    expired: 0,
};

const Dashboard: React.FC = () => {
    const user = useContext(User);
    const [taskcount, setTaskCount] = useState(initialState);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [selectDelete, setSelectDelete] = useState([] as any);

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
                label: '達成日',
                field: 'achievement_date',
                sort: 'asc',
                width: 150,
            },
            {
                label: '完了日',
                field: 'complete_date',
                sort: 'asc',
                width: 150,
            },
            {
                label: '詳細',
                field: 'button',
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
                const rows = response.data.map((todo: { [key: string]: string }) => ({
                    id: todo.id,
                    checkbox: <Form.Check value={todo.id} onClick={() => toggleCheck(todo.id)} />,
                    task_name: todo.task_name,
                    user_name: todo.user_name,
                    release: todo.release,
                    progress: countProgress(todo.progress),
                    complete_date: todo.complete_date,
                    achievement_date: todo.achievement_date,
                    content: todo.content,
                    editor: todo.editor,
                    button: (
                        <Button variant="info" onClick={() => handleClick(rows, todo.id)}>
                            詳細
                        </Button>
                    ),
                }));

                setDatatable(state => ({ ...state, rows: rows }));
            } catch (error) {
                console.error(error);
            }
        };
        getTodos();
    }, []);

    let state: any = [];

    const toggleCheck = (id: any) => {
        if (state.includes(id)) {
            state = state.filter((item: any) => item !== id);
        } else {
            state.push(id);
        }
        setSelectDelete(state);
    };

    const handleClick = (rows: any, id: string) => {
        setModalData(rows.find((todo: { [key: string]: string }) => todo.id === id));
        setModalShow(true);
    };

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

    const delTodos = async () => {
        try {
            const response = await axios.post('/api/del_todos', {
                selectDelete,
            });
        } catch (error) {
            console.error(error);
        }
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
                        <Link to="/list">
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
                <div className="bottom_menu">
                    <div className="bottom_menu_title">自分のTODO一覧</div>
                    <div className="bottom_menu_button_group">
                        <Button variant="success">検索</Button>
                        <Button variant="danger" onClick={delTodos}>
                            選択削除
                        </Button>
                    </div>
                </div>
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

            <DetaillModal show={modalShow} data={modalData} onHide={() => setModalShow(false)} />
        </>
    );
};

export default Dashboard;
