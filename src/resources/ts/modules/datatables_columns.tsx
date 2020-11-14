const columns = [
    {
        label: '',
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
        sort: 'disabled',
        width: 150,
    },
];

export default columns;
