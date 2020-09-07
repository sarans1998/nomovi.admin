import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as moment from 'moment';
import Container from 'react-bootstrap/Container'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactTable from 'react-table-v6'

class AuditLog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const masterincidentapi = 'https://nomovi365-api.azurewebsites.net/api/AuditLog';
        fetch(masterincidentapi, {
            method: "GET"
        }).then(response => response.json()).then(posts => {
            this.setState({ posts: posts })
        })
    };

    render() {
        const columns = [
    
            {
                Header: "Id",
                accessor: "Id",
                sortable: true,
                filterable: true,
                width:150
            },
            {
                Header: "Message",
                accessor: "Message",
                sortable: true,
                filterable: true,
                style: { 'whiteSpace': 'unset' },
                width:350,
            },
            {
                Header: "Message Template",
                accessor: "MessageTemplate",
                sortable: true,
                filterable: true,
                style: { 'whiteSpace': 'unset' },
                width:350,
            },
            {
                Header: "Level",
                accessor: "Level",
                sortable: true,
                filterable: true
            },
            {
                Header: "Time Stamp",
                accessor: "TimeStamp",
                sortable: true,
                filterable: true
            },
            {
                Header: "Controller Name",
                accessor: "ControllerName",
                sortable: true,
                filterable: true,
                style: { 'whiteSpace': 'unset' },
                width:150
            },
            {
                Header: "UserId",
                accessor: "UserId",
                sortable: true,
                filterable: true,
                style: { 'whiteSpace': 'unset' },
                width:150,
            },
            {
                Header: "SessionId",
                accessor: "SessionId",
                sortable: true,
                filterable: true,
                style: { 'whiteSpace': 'unset' },
                width:150,
            },
        ]

        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident">
                            <Breadcrumb>
                                <Breadcrumb.Item>auditlog</Breadcrumb.Item>
                                <Breadcrumb.Item></Breadcrumb.Item>
                            </Breadcrumb>
                            <div>
                                <div className="table-title">Audit Log</div>
                            </div>
                            <Container fluid>
                                <Row>
                                    <Col sm={12}>
                                        <div>
                                            <ReactTable
                                                columns={columns}
                                                data={this.state.posts}
                                                filterable
                                                className='-striped'
                                                defaultPageSize={5}
                                                noDataText={"Please Wait..."}
                                                minRows={0}
                                                loading= {false}
                                            >
                                            </ReactTable>
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
}


// function deleteFormatter(cell, row) {
//     return <a href="#">
//         <FontAwesomeIcon icon={faTrashAlt} className="delete-button" />
//     </a>;
// }

// function dateFormatter(cell, any) {
//     if (!cell) {
//         return "";
//     }
//     return `${moment(cell).format("DD-MM-YYY") ? moment(cell).format("MM/DD/YYYY") : moment(cell).format("MM/DD/YYYY")}`;
// }

export default AuditLog;

