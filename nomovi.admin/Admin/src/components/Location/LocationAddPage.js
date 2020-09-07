import React from "react";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { withRouter } from "react-router-dom";


var userid = '8f0d0f73-8d52-468b-9844-16d30d303f57';
var sessionid = '189a8d64-201f-4869-9bff-19de616b88b5';

class LocationAddPage extends React.Component {

    handleClose = e => {
        this.props.history.goBack();
    };

    submitHandler = e => {
        var locationupdateurl = 'https://nomovi365-api.azurewebsites.net/api/' + "LocationInsert" + "/" + userid + "/" + sessionid;
        var fieldvalue = {};
        var fieldgenerated = [];

        fieldvalue.LocationName = $('#LocationName').val();
        fieldvalue.Status = 1;
        fieldgenerated.push(fieldvalue);
        console.log(JSON.stringify(fieldgenerated));

        $.ajax({
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            url: locationupdateurl,
            dataType: "json",
            data: JSON.stringify(fieldgenerated),
            success: function (data) {
                console.log(data)
                document.getElementById("LocationName").value = "";
                document.location.href = '../locationinventory';
            }

        });
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident">
                            <div className="add-report">
                                <div>
                                    <button className="add-m-button" onClick={this.submitHandler}><FontAwesomeIcon icon={faPlus} /> Save</button>
                                </div>
                                <div>
                                    <button className="add-m-button" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes} /> Close</button>
                                </div>
                            </div>
                            <div className="table-title">
                                <div>Add Location Field</div>
                            </div>
                            <Container fluid className="body-content">
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Location Name</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="LocationName" />
                                        </Col>
                                    </Row>
                                </div >
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(LocationAddPage);
