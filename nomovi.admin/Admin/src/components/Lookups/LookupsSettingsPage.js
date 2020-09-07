import React from 'react'
import { faTimes, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import DataTable from 'react-data-table-component';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const data = [
    { id: 1, Lookup: '', SortOrder: '', DefaultValue: '', },
];
const columns = [
    {
        name: 'Lookup',
        selector: 'Caption',
        sortable: true,
    },
    {
        name: 'Sort Order',
        selector: 'SortOrder',
    },
    {
        name: 'Default Value',
        selector: 'DefaultValue',
        sortable: true,
    },
];

const customStyles = {
    table: {
        style: {
            border: '1px solid rgba(0,0,0,.12)',
            fontSize: '16px',
        }
    },
    headCells: {
        style: {
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#4d5158',
            fontWeight: '600',
            background: '#eaeaea',
        },
    },
    rows: {
        style: {
            fontSize: '14px',
            color: '#4d5158',
            fontWeight: '600',
            hover: 'black',
        },
    },
    cells: {
        style: {
            borderRight: '#f3f3f3 1px solid',
        },
    },
    header: {
        style: {
            display: 'none',
        },
    },
};


const LookupsSettingsPage = () => {
    return (
        <Container fluid>
            <Row>
                <Col sm={12}>
                    <div className="m-custom-incident">
                        <div className="add-report">
                            <div>
                                <button className="add-m-button"><FontAwesomeIcon icon={faPlus} /> Save</button>
                            </div>
                            <div>
                                <button className="add-m-button"><FontAwesomeIcon icon={faTimes} /> Close</button>
                            </div>
                        </div>
                        <div className="table-title">
                            <div>Lookup Add Values</div>
                        </div>
                        <Container fluid>
                            <Row>
                                <Col sm={12}>
                                    <div className="table-set">
                                        <DataTable
                                            columns={columns}
                                            data={data}
                                            customStyles={customStyles}
                                            highlightOnHover={customStyles}
                                        />
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

export default LookupsSettingsPage
