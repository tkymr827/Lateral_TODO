import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Container, Form } from 'react-bootstrap';
import axios from 'axios';

const Setting: React.FC = () => {
    const [pass_value, setPassValue] = useState('');

    const changePassValue = (e: any) => {
        setPassValue(e.currentTarget.value);
    };

    const sendPass = () => {
        try {
            const response = axios.post('/api/change_pass', { pass_value });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="setting">
            <div className="setting_contents">
                <Accordion>
                    {/* TODO メールアドレス変更は未実装なのでコメントアウト */}
                    {/* <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                登録メールアドレスの変更
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Container>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="mail_adress">
                                        <Form.Label>メールアドレス変更</Form.Label>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Col md={8}>
                                        <Form.Control />
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="primary" href="/password/reset">
                                            変更
                                        </Button>
                                    </Col>
                                </Form.Row>
                            </Container>
                        </Accordion.Collapse>
                    </Card> */}
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                パスワードの変更
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Container>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="mail_adress">
                                        <Form.Label>パスワード変更</Form.Label>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Col md={8}>
                                        <Form.Control onChange={changePassValue} />
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="primary" onClick={sendPass}>
                                            変更
                                        </Button>
                                    </Col>
                                </Form.Row>
                            </Container>
                        </Accordion.Collapse>
                    </Card>
                    {/* TODO アカウント削除は未実装なのでコメントアウト */}
                    {/* <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                アカウント削除
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                            <Form.Row>
                                <Form.Group as={Col} controlId="del_account">
                                    <Form.Label>アカウント削除</Form.Label>
                                    <Col>
                                        <Button variant="danger">削除</Button>
                                    </Col>
                                </Form.Group>
                            </Form.Row>
                        </Accordion.Collapse>
                    </Card> */}
                </Accordion>
            </div>
        </div>
    );
};

export default Setting;
