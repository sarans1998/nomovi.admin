import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as moment from 'moment';
import { faFileExport, faPlus, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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

function NotificationInventory() {

    const [posts, setPosts, userid] = useState([]);
    // const yourDate = new Date();
    // const NewDate = moment().format('L');;
    useEffect(() => {
        axios.get('https://nomovi365-api.azurewebsites.net/api/AllWorkflowList')
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
                        <div className="add-report">
                            <div className="add-m-button">
                                <span><FontAwesomeIcon icon={faFileExport} /></span> Export
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Notification Inventory</div>
                        </div>
                        <Container fluid>
                            <Row>
                                <Col sm={12}>
                                    <div className="table-set">
                                        <BootstrapTable data={posts} striped hover bordered={true}>
                                            <TableHeaderColumn isKey dataField='Workflow_Name' width="400" dataSort={true}>Notification Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Created' width="150" dataFormat={dateFormatter} dataSort={true}>Created</TableHeaderColumn>
                                            <TableHeaderColumn dataField='CreatedBy' width="150" dataFormat={dataCreatedBy} dataSort={true}>CreatedBy</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Modified' width="150" dataFormat={dateFormatter} dataSort={true}>Modified</TableHeaderColumn>
                                            <TableHeaderColumn dataField='ModifiedBy' width="150" dataFormat={dataModifiedBy} dataSort={true}>ModifiedBy</TableHeaderColumn>
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

export default NotificationInventory
