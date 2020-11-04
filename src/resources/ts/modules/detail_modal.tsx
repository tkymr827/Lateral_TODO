import React from 'react';
import { Button, Modal, Container, Row, Col } from 'react-bootstrap';

type Props = {
    show: boolean;
    onHide: any;
    data: any;
};

const DetailModal: React.FC<Props> = props => {
    // console.log('--props--');
    // console.log(props);
    // console.log('---');
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
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
                        <Col md={6}>編集者:{props.data.editor ? '' : props.data.user_name}</Col>
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
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailModal;
