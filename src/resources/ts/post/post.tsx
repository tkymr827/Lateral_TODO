import React, { useState } from 'react';
import { Button, Container, Col, Form } from 'react-bootstrap';
import axios from 'axios';

const Post: React.FC = () => {
    return (
        <div className="post">
            <Form className="post_form">
                <Container>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>タスク名</Form.Label>
                            <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} className="post_form_content">
                            <Form.Label>タスク内容</Form.Label>
                            <Form.Control as="textarea" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>公開範囲</Form.Label>
                            <Form.Control as="select">
                                <option hidden>選択</option>
                                <option value="0">Public</option>
                                <option value="1">Private</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>進行度</Form.Label>
                            <Form.Control as="select">
                                <option hidden>選択</option>
                                <option value="進行中">進行中</option>
                                <option value="完了">完了</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="tododetail_unit">
                        <Form.Group as={Col}>
                            <Form.Label>達成日</Form.Label>
                            <Form.Control type="date" value="2020-11-12"></Form.Control>

                            {/* <input
                            type="date"
                            name="achievement_date"
                            id="achievement_date"
                            // value={form_value.achievement_date}
                            // onChange={changeFormValue}
                        /> */}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>完了日</Form.Label>
                            <Form.Control type="date" value="2020-01-01"></Form.Control>
                        </Form.Group>
                        {/* <Form.Group as={Col} controlId="complete_date">
                        <Form.Label>完了日</Form.Label>
                        <input
                            type="date"
                            name="complete_date"
                            id="complete_date"
                            // value={form_value.complete_date}
                            // onChange={changeFormValue}
                        />
                    </Form.Group> */}
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} className="post_btn">
                            <Button variant="primary" type="submit">
                                投稿
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Container>
            </Form>{' '}
        </div>
    );
};

export default Post;
