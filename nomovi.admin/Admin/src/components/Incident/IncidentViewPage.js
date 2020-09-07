import React from 'react'
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import $ from "jquery";

class IncidentViewPage extends React.Component {

    submitHandler = e => {
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return decodeURI(results[1]) || 0;
            }
        }
        var userid = '8f0d0f73-8d52-468b-9844-16d30d303f57';
        var sessionid = '7b94ee8f-7b95-4bff-9ce3-8d5c8d665fea';
        var Incident_id = $.urlParam('Incident_id');
        // Incident_id = Incident_id.replace(/\/$/, "");
        if ($("#default").prop('checked') == true) {
            //Update all the values to Zero for particular view i.r for detai or inventory view
            var updateviewapi = 'https://nomovi365-api.azurewebsites.net/api/' + "ViewMappingUpdate/" + Incident_id + "/" + $('#view_type').val() + "/" + userid + "/" + sessionid;
            $.ajax({
                //contentType: 'application/json; charset=utf-8',
                type: "PUT",
                url: updateviewapi,
                dataType: "json",
                success: function (data) {
                    //window.location.href = '../../Incident/IncidentSettings/' + Incident_id;
                },
                error: function (error) {
                    console.log(error);
                }

            });
        }
        var viewapi = 'https://nomovi365-api.azurewebsites.net/api/' + "ViewMappingInsert" + "/" + userid + "/" + sessionid;
        var viewmappingguid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        var viewfields = {};
        var viewfieldsGenerated = [];
        viewfields.View_Mapping_Id = viewmappingguid;
        viewfields.ViewName = $('#view_name').val();
        viewfields.ViewType = $('#view_type').val();
        var isChecked = $('#default').prop('checked');
        if (isChecked == true)
            viewfields.DefaultView = 1;
        else
            viewfields.DefaultView = 0;
        viewfields.Incident_Id = Incident_id;

        viewfieldsGenerated.push(viewfields);
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            url: viewapi,
            dataType: "json",
            data: JSON.stringify(viewfieldsGenerated),
            success: function (data) {
                console.log(data);
                var viewcreateurl = 'https://nomovi365-api.azurewebsites.net/api/' + "ViewCreateTable/" + viewmappingguid + "/" + userid + "/" + sessionid;
                var viewinserturl = 'https://nomovi365-api.azurewebsites.net/api/' + "ViewInsert" + "/" + userid + "/" + sessionid;
                var getcommonobjecturl = 'https://nomovi365-api.azurewebsites.net/api/' + "CommonObject/" + Incident_id + "/" + userid + "/" + sessionid;                                                                                                                                           
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    type: "POST",
                    url: viewcreateurl,
                    dataType: "json",

                    success: function (fielddata) {
                        $.ajax({
                            url: getcommonobjecturl,
                            type: "Get",
                            dataType: "json",
                            success: function (objectdata) {

                                var viewmappingfields = {};
                                var viewmappingfieldsGenerated = [];
                                for (var objectindex in objectdata) {
                                    viewmappingfields = {};
                                    viewmappingfields.View_Mapping_Id = viewmappingguid;
                                    viewmappingfields.Incident_Id = Incident_id;
                                    viewmappingfields.Field_Id = objectdata[objectindex].Nomovi_SchemaId;
                                    viewmappingfields.Status = 1;
                                    viewmappingfieldsGenerated.push(viewmappingfields);

                                }


                                //Insert View Mapping Table
                                $.ajax({
                                    contentType: 'application/json; charset=utf-8',
                                    type: "POST",
                                    url: viewinserturl,
                                    dataType: "json",
                                    data: JSON.stringify(viewmappingfieldsGenerated),
                                    success: function (data) {
                                        console.log(data);
                                        window.location.href = 'IncidentSettingsPage?Incident_id=' + Incident_id;


                                    },
                                    error: function (error) {
                                        console.log(error);
                                    }
                                });
                            },
                            error: function (errorobjectdata) {

                            }
                        });




                    },
                    error: function (error) {


                    }
                });

            },
            error: function (error) {
                console.log(error);
            }

        });


        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident">
                            <Breadcrumb>
                                <Breadcrumb.Item>Incident</Breadcrumb.Item>
                                <Breadcrumb.Item>IncidentViewPage</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="add-report">
                                <div>
                                    <button className="add-m-button" onClick={this.submitHandler}><FontAwesomeIcon icon={faPlus} /> Create</button>
                                </div>
                                <div>
                                    <button className="add-m-button"><FontAwesomeIcon icon={faTimes} /> Close</button>
                                </div>
                            </div>
                            <div className="table-title">
                                <div>Add View</div>
                            </div>
                            <Container fluid className="body-content">
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >View Name</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="view_name" />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >View Type</Col >
                                        <Col sm={10} className="input-group">
                                            <select class="form-control show-tick field-type" id="view_type" name="view_type">
                                                <option value="Inventory">Inventory View</option>
                                                <option value="Detail">Detail View</option>
                                            </select>
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Default</Col >
                                        <Col sm={10} className="input-group">
                                            <input
                                                type="checkbox"
                                                className="checkox-input"
                                                id="default" />
                                            <label class="control-label" for="default"></label>
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

export default IncidentViewPage
