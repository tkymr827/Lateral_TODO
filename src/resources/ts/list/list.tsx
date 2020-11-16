import React, { useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

// TODO 未実装なのでコメントアウト
// import { useLocation } from 'react-router-dom';
import DetaillModal from '../modules/detail_modal';
import columns from '../modules/datatables_columns';
import sentence from '../modules/alert_sentence';

const List: React.FC = () => {
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [selectDelete, setSelectDelete] = useState([] as any);

    // TODO 未実装なのでコメントアウト
    // const location = useLocation();

    const [datatable, setDatatable] = useState({
        columns,
        rows: [],
    });

    useEffect(() => {
        const getTodos = async () => {
            try {
                const response = await axios.get('/api/get_todos');
                const rows = response.data.map((todo: { [key: string]: string }) => ({
                    id: todo.id,
                    checkbox: <Form.Check value={todo.id} onClick={() => toggleCheck(todo.id)} />,
                    task_name: todo.task_name,
                    user_name: todo.user_name,
                    release: todo.release,
                    progress: todo.progress,
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

    const delTodos = async () => {
        if (confirm(sentence.select_delete))
            try {
                const response = await axios.post('/api/del_todos', {
                    selectDelete,
                });

                location.reload();
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
                        {/* TODO　検索は未実装なのでコメントアウト */}
                        {/* <Button variant="success">検索</Button> */}
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
