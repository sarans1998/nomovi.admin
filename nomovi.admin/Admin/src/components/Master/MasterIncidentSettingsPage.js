import React, { useState, useEffect } from 'react'
import { faFileAlt, faPlus, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Dropdown from 'react-bootstrap/Dropdown';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

var userid = '1b6aa251-6707-4a72-baec-5b70cd0e094b';
var sessionid = 'c5f1b1d2-6f55-4050-9380-74ae37e7edca';
var incidentId = "";
const MasterIncidentSettingsPage = () => {
    const [posts, setPosts] = useState([]);
    // const yourDate = new Date();
    // const NewDate = moment().format('L');;
    // var cellEditProp = {
    //     mode: "click",
    //     blurToSave: true
    //   };
    useEffect(() => {
        axios.get('https://nomovi365-api.azurewebsites.net/api/AllMasterObjectMapping' + "MasterObject/" + incidentId + "/" + userid + "/" + sessionid)
            // axios.get('https://nomovi365-api.azurewebsites.net/api/MasterObject/')
            .then(res => {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },
        [])
    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <div className="m-custom-incident">
                        <Breadcrumb>
                            <Breadcrumb.Item>MasterIncident</Breadcrumb.Item>
                            <Breadcrumb.Item>MasterIncidentSettingsPage</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="add-report">
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <FontAwesomeIcon icon={faPlus} /> New
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/mastercomponents/masteraddfield"> <FontAwesomeIcon icon={faFileAlt} /> Fields</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div>
                                <button className="add-m-button"><FontAwesomeIcon icon={faFileExport} /> Export</button>
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Master Incident Fields</div>
                        </div>
                        <Container fluid>
                            <Row>
                                <Col sm={12}>
                                    <div className="table-set">
                                        <BootstrapTable data={posts} striped hover bordered={true}>
                                            <TableHeaderColumn isKey dataField='Caption' width="350" dataSort={true}>Caption</TableHeaderColumn>
                                            <TableHeaderColumn dataField='FieldType' width="150" dataSort={true}>FieldType</TableHeaderColumn>
                                            <TableHeaderColumn dataField='SortOrder' width="150" dataSort={true}>SortOrder</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Mandatory' width="150" dataSort={true}>Mandatory</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Visible' width="150" dataSort={true}>Visible</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Created' width="150" dataSort={true}>Created</TableHeaderColumn>
                                            <TableHeaderColumn dataField='CreatedBy' width="150" dataSort={true}>CreatedBy</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Modified' width="150" dataSort={true}>Modified</TableHeaderColumn>
                                            <TableHeaderColumn dataField='ModifiedBy' width="150" dataSort={true}>ModifiedBy</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container >
    )
}

export default MasterIncidentSettingsPage;
