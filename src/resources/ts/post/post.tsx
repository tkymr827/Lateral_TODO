import React, { useState } from 'react';
import { Button, Container, Col, Form } from 'react-bootstrap';
import axios from 'axios';

const initialState = {
    task_name: '',
    release: '',
    progress: '',
    complete_date: '',
    achievement_date: '',
    content: '',
};

const Post: React.FC = () => {
    const [post_value, setPostValue] = useState(initialState);

    const addTodo = (e: any) => {
        try {
            const response = axios.post('/api/add_todos', {
                post_value,
            });
        } catch (error) {
            console.log(error);
        }

        e.preventDefault();
    };

    const changePostValue = (e: any) => {
        const value = e.currentTarget.value;
        const key = e.currentTarget.id;

        setPostValue(state => ({ ...state, [key]: value }));
    };

    return (
        <div className="post">
            <Form className="post_form" onSubmit={addTodo}>
                <Container>
                    <Form.Row>
                        <Form.Group as={Col} controlId="task_name">
                            <Form.Label>タスク名</Form.Label>
                            <Form.Control onChange={changePostValue} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} className="post_form_content" controlId="content">
                            <Form.Label>タスク内容</Form.Label>
                            <Form.Control as="textarea" onChange={changePostValue} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="release">
                            <Form.Label>公開範囲</Form.Label>
                            <Form.Control as="select" onChange={changePostValue}>
                                <option hidden>選択</option>
                                <option value="0">Public</option>
                                <option value="1">Private</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="progress">
                            <Form.Label>進行度</Form.Label>
                            <Form.Control as="select" onChange={changePostValue}>
                                <option hidden>選択</option>
                                <option value="進行中">進行中</option>
                                <option value="完了">完了</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="achievement_date">
                            <Form.Label>達成日</Form.Label>
                            <Form.Control type="date" onChange={changePostValue}></Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="complete_date">
                            <Form.Label>完了日</Form.Label>
                            <Form.Control type="date" onChange={changePostValue}></Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} className="post_btn">
                            <Button variant="primary" type="submit">
                                投稿
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Container>
            </Form>
        </div>
    );
};

export default Post;
