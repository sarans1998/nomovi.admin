import React from "react";
import { faFileExport, faPlus, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    Link,
} from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReactTable from 'react-table-v6'
import { NavLink } from 'react-router-dom';

var userid = '8f0d0f73-8d52-468b-9844-16d30d303f57';
var sessionid = 'efbc82e2-7e6d-46c6-a0c4-d4b591bc4351';
var Nomovi_Master_Object_MappingId = "";

class MasterIncidentInventory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        const masterincidentapi = 'https://nomovi365-api.azurewebsites.net/api/' + "AllMasterObjectMapping" + "/" + userid + "/" + sessionid;
        fetch(masterincidentapi, {
            method: "GET"
        }).then(response => response.json()).then(posts => {
            this.setState({ posts: posts })
        })
    };

    deleteRow(id) {
        const index = this.state.posts.findIndex(post => {
            return post.Nomovi_Master_Object_MappingId === id
        })
    }

    editRow(e, item) {
        // const Nomovi_Master_Object_MappingId = item.Nomovi_Master_Object_MappingId;
         window.location.href = "MasterIncidentDetails?Incident_id=" + Nomovi_Master_Object_MappingId + "/";
       e.stopPropagation();
     }

    render() {
        const columns = [
            {
                Cell: props => {
                    return (
                        <FontAwesomeIcon icon={faPen} className="edit-button"
                            // onClick={(e) => {
                            //     window.location.href = "MasterIncidentDetails?Incident_id=" + item.Nomovi_Master_Object_MappingId + "/";
                            //     e.stopPropagation();
                            // }}
                            onClick={this.editRow}
                        />
                    )
                },
                style: {
                    textAlign: "center"
                },
                sortable: false,
                filterable: false,
                width: 50,
            },
            {
                Cell: props => {
                    return (
                        <FontAwesomeIcon icon={faTrashAlt} className="delete-button"
                            onClick={() => {
                                this.deleteRow(props.original.Nomovi_Master_Object_MappingId);
                            }}
                        />
                    )
                },
                style: {
                    textAlign: "center"
                },
                sortable: false,
                filterable: false,
                width: 50,
            },
            {
                Header: "Incident Name",
                accessor: "IncidentName",
                width: 400,
                maxWidth: 400,
                minWidth: 400,
            },
            {
                Header: "Reportable",
                accessor: "Reportable",
                sortable: false,
                filterable: false
            },
            {
                Header: "Created",
                accessor: "Created",
                filterable: false
            },
            {
                Header: "CreatedBy",
                accessor: "CreatedBy"
            },
            {
                Header: "Modified",
                accessor: "Modified",
                filterable: false

            },
            {
                Header: "ModifiedBy",
                accessor: "ModifiedBy",

            },
        ]

        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident">
                            <Breadcrumb>
                                <Breadcrumb.Item>MasterIncident</Breadcrumb.Item>
                                <Breadcrumb.Item></Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="add-report">
                                <div>
                                    <NavLink to="/master/masteraddpage" activeClassName="li-active"><button className="add-m-button"><FontAwesomeIcon icon={faPlus} /> Add</button></NavLink>
                                </div>
                                <div>
                                    <button className="add-m-button" ><FontAwesomeIcon icon={faFileExport} /> Export</button>
                                </div>
                            </div>
                            <div>
                                <div className="table-title">Master Incident Inventory</div>
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
                                                defaultPageSize={10}
                                                noDataText={"Please Wait..."}
                                                minRows={0}
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

export default MasterIncidentInventory
