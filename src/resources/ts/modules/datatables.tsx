import React, { useState, useEffect } from 'react';
import { MDBDataTableV5, MDBInput } from 'mdbreact';
import axios from 'axios';

// type Props = {
//     todos: {
//         task_name: string;
//         user_name: string;
//         release: string;
//         progress: string;
//         complete_date: string;
//         achievement_date: string;
//     };
// };

// type Props = {
//     setState: () => void;
// };

// type Props = {
//     state: {
//         in_progress: string;
//         completed: string;
//         expired: string;
//     };
//     // state: () => void;
// };

const DataTables: React.FC = () => {
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
                const response = await axios.get('/api/get_todos');
                const rows = response.data.map((todo: { [key: string]: string }) => ({
                    checkbox: <MDBInput label="" type="checkbox" />,
                    task_name: todo.task_name,
                    user_name: todo.user_name,
                    release: todo.release,
                    progress: todo.progress,
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

    return (
        <>
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
        </>
    );
};
export default DataTables;
