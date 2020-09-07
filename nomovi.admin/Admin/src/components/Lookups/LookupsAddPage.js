import React from "react";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { withRouter } from "react-router-dom";


class LookupsAddPage extends React.Component {

    submitHandler = e => {
        document.location.href = 'LookupsSettingsPage';
        var lookupname = document.getElementById("Nomovi_LookupName").value;
        window.location.href = '../LookupsComponents/LookupsSettingsPage?lookupname=' + lookupname;
    }

    handleClose = e => {
        this.props.history.goBack();
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident">
                            <div className="add-report">
                                <div>
                                    <button className="add-m-button" onClick={this.submitHandler}><FontAwesomeIcon icon={faPlus} /> Create</button>
                                </div>
                                <div>
                                    <button className="add-m-button" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes} /> Close</button>
                                </div>
                            </div>
                            <div className="table-title">
                                <div>Lookups</div>
                            </div>
                            <Container fluid className="body-content">
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Lookup Name</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Nomovi_LookupName" />
                                        </Col>
                                    </Row>
                                </div >
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container >
        )
    }
}

export default withRouter(LookupsAddPage);
