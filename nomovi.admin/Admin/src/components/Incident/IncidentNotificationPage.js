import React from 'react'
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const IncidentNotificationPage = () => {
    let history = useHistory();
    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <div className="m-custom-incident">
                        <Breadcrumb>
                            <Breadcrumb.Item>Incident</Breadcrumb.Item>
                            <Breadcrumb.Item>IncidentNotificationPage</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="add-report">
                            <div>
                                <button className="add-m-button"><FontAwesomeIcon icon={faPlus} /> Create</button>
                            </div>
                            <div>
                                <button className="add-m-button" onClick={() => history.goBack()}><FontAwesomeIcon icon={faTimes} /> Close</button>
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Add Notification</div>
                        </div>
                        <Container fluid className="body-content">
                            <div className="form-group" >
                                <Row>
                                    <Col sm={2} className="input-label" >Notification Name</Col >
                                    <Col sm={10} className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="" />
                                    </Col>
                                </Row>
                            </div >
                            <div className="form-group" >
                                <Row>
                                    <Col sm={2} className="input-label" >To</Col >
                                    <Col sm={10} className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="" />
                                    </Col>
                                </Row>
                            </div >
                            <div className="form-group" >
                                <Row>
                                    <Col sm={2} className="input-label" >Subject</Col >
                                    <Col sm={10} className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="" />
                                    </Col>
                                </Row>
                            </div >
                            <div className="form-group" >
                                <Row>
                                    <Col sm={2} className="input-label" >Message</Col >
                                    <Col sm={10} className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="" />
                                    </Col>
                                </Row>
                            </div >
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}

export default IncidentNotificationPage
