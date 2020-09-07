import React, { useState, useEffect } from "react";
import { faFileExport, faPlus, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link,
} from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import * as moment from 'moment';

function editFormatter(cell, row) {
    return <a href="#" onClick={this.edit}>
        <FontAwesomeIcon icon={faPen} className="edit-button" />
    </a>;
}

function deleteFormatter(cell, row) {
    return <a href="#">
        <FontAwesomeIcon icon={faTrashAlt} className="delete-button" />
    </a>;
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

function LocationInventory() {

    const [posts, setPosts] = useState([])

    // const request = axios.put(url, "\"" + values.guid + "\"", {
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-type": "application/json",
            
    //     }
    // })

    // axios({
    //     method: 'put',
    //     url: '',
    //     data: value,
    //     config: { headers: {'Content-Type': 'multipart/form-data' }}
    //   })
    //    .then(function (response) {
    //      if (response.status === 200) {
    //        console.log("Update Success");
    //        resolve();
    //      }
    //    })
    //    .catch(function (response) {
    //      console.log(response);
    //      resolve();
    //    });

    useEffect(() => {
        axios.get('https://nomovi365-api.azurewebsites.net/api/Location')
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
                            <div>
                                <Link to="/location/locationaddpage"><button className="add-m-button"><FontAwesomeIcon icon={faPlus} /> Add</button></Link>
                            </div>
                            <div>
                                <button className="add-m-button"><FontAwesomeIcon icon={faFileExport} /> Export</button>
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Location Inventory</div>
                        </div>
                        <Container fluid>
                            <Row>
                                <Col sm={12}>
                                    <div className="table-set">
                                        <BootstrapTable data={posts} striped hover bordered={true}>
                                            <TableHeaderColumn dataField='edit' width="50" dataFormat={editFormatter}></TableHeaderColumn>
                                            <TableHeaderColumn dataField='delete' width="50" dataFormat={deleteFormatter}></TableHeaderColumn>
                                            <TableHeaderColumn isKey dataField='LocationName' width="400" dataSort={true}>Location Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Created' dataFormat={dateFormatter} dataSort={true}>Created</TableHeaderColumn>
                                            <TableHeaderColumn dataField='CreatedBy' dataFormat={dataCreatedBy}>CreatedBy</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Modified' dataFormat={dateFormatter} dataSort={true}>Modified</TableHeaderColumn>
                                            <TableHeaderColumn dataField='ModifiedBy' dataFormat={dataModifiedBy}>ModifiedBy</TableHeaderColumn>
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

export default LocationInventory

