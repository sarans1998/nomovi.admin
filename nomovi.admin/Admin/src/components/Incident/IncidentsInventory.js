import React, { useState, useEffect } from "react";
import { faFileExport, faPlus, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    Link,
} from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as moment from 'moment';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function editFormatter(cell, row) {
    return <a href="#">
        <FontAwesomeIcon icon={faPen} className="edit-button" />
    </a>;
}
function gotoLink(cell, row) {
    return <a href="#">

    </a>;
}

function deleteFormatter(cell, row) {
    return <FontAwesomeIcon icon={faTrashAlt} className="delete-button" onClick={() => this.handleDelete(row.isKey)} />
}


function dataCreatedBy(cell, row) {
    if (!cell) {
        return `${"" ? "-" : "-"}`;
    }
    else {
        return "";
    }
}
function dataModifiedBy(cell, row) {
    if (!cell) {
        return `${"" ? "-" : "-"}`;
    }
    else {
        return "";
    }
}
function dateFormatter(cell, any) {
    if (!cell) {
        return "";
    }
    return `${moment(cell).format("DD-MM-YYY") ? moment(cell).format("MM/DD/YYYY") : moment(cell).format("MM/DD/YYYY")}`;
}

function IncidentsInventory() {
    const [posts, setPosts] = useState([])
    var userid = '1b6aa251-6707-4a72-baec-5b70cd0e094b';
    var sessionid = 'fa613f21-ca1e-49c2-b215-56cb0bd1904b';
    var apiUrl = 'https://nomovi365-api.azurewebsites.net/api/' + "ObjectMapping" + "/" + userid + "/" + sessionid;
    useEffect(() => {
        axios.get(apiUrl)
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
                            <Breadcrumb.Item></Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="add-report">
                            <div>
                                <Link to="/incident/incidentaddpage"><button className="add-m-button"><FontAwesomeIcon icon={faPlus} /> Add</button></Link>
                            </div>
                            <div>
                                <button className="add-m-button"><FontAwesomeIcon icon={faFileExport} /> Export</button>
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Incident Inventory</div>
                        </div>
                        <Container fluid>
                            <Row>
                                <Col sm={12}>
                                    <div className="table-set">
                                        <BootstrapTable data={posts} striped hover bordered={true}>
                                            <TableHeaderColumn dataField='edit' width="50" dataFormat={editFormatter}></TableHeaderColumn>
                                            <TableHeaderColumn dataField='delete' width="50" dataFormat={deleteFormatter}></TableHeaderColumn>
                                            <TableHeaderColumn isKey dataField='IncidentName' dataSort={true} width="300">Incident Name</TableHeaderColumn>
                                            {/* <TableHeaderColumn dataField='Reportable'>Reportable</TableHeaderColumn> */}
                                            <TableHeaderColumn dataField='Created' width="150" dataFormat={dateFormatter} dataSort={true}>Created</TableHeaderColumn>
                                            <TableHeaderColumn dataField='CreatedBy' width="150" dataFormat={dataCreatedBy}>CreatedBy</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Modified' width="150" dataFormat={dateFormatter} dataSort={true}>Modified</TableHeaderColumn>
                                            <TableHeaderColumn dataField='ModifiedBy' width="150" dataFormat={dataModifiedBy}>ModifiedBy</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default IncidentsInventory

