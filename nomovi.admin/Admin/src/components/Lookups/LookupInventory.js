import React, { useState, useEffect } from "react";
import { faFileExport, faPlus, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link,
} from "react-router-dom";
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


function LookupInventory() {

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
        axios.get('https://nomovi365-api.azurewebsites.net/api/Lookup')
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
                                <Link to="/lookups/lookupsaddpage"><button className="add-m-button"><FontAwesomeIcon icon={faPlus} /> Add</button></Link>
                            </div>
                            <div>
                                <button className="add-m-button"><FontAwesomeIcon icon={faFileExport} /> Export</button>
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Lookup Inventory</div>
                        </div>
                        <Container fluid>
                            <Row>
                                <Col sm={12}>
                                    <div className="table-set">
                                        <BootstrapTable data={posts} striped hover bordered={true}>
                                            <TableHeaderColumn dataField='edit' width="50" dataFormat={editFormatter}></TableHeaderColumn>
                                            <TableHeaderColumn dataField='delete' width="50" dataFormat={deleteFormatter}></TableHeaderColumn>
                                            <TableHeaderColumn isKey dataField='LookupName' width="300" dataSort={true}>Lookup Name</TableHeaderColumn>
                                            <TableHeaderColumn dataField='Created' width="150" dataFormat={dateFormatter} dataSort={true}>Created</TableHeaderColumn>
                                            <TableHeaderColumn dataField='CreatedBy' width="150" dataFormat={dataCreatedBy}> CreatedBy</TableHeaderColumn>
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
        </Container >

    )
}

export default LookupInventory

