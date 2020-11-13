import React from 'react';
import { Accordion, Button, Card, Col, Container, Form } from 'react-bootstrap';

const Setting: React.FC = () => {
    return (
        <div className="setting">
            <div className="setting_contents">
                <Accordion defaultActiveKey="0">
                    <Card>
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
                                        <Button variant="primary">変更</Button>
                                    </Col>
                                </Form.Row>
                            </Container>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                アカウント削除
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Form.Row>
                                <Form.Group as={Col} controlId="del_account">
                                    <Form.Label>アカウント削除</Form.Label>
                                    <Col>
                                        <Button variant="danger">削除</Button>
                                    </Col>
                                </Form.Group>
                            </Form.Row>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    );
};

export default Setting;
