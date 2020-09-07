import React, { useState, useEffect } from 'react'
import { faFileExport, faPlus, faPlusCircle, faListAlt, faShieldAlt, faEnvelope, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Dropdown from 'react-bootstrap/Dropdown'
import * as moment from 'moment';
import $ from "jquery";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function dateFormatter(cell, any) {
    if (!cell) {
        return "";
    }
    return `${moment(cell).format("DD-MM-YYY") ? moment(cell).format("MM/DD/YYYY") : moment(cell).format("MM/DD/YYYY")}`;
}
const IncidentSettingsPage = () => {
    const [posts, setPosts] = useState([])
    var userid = '1b6aa251-6707-4a72-baec-5b70cd0e094b';
    var sessionid = 'd2c9b97b-dabb-42fa-b45b-fcca69ee3226';
    var incidentId = "";
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return decodeURI(results[1]) || 0;
        }
    }
    incidentId = $.urlParam('Incident_id');
    // incidentId=incidentId.replace(/\/$/, "");
    useEffect(() => {
        axios.get('https://nomovi365-api.azurewebsites.net/api' + 'View/' + incidentId + '/' + userid + '/' + sessionid)
            .then(res => {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <div className="m-custom-incident">
                        <Breadcrumb>
                            <Breadcrumb.Item>Incident</Breadcrumb.Item>
                            <Breadcrumb.Item>IncidentSettingsPage</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="add-report">
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <FontAwesomeIcon icon={faPlus} /> New
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/incidentcomponents/incidentaddfield"> <FontAwesomeIcon icon={faFileAlt} /> Fields</Dropdown.Item>
                                        <Dropdown.Item href="/incidentcomponents/incidentviewpage"> <FontAwesomeIcon icon={faListAlt} /> Views</Dropdown.Item>
                                        <Dropdown.Item href="/incidentcomponents/incidentstagepage"> <FontAwesomeIcon icon={faShieldAlt} /> Stages</Dropdown.Item>
                                        <Dropdown.Item href="/incidentcomponents/incidentnotificationpage"> <FontAwesomeIcon icon={faEnvelope} /> Notification</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div>
                                <button className="add-m-button"><FontAwesomeIcon icon={faFileExport} /> Export</button>
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Incident Settings</div>
                        </div>
                        <div>
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <FontAwesomeIcon icon={faPlusCircle} className="icon-set" /> Fields
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <BootstrapTable data={posts} striped hover bordered={true}>
                                                <TableHeaderColumn isKey dataField='Caption' width="200" dataSort={true}>Caption</TableHeaderColumn>
                                                <TableHeaderColumn dataField='FieldType' width="150" dataSort={true} >Field Type</TableHeaderColumn>
                                                <TableHeaderColumn dataField='SortOrder' width="150" dataSort={true}>Sort Order</TableHeaderColumn>
                                                <TableHeaderColumn dataField='Mandatory' width="150" dataSort={true}>Mandatory</TableHeaderColumn>
                                                <TableHeaderColumn dataField='Visible' width="150" dataSort={true}>Visible</TableHeaderColumn>
                                                <TableHeaderColumn dataField='Created' width="150" dataFormat={dateFormatter} dataSort={true}>Created</TableHeaderColumn>
                                                <TableHeaderColumn dataField='CreatedBy' width="150" dataSort={true}>CreatedBy</TableHeaderColumn>
                                                <TableHeaderColumn dataField='Modified' width="150" dataSort={true}>Modified</TableHeaderColumn>
                                                <TableHeaderColumn dataField='ModifiedBy' width="150" dataSort={true}>ModifiedBy</TableHeaderColumn>
                                            </BootstrapTable>

                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        <FontAwesomeIcon icon={faPlusCircle} className="icon-set" /> Views
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>
                                            <BootstrapTable data={posts} striped hover bordered={true} >
                                                <TableHeaderColumn isKey dataField='Caption' width="300" dataSort={true}>View Name</TableHeaderColumn>
                                                <TableHeaderColumn dataField='FieldType' width="300" dataSort={true} >View Type</TableHeaderColumn>
                                                <TableHeaderColumn dataField='SortOrder' width="300" dataSort={true}>Default</TableHeaderColumn>

                                            </BootstrapTable>

                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="2">
                                        <FontAwesomeIcon icon={faPlusCircle} className="icon-set" /> Stages
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body>
                                            <BootstrapTable data={posts} striped hover bordered={true}>
                                                <TableHeaderColumn isKey dataField='Caption' width="200" dataSort={true}>Stage Name</TableHeaderColumn>

                                                <TableHeaderColumn dataField='SortOrder' width="300" dataSort={true}>Sort Order</TableHeaderColumn>

                                                <TableHeaderColumn dataField='Created' width="150" dataFormat={dateFormatter} dataSort={true}>Created</TableHeaderColumn>
                                                <TableHeaderColumn dataField='CreatedBy' width="150" dataSort={true}>CreatedBy</TableHeaderColumn>
                                                <TableHeaderColumn dataField='Modified' width="150" dataSort={true}>Modified</TableHeaderColumn>
                                                <TableHeaderColumn dataField='ModifiedBy' width="150" dataSort={true}>ModifiedBy</TableHeaderColumn>
                                            </BootstrapTable>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="3">
                                        <FontAwesomeIcon icon={faPlusCircle} className="icon-set" /> Notification
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body>
                                            <BootstrapTable data={posts} striped hover bordered={true} >
                                                <TableHeaderColumn isKey dataField='Caption' width="300" dataSort={true}>Notification Name</TableHeaderColumn>

                                                <TableHeaderColumn dataField='Created' width="150" dataFormat={dateFormatter} dataSort={true}>Created</TableHeaderColumn>
                                                <TableHeaderColumn dataField='CreatedBy' width="150" dataSort={true}>CreatedBy</TableHeaderColumn>
                                                <TableHeaderColumn dataField='Modified' width="150" dataSort={true}>Modified</TableHeaderColumn>
                                                <TableHeaderColumn dataField='ModifiedBy' width="150" dataSort={true}>ModifiedBy</TableHeaderColumn>
                                            </BootstrapTable>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default IncidentSettingsPage
