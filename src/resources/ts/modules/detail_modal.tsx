import React, { useState, useContext } from 'react';
import { Button, Modal, Container, Row, Col, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { User } from '../layouts/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sentence from '../modules/alert_sentence';

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
    const notify = (text: any) => toast(text);

    const delTodo = async () => {
        if (confirm(sentence.delete)) {
            try {
                const response = await axios.post('/api/del_todos', {
                    selectDelete: props.data.id,
                });

                location.reload();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const editTodo = async (e: any) => {
        if (confirm(sentence.edit)) {
            try {
                const response = await axios.post('/api/edit_todos', {
                    id: props.data.id,
                    editor: user.name,
                    form_value,
                });

                location.reload();
            } catch (error) {
                notify(sentence.error);
                console.log(error);
            }
        }

        e.preventDefault();
    };

    const changeFormValue = (e: any) => {
        const value = e.currentTarget.value;
        const key = e.currentTarget.id;

        setFormValue(state => ({ ...state, [key]: value }));
    };

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
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                {/* <Container>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="task_name">
                                            <Form.Label>タスク名</Form.Label>
                                            <Form.Control
                                                as="input"
                                                defaultValue={form_value.task_name}
                                                onChange={changeFormValue}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                </Container> */}
                                編集
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="show-grid">
                            <Container className="tododetail">
                                <Form.Row className="tododetail_content">
                                    <Form.Group as={Col} controlId="task_name">
                                        <Form.Label>
                                            タスク名<span className="caution">※必須</span>
                                        </Form.Label>
                                        <Form.Control
                                            as="input"
                                            defaultValue={form_value.task_name}
                                            onChange={changeFormValue}
                                            required
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row className="tododetail_content">
                                    <FormGroup as={Col} controlId="content">
                                        <Form.Label>
                                            タスク内容<span className="caution">※必須</span>
                                        </Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            defaultValue={form_value.content}
                                            onChange={changeFormValue}
                                            required
                                        />
                                    </FormGroup>
                                </Form.Row>
                                <Form.Row className="tododetail_unit">
                                    <Col md={6}>投稿者:{props.data.user_name}</Col>
                                    <Col md={6}>編集者:{user.name}</Col>
                                </Form.Row>
                                <Form.Row className="tododetail_unit">
                                    <Form.Group as={Col} controlId="release">
                                        <Form.Label>
                                            公開範囲<span className="caution">※必須</span>
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={changeFormValue}
                                            required
                                        >
                                            <option hidden>選択</option>
                                            <option value="0">Public</option>
                                            <option value="1">Private</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="progress">
                                        <Form.Label>
                                            進行度<span className="caution">※必須</span>
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={changeFormValue}
                                            required
                                        >
                                            <option hidden>選択</option>
                                            <option value="進行中">進行中</option>
                                            <option value="完了">完了</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row className="tododetail_unit">
                                    <Form.Group as={Col} controlId="achievement_date">
                                        <Form.Label>
                                            達成日<span className="caution">※必須</span>
                                        </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={form_value.achievement_date}
                                            onChange={changeFormValue}
                                            required
                                        ></Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="complete_date">
                                        <Form.Label>完了日</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={form_value.complete_date}
                                            onChange={changeFormValue}
                                        ></Form.Control>
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
                            {/* タスク名:{props.data.task_name} */}
                            詳細
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-grid">
                        <Container className="tododetail">
                            <Row className="tododetail_content">
                                <h1>タスク名:</h1>
                                <Col md={12}>{props.data.task_name}</Col>
                            </Row>
                            <Row className="tododetail_content">
                                <h1>タスク内容</h1>
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
                        <Button className="modal_btn" variant="primary" onClick={handleEdit}>
                            編集
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            <ToastContainer />
        </>
    );
};

export default DetailModal;
