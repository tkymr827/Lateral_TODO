import React, { useState, useEffect } from 'react';
import { MDBDataTableV5, MDBInput } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import DetaillModal from '../modules/detail_modal';

const List: React.FC = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [selectDelete, setSelectDelete] = useState([] as any);
    // const [selectDelete, setSelectDelete] = useState([]);

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
                // const response = await axios.get('/api/get_todos', { params: { mytodo: false } });
                const response = await axios.get('/api/get_todos');
                console.log(response.data);
                const rows = response.data.map((todo: { [key: string]: string }) => ({
                    id: todo.id,
                    // checkbox: <MDBInput label="" type="checkbox" onClick={toggleCheck} />,
                    checkbox: <Form.Check value={todo.id} onClick={() => toggleCheck(todo.id)} />,
                    // checkbox: <Form.Check value={todo.id} onClick={toggleCheck} />,
                    task_name: todo.task_name,
                    user_name: todo.user_name,
                    release: todo.release,
                    progress: todo.progress,
                    complete_date: todo.complete_date,
                    achievement_date: todo.achievement_date,
                    content: todo.content,
                    editor: todo.editor,
                    // clickEvent: () => setModalShow(true),
                    // button: <Button variant="info" onClick={() => setModalShow(true)} />,
                    button: (
                        // <Button variant="info" onClick={() => setModalShow(true)}>
                        // <Button variant="info" onClick={() => handleClick(todo.id)}>
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
    // console.log('--check-');
    // console.log(datatable.rows);
    // console.log('---');

    let state: any = [];

    const toggleCheck = (id: any) => {
        console.log(id);
        // console.log(e.currentTarget.value);
        // console.log(typeof id);
        // console.log(id.currentTarget.value);
        // const select_id: any = id.currentTarget.value;

        // if (selectDelete.includes(select_id)) {
        // if (selectDelete.includes(select_id)) {
        //     console.log('既に入ってるよ');
        //     setSelectDelete(selectDelete.filter((value: any) => value !== select_id));
        // } else {
        //     console.log('なかったよ');
        //     setSelectDelete([...selectDelete, select_id]);
        // }

        // console.log(selectDelete.includes(id));
        // console.log(selectDelete.includes(1));

        // if (selectDelete.includes(id.currentTarget.value)) {
        //     // setSelectDelete('haitteruyo');
        //     // setSelectDelete(selectDelete.filter((value: any) => value !== id));
        //     // setSelectDelete((state:any) => [...state.filter(state) => state !==id])
        //     setSelectDelete(selectDelete.filter((item: any) => item !== id.currentTarget.value));
        // } else {
        //     // setSelectDelete([...selectDelete, id]);
        //     // setSelectDelete((state: any) => ({ ...state, id }));
        //     // setSelectDelete([id]);
        //     // setSelectDelete(id);
        //     // setSelectDelete('naiyo');
        //     // setSelectDelete(id);
        //     setSelectDelete((state: any) => [...state, id.currentTarget.value]);
        // }

        // let state;
        // if (selectDelete.includes(e.currentTarget.value)) {
        // let state: any = selectDelete;
        // let state: any = [];
        // state = selectDelete;
        // if (selectDelete.includes(id)) {
        if (state.includes(id)) {
            console.log('入ってるよ');
            // state = selectDelete.filter((item: any) => item !== id);
            state = state.filter((item: any) => item !== id);
        } else {
            console.log('入ってないよ');
            console.log(state);
            // console.log(id);
            // console.log(selectDelete);
            // setSelectDelete((state: any) => [...state, id]);
            // state = [...selectDelete, id];
            // state.push(...selectDelete, id);
            state.push(id);
            // setSelectDelete([...selectDelete, id]);
        }

        console.log(state);
        setSelectDelete(state);
    };

    const handleClick = (rows: any, id: string) => {
        // console.log(rows);
        // console.log(datatable.rows.map((data: { [key: string]: string }) => data.id == id));
        // console.log(datatable.rows.find((data: { [key: string]: string }) => data.id == id));

        // console.log(datatable.rows.find((e: any) => e.id == id));
        // console.log(rows.find((todo: { [key: string]: string }) => todo.id === id));
        // const hoge = datatable.rows.find(
        //     (todo: { [key: string]: string }) => todo.user_name == 'test'
        // );
        // const hoge = datatable.rows.find((e: any) => e.id == id);
        // console.log(hoge);

        // console.log('genmitu');

        // console.log(datatable.rows.find(data => data.id == id));
        // console.log(dessertList.find(dessert => dessert.name == 'チョコレート'))
        // setModalData(datatable)
        setModalData(rows.find((todo: { [key: string]: string }) => todo.id === id));
        setModalShow(true);
    };

    const delTodos = async () => {
        console.log(selectDelete);
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
            <div className="top"></div>
            <div className="bottom">
                <div className="bottom_menu">
                    <div className="bottom_menu_title">TODO一覧</div>
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
                    maxHeight="500px"
                    pagesAmount={4}
                    data={datatable}
                />
            </div>

            <DetaillModal show={modalShow} data={modalData} onHide={() => setModalShow(false)} />
        </>
    );
};

export default List;
