import React, { useState, useEffect } from "react";
import { faFileExport, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as moment from 'moment';

function deleteFormatter(cell, row) {
    return <a href="#">
        <FontAwesomeIcon icon={faTrashAlt} className="delete-button" />
    </a>;
}

function UserType(cell, any) {
    if (cell == 1) {
        return "Admin";
    }
    else {
        return "User";
    }
    // return `${"true" ? "Yes" : "Yes" }`;

}
function dateFormatter(cell, any) {
    if (!cell) {
        return "";
    }
    return `${moment(cell).format("DD-MM-YYY") ? moment(cell).format("MM/DD/YYYY") : moment(cell).format("MM/DD/YYYY")}`;
}

function UserList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://nomovi365-api.azurewebsites.net/api/userdetails/')
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
                        <div className="add-report">
                            <div className="add-m-button">
                                <span><FontAwesomeIcon icon={faPlus} /></span> Save
                            </div>
                            <div className="add-m-button">
                                <span><FontAwesomeIcon icon={faFileExport} /></span> Export
                            </div>
                        </div>
                        <div className="table-title">
                            <div>User List</div>
                        </div>
                        <Container fluid className="body-content">
                            <div className="form-group" >
                                <Row>
                                    <Col sm={2} className="input-label" >Search User</Col >
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
                                    <Col sm={2} className="input-label" >Usertype</Col >
                                    <Col sm={10} className="input-group">
                                        <select id="usertype" className="form-control show-tick">
                                            <option value="1" selected="selected">Admin</option>
                                            <option value="2">User</option>
                                        </select>
                                    </Col>
                                </Row>
                            </div >
                        </Container>
                        <Container fluid>
                            <Row>
                                <Col sm={12}>
                                    <div className="table-set">
                                        <BootstrapTable data={posts} striped hover bordered={true}>
                                            <TableHeaderColumn dataField='delete' width="50" dataFormat={deleteFormatter}></TableHeaderColumn>
                                            <TableHeaderColumn isKey dataField='Nomovi_UserId' width="400" dataSort={true}>ID</TableHeaderColumn>
                                            <TableHeaderColumn dataField='DisplayName' width="150" dataSort={true}>Display Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='EmailAddress' width="150"dataSort={true}>Email Address</TableHeaderColumn>
                                            <TableHeaderColumn dataField='MobileNumber' width="150" dataSort={true}>Mobile Number</TableHeaderColumn>
                                            <TableHeaderColumn dataField='UserType' width="150" dataFormat={UserType} dataSort={true}>User Type</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Created' width="150" dataFormat={dateFormatter} dataSort={true}>Created</TableHeaderColumn>
                                        </BootstrapTable>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default UserList
