import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Container, Row, Col, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { User } from '../layouts/app';

type Props = {
    show: boolean;
    onHide: any;
    data: any;
};

const initialState = {
    task_name: '',
    release: '',
    progress: '',
    complete_date: '',
    achievement_date: '',
    content: '',
};

const DetailModal: React.FC<Props> = props => {
    const user = useContext(User);
    const [isEdit, setIsEdit] = useState(false);
    const [form_value, setFormValue] = useState(initialState);
    // const [form_value, setFormValue] = useState({
    //     id: props.data.id,
    //     task_name: '',
    //     editor: user.name,
    //     release: '',
    //     progress: '',
    //     complete_date: '',
    //     achievement_date: '',
    //     content: '',
    // });
    // const [achievement_date, setAchievementDate] = useState(props.data.achievement_date);
    // const [complete_date, setCompleteDate] = useState(props.data.complete_date);
    // const id = props.data.id;
    // console.log(`idは:${props.data.id}`);
    // console.log('--props--');
    // console.log(props);
    // console.log('---');

    // console.log('--form_value--');
    // console.log(form_value);
    // console.log('---');

    // useEffect(() => {
    //     setFormValue(state => ({ ...state, id: id, editor: user.name }));
    // }, []);
    console.log('-form_value-sotogawa');
    console.log(form_value);
    console.log('------------');

    const delTodo = async () => {
        try {
            const response = await axios.post('/api/del_todos', {
                selectDelete: props.data.id,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const editTodo = (e: any) => {
        console.log('');
        // e.preventDefault();
        console.log('edittodo username');
        console.log(user.name);
        console.log(props.data.id);
        // console.log(id);
        console.log('---');
        // setFormValue(state => ({
        //     ...state,
        //     // id: props.data.id,
        //     id: id,
        //     editor: user.name,
        //     // complete_date: complete_date,
        //     // achievement_date: achievement_date,
        // }));

        try {
            const response = axios.post('/api/edit_todos', {
                id: props.data.id,
                editor: user.name,
                form_value,
            });
        } catch (error) {
            console.log(error);
        }

        console.log('--edittodo--');
        console.log(form_value);
        console.log('----');
        e.preventDefault();
    };

    const changeFormValue = (e: any) => {
        // console.log(e.currentTarget);
        // console.log(e.currentTarget.value);
        // console.log(e.currentTarget.id);
        // e.persist();
        // e.persist();
        const value = e.currentTarget.value;
        const key = e.currentTarget.id;

        // setFormValue(state => ({ ...state, [e.currentTarget.id]: hoge }));
        setFormValue(state => ({ ...state, [key]: value }));
        // console.log(form_value);

        // setFormValue(state => ({ ...state, [e.currentTarget.id]: e.currentTarget.value }));
    };

    // const changeTaskName = (e: any) => {
    // const test = (e: any) => {
    //     console.log(e.currentTarget.value);
    //     let hoge = e.currentTarget.value;
    //     // setFormValue(state => ({ ...state, task_name: e.currentTarget.value }));
    //     setFormValue(state => ({ ...state, task_name: hoge }));
    //     console.log(form_value);
    // };

    // const changeAchievementDate = (date: any) => {
    //     setAchievementDate(date.target.value);
    //     const value = date.currentTarget.value;
    //     setFormValue(state => ({ ...state, achievement_date: value }));
    // };
    // const changeCompleteDate = (date: any) => {
    //     setCompleteDate(date.target.value);
    //     const value = date.currentTarget.value;

    //     setFormValue(state => ({ ...state, complete_date: value }));
    // };
    const handleEdit = () => {
        setIsEdit(state => !state);
        setFormValue(state => ({
            ...state,
            task_name: props.data.task_name,
            content: props.data.content,
            release: props.data.release,
            progress: props.data.progress,
            achievement_date: props.data.achievement_date,
            complete_date: props.data.complete_date,
        }));
    };

    return (
        <>
            {isEdit ? (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                >
                    <Form onSubmit={editTodo}>
                        {/* <Modal.Header closeButton> */}
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <Form.Group controlId="task_name">
                                    <Form.Label>タスク名</Form.Label>
                                    <Form.Control
                                        // defaultValue={props.data.task_name}
                                        defaultValue={form_value.task_name}
                                        onChange={changeFormValue}
                                    />
                                </Form.Group>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                            <Container className="tododetail">
                                <Form.Row className="tododetail_content">
                                    <FormGroup as={Col} controlId="content">
                                        <Form.Label>タスク内容</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            // defaultValue={props.data.content}
                                            defaultValue={form_value.content}
                                            onChange={changeFormValue}
                                        />
                                    </FormGroup>
                                </Form.Row>
                                <Form.Row className="tododetail_unit">
                                    <Col md={6}>投稿者:{props.data.user_name}</Col>
                                    <Col md={6}>編集者:{user.name}</Col>
                                </Form.Row>
                                <Form.Row className="tododetail_unit">
                                    <Form.Group as={Col} controlId="release">
                                        {/* <Col md={6}> */}
                                        <Form.Label>公開範囲</Form.Label>
                                        <Form.Control as="select" onChange={changeFormValue}>
                                            <option hidden>選択</option>
                                            <option value="0">Public</option>
                                            <option value="1">Private</option>
                                        </Form.Control>
                                        {/* </Col> */}
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="progress">
                                        {/* <Col md={6}> */}
                                        <Form.Label>進行度</Form.Label>
                                        <Form.Control as="select" onChange={changeFormValue}>
                                            <option hidden>選択</option>
                                            <option value="進行中">進行中</option>
                                            <option value="完了">完了</option>
                                        </Form.Control>
                                        {/* </Col> */}
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row className="tododetail_unit">
                                    <Form.Group as={Col} controlId="achievement_date">
                                        {/* <Col md={6}>達成日:{props.data.achievement_date}</Col> */}
                                        {/* <Col md={6}> */}
                                        <Form.Label>達成日</Form.Label>
                                        <input
                                            type="date"
                                            name="achievement_date"
                                            id="achievement_date"
                                            value={form_value.achievement_date}
                                            // value={achievement_date}
                                            // onChange={() => changeAchievementDate}
                                            onChange={changeFormValue}
                                        />
                                        {/* </Col> */}
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="complete_date">
                                        {/* <Col md={6}> */}
                                        <Form.Label>完了日</Form.Label>
                                        <input
                                            type="date"
                                            name="complete_date"
                                            id="complete_date"
                                            value={form_value.complete_date}
                                            // value={complete_date}
                                            // onChange={() => changeCompleteDate}
                                            onChange={changeFormValue}
                                        />
                                        {/* </Col> */}
                                        {/* <Col md={6}>完了日:{props.data.complete_date}</Col> */}
                                    </Form.Group>
                                </Form.Row>
                            </Container>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="modal_btn"
                                variant="secondary"
                                onClick={() => setIsEdit(state => !state)}
                            >
                                戻る
                            </Button>
                            {/* <Button
                                className="modal_btn"
                                variant="danger"
                                onClick={() => delTodo()}
                            >
                                削除
                            </Button> */}
                            <Button className="modal_btn" type="submit" variant="primary">
                                編集完了
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            ) : (
                <Modal
                    {...props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            タスク名:{props.data.task_name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container className="tododetail">
                            <Row className="tododetail_content">
                                <h4>タスク内容</h4>
                                <Col md={12}>{props.data.content}</Col>
                            </Row>
                            <Row className="tododetail_unit">
                                <Col md={6}>投稿者:{props.data.user_name}</Col>
                                <Col md={6}>
                                    編集者:
                                    {props.data.editor ? props.data.editor : props.data.user_name}
                                </Col>
                            </Row>
                            <Row className="tododetail_unit">
                                <Col md={6}>公開:{props.data.release}</Col>
                                <Col md={6}>進行度:{props.data.progress}</Col>
                            </Row>
                            <Row className="tododetail_unit">
                                <Col md={6}>達成日:{props.data.achievement_date}</Col>
                                <Col md={6}>完了日:{props.data.complete_date}</Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="modal_btn" variant="secondary" onClick={props.onHide}>
                            閉じる
                        </Button>
                        <Button className="modal_btn" variant="danger" onClick={() => delTodo()}>
                            削除
                        </Button>
                        <Button
                            className="modal_btn"
                            variant="primary"
                            // onClick={() => setIsEdit(state => !state)}
                            onClick={handleEdit}
                        >
                            編集
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default DetailModal;
