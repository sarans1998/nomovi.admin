import React from "react";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import $ from "jquery";
import alert from "jquery-confirm";
import { withRouter } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class MasterAddPage extends React.Component {

    submitHandler = e => {
        e.preventDefault()
        var userid = '8f0d0f73-8d52-468b-9844-16d30d303f57';
        var sessionid = 'd010321e-a700-4705-a63a-30b8c0254cc5';
        var t1 = "Nomovi_Master_Object_Mapping", f1 = "IncidentName", v1 = "";
        var CheckValidationApi = "";
        if ($('#incident-name').val() == "") {
            $.alert({ title: '', content: 'Master Incident Name cannot be empty', type: 'red', typeAnimated: true });
            return;
        }
        // if ($('#incident-name').val() == "") {
        //     $.alert({ title: '', content: 'Master Incident Name cannot be empty', type: 'red', typeAnimated: true });
        //     return;
        // }
        if ($('#incident-name').val()) {
            v1 = $('#incident-name').val();
            CheckValidationApi = 'https://nomovi365-api.azurewebsites.net/api/' + "CheckValidation" + "/" + t1 + "/" + f1 + "/" + v1 + "/" + userid + "/" + sessionid;
            $.ajax({
                type: "GET",
                url: CheckValidationApi,
                dataType: "json",
                success: function (data) {
                    if (data === "false") {
                        $.alert({
                            title: 'Validation Failed',
                            content: 'Master Incident Name already exists',
                            type: 'red',
                            typeAnimated: true
                        });
                        // $.alert({
                        //     title: 'Validation Failed',
                        //     content: 'Master Incident Name already exists',
                        //     type: 'red',
                        //     typeAnimated: true
                        // });
                        CheckValidationApi = "";
                        return;

                    } else {

                        var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
                        var masterobjectmappingapi = 'https://nomovi365-api.azurewebsites.net/api/' + "MasterObjectMappingInsert" + "/" + userid + "/" + sessionid;
                        var masterobjectcreatetableurl = 'https://nomovi365-api.azurewebsites.net/api/' + "MasterObjectCreateTable/" + guid + "/" + userid + "/" + sessionid;
                        var fieldvalue = {};
                        fieldvalue.Nomovi_Master_Object_MappingId = guid;
                        fieldvalue.IncidentName = document.getElementById("incident-name").value;
                        fieldvalue.Reportable = document.getElementById("Reportable").checked == true ? 1 : 0;
                        $.ajax({
                            contentType: 'application/json; charset=utf-8',
                            type: "POST",
                            url: masterobjectmappingapi,
                            dataType: "json",
                            data: JSON.stringify(fieldvalue),
                            success: function (data) {
                                console.log(data);

                                //Object Fields Creation
                                $.ajax({
                                    contentType: 'application/json; charset=utf-8',
                                    type: "POST",
                                    url: masterobjectcreatetableurl,
                                    dataType: "json",
                                    success: function (data) {
                                        console.log(data);
                                        // $(".page-loader-wrapper").css("display", "none");
                                        document.location.href = 'MasterIncidentSettingsPage?Incident_id=' + guid;
                                    }
                                });
                            }
                        });
                    }

                },
                failure: function (errMsg) {
                    $.alert({ title: 'Connection Failed', content: 'Unable to Validate', type: 'red', typeAnimated: true });
                    return;
                }

            });

        }
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
    }

    handleClose = e => {
        this.props.history.goBack();
      };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident" >
                            <Breadcrumb>
                                <Breadcrumb.Item>MasterComponents</Breadcrumb.Item>
                                <Breadcrumb.Item>MasterAddPage</Breadcrumb.Item>
                            </Breadcrumb>

                            <div className="add-report">
                                <div>
                                    <button className="add-m-button" type="submit" onClick={this.submitHandler}><FontAwesomeIcon icon={faPlus} /> Create</button>
                                </div>
                                <div>
                                    <button className="add-m-button" onClick={this.handleClose}><FontAwesomeIcon icon={faTimes} /> Close</button>
                                </div >
                            </div >
                            <div className="table-title">
                                <div>New Incident</div>
                            </div>
                            <Container fluid className="body-content">
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Master Incident Name</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="incident-name" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Reportable</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="Reportable" />
                                        </Col>
                                    </Row>
                                </div >
                            </Container>
                        </div >
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(MasterAddPage);


