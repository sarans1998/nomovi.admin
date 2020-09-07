import React from 'react'
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { withRouter } from "react-router-dom";


class MasterAddField extends React.Component {

    handleClose = e => {
        this.props.history.goBack();
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident">
                            <Breadcrumb>
                                <Breadcrumb.Item>MasterIncident</Breadcrumb.Item>
                                <Breadcrumb.Item>MasterAddField</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="add-report">
                                <div>
                                    <button className="add-m-button"><FontAwesomeIcon icon={faPlus} /> Create</button>
                                </div>
                                <div>
                                    <button className="add-m-button" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes} /> Close</button>
                                </div>
                            </div>
                            <div className="table-title">
                                <div>Master Incident Add Field</div>
                            </div>
                            <Container fluid className="body-content">
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >System Name</Col>
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
                                        <Col sm={2} className="input-label" >Caption</Col>
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
                                        <Col sm={2} className="input-label" >Field Type</Col>
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
                                        <Col sm={2} className="input-label" >Mandatory</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Visible</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >ReadOnly</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Span</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Notification</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Chart</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Reportable</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Lookup Name</Col>
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
}

export default withRouter(MasterAddField);

