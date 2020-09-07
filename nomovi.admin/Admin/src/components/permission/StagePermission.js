import React, { useState, useEffect } from "react";
import { faFileExport, faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function deleteFormatter(cell, row) {
    return <a href="#">
        <FontAwesomeIcon icon={faTrashAlt} className="delete-button" />
    </a>;
}

function StagePermission() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('https://nomovi365-api.azurewebsites.net/api/StagePermission')
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
                                <span><FontAwesomeIcon icon={faPlus} /></span> Add
                            </div>
                            <div className="add-m-button">
                                <span><FontAwesomeIcon icon={faFileExport} /></span> Export
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Stage Permission</div>
                        </div>
                        <Container fluid className="body-content">
                            <div className="form-group" >
                                <Row>
                                    <Col sm={2} className="input-label" >Location</Col >
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
                                    <Col sm={2} className="input-label" >Incident</Col >
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
                                    <Col sm={2} className="input-label" >Stage</Col >
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
                                    <Col sm={2} className="input-label" >Username</Col >
                                    <Col sm={10} className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="" />
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
                                            <TableHeaderColumn isKey dataField='Location_Name' width="400" dataSort={true}>Location Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Incident_Name' dataSort={true}>Incident Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Stage_Name' dataSort={true}>Stage Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='User_Name' dataSort={true}>User Name</TableHeaderColumn>
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

export default StagePermission
