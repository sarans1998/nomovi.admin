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
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css';
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css';
var userid = '1b6aa251-6707-4a72-baec-5b70cd0e094b';
var sessionid = 'd86bc905-54ee-43ff-82cc-4dbe3acf3841';
var masterincidentapi = 'https://nomovi365-api.azurewebsites.net/api/' + "MasterObjectMapping" + "/" + userid + "/" + sessionid;
var reportablemasterincidentapi = 'https://nomovi365-api.azurewebsites.net/api/' + "ReportableMasterObjectMapping" + "/" + userid + "/" + sessionid;
var appenddata = "";

class IncidentAddPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'fa fa-exclamation-circle',
        };
    }

    handleChange = (value) => {
        this.setState({ value });
    }

    componentDidMount() {
        $.ajax({
            url: masterincidentapi,
            type: "Get",
            dataType: "json",
            async: false,
            success: function (masterincidentdata) {
                appenddata += '<select class="form-control input-select" name="master-incident" id="master-incident">';
                if (masterincidentdata != "No Data Found") {
                    for (var i = 0; i < masterincidentdata.length; i++) {
                        if (i == 0) {
                            appenddata += "<option value =''>None</option>";
                        }
                        appenddata += "<option value ='" +
                            masterincidentdata[i].Nomovi_Master_Object_MappingId +
                            "'>" +
                            masterincidentdata[i].IncidentName +
                            "</option>";
                    }
                    appenddata += "</select>";
                } else {
                    appenddata += "<option value =''>None</option>";
                    appenddata += "</select>";
                }
                $("#divmaster-incident").append(appenddata);
            },
            error: function (masterincidentdataerror) {
                console.log(masterincidentdataerror);
            }
        });
        appenddata = "";
        $.ajax({
            url: reportablemasterincidentapi,
            type: "Get",
            dataType: "json",
            async: false,
            success: function (reportablemasterincidentdata) {
                appenddata += '<select class="form-control input-select" name="osha-log" id="osha-log">';
                if (reportablemasterincidentdata != "No Data Found") {
                    for (var i = 0; i < reportablemasterincidentdata.length; i++) {
                        if (i == 0) {
                            appenddata += "<option value =''>None</option>";
                        }
                        appenddata += "<option value ='" +
                            reportablemasterincidentdata[i].Nomovi_Master_Object_MappingId +
                            "'>" +
                            reportablemasterincidentdata[i].IncidentName +
                            "</option>";
                    }
                    appenddata += "</select>";
                } else {
                    appenddata += "<option value =''>None</option>";
                    appenddata += "</select>";
                }
                $("#divosha-log").append(appenddata);
            },
            error: function (masterincidentdataerror) {
                console.log(masterincidentdataerror);
            }
        });
        appenddata = "";
    }

    submitHandler = e => {
        e.preventDefault()


        var fieldsGenerated = [];

        var icon_name = $('#icon-name').val();
        var sortorder = 0;
        var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        var objectmappingapi = 'https://nomovi365-api.azurewebsites.net/api/' + "ObjectMappingInsert" + "/" + userid + "/" + sessionid;
        var objectcreatetableurl = 'https://nomovi365-api.azurewebsites.net/api/' + "ObjectCreateTable/" + guid + "/" + userid + "/" + sessionid;
        var fieldvalue = {};
        fieldvalue.Nomovi_Object_MappingId = guid;
        fieldvalue.IncidentName = document.getElementById("incident-name").value;
        fieldvalue.Latitude = "";
        fieldvalue.Longitude = "";
        fieldvalue.Nomovi_Location = "";
        fieldvalue.Icon_Name = icon_name;
        $.ajax({
            contentType: 'application/json; charset=utf-8',
            type: "POST",
            url: objectmappingapi,
            dataType: "json",
            data: JSON.stringify(fieldvalue),
            success: function (data) {
                console.log(data);
                var getObjectSystemColumnsapi = 'https://nomovi365-api.azurewebsites.net/api/' +
                    "ObjectSystemColumns" + "/" + userid + "/" + sessionid;
                $.ajax({
                    type: "GET",
                    contentType: "application/json; charset=utf-8",
                    url: getObjectSystemColumnsapi,
                    dataType: "JSON",
                    data: {},
                    //'ReportId': key
                }).done(function (response) {
                    //Object Fields Creation
                    $.ajax({
                        contentType: 'application/json; charset=utf-8',
                        type: "POST",
                        url: objectcreatetableurl,
                        dataType: "json",
                        success: function (data) {
                            var objectinserturl = 'https://nomovi365-api.azurewebsites.net/api/' + "ObjectInsertTable" + "/" + userid + "/" + sessionid;
                            //**********Master Incident Insert**********
                            if ($('#master-incident').val() != '') {
                                var masterobjectid = $('#master-incident').val();
                                var masterobjecturl = 'https://nomovi365-api.azurewebsites.net/api/' + "MasterObject/" + masterobjectid + "/" + userid + "/" + sessionid;
                                $.ajax({
                                    type: "GET",
                                    //contentType: "application/json; charset=utf-8",
                                    url: masterobjecturl,
                                    dataType: "JSON",
                                    data: {},
                                    //'ReportId': key
                                }).done(function (masterincidentresponse) {
                                    var masterincidentdata = masterincidentresponse;
                                    fieldsGenerated = [];
                                    for (var masterdataindex in masterincidentdata) {
                                        sortorder = sortorder + 1;
                                        fieldvalue = {};
                                        fieldvalue.Nomovi_Object_MappingId = guid;
                                        fieldvalue.Nomovi_LookupId = masterincidentdata[masterdataindex].Nomovi_LookupId;
                                        fieldvalue.ReportName = document.getElementById("incident-name").value;
                                        fieldvalue.SystemName = masterincidentdata[masterdataindex].SystemName;
                                        fieldvalue.Caption = masterincidentdata[masterdataindex].Caption;
                                        fieldvalue.FieldType = masterincidentdata[masterdataindex].FieldType;
                                        fieldvalue.SortOrder = sortorder;
                                        fieldvalue.Mandatory = 1;
                                        fieldvalue.Visible = 1;
                                        fieldvalue.ReadOnly = 1;
                                        fieldvalue.Span = 0;
                                        fieldvalue.Editable = 1;
                                        fieldvalue.Notification = masterincidentdata[masterdataindex].Notification;
                                        fieldvalue.Chart = masterincidentdata[masterdataindex].Chart;
                                        fieldsGenerated.push(fieldvalue);
                                    }
                                    $.ajax({
                                        contentType: 'application/json; charset=utf-8',
                                        type: "POST",
                                        url: objectinserturl,
                                        dataType: "json",
                                        data: JSON.stringify(fieldsGenerated),
                                        success: function (data) {
                                            console.log(data);

                                            var incidentcreateurl = 'https://nomovi365-api.azurewebsites.net/api/' +
                                                "IncidentCreateTable/" +
                                                guid + "/" + userid + "/" + sessionid;


                                        },
                                        error: function (error) {
                                            console.log(error);
                                        }
                                    });
                                }).fail(function (error) {
                                    console.log(error);
                                });
                            }
                            //**********OSHA Recordable Insert**********
                            //var oshacheckBox = $('#osha-log');
                            //if (oshacheckBox.is(':checked')) {
                            if ($('#osha-log').val() != '') {
                                var reportablemasterobjectid = $('#osha-log').val();
                                // var oshaurl = 'https://nomovi365-api.azurewebsites.net/api/' + "AllOSHA/" + userid + "/" + sessionid;
                                var oshaurl = 'https://nomovi365-api.azurewebsites.net/api/' + "MasterObject/" + reportablemasterobjectid + "/" + userid + "/" + sessionid;
                                $.ajax({
                                    type: "GET",
                                    //contentType: "application/json; charset=utf-8",
                                    url: oshaurl,
                                    dataType: "JSON",
                                    data: {},
                                    //'ReportId': key
                                }).done(function (osharesponse) {
                                    var oshadata = osharesponse;
                                    fieldsGenerated = [];
                                    for (var oshadataindex in oshadata) {
                                        sortorder = sortorder + 1;
                                        fieldvalue = {};
                                        fieldvalue.Nomovi_Object_MappingId = guid;
                                        fieldvalue.Nomovi_LookupId = oshadata[oshadataindex].Nomovi_LookupId;
                                        fieldvalue.ReportName = document.getElementById("incident-name").value;
                                        fieldvalue.SystemName = oshadata[oshadataindex].SystemName;
                                        fieldvalue.Caption = oshadata[oshadataindex].Caption;
                                        fieldvalue.FieldType = oshadata[oshadataindex].FieldType;
                                        fieldvalue.SortOrder = sortorder;
                                        fieldvalue.Mandatory = 1;
                                        fieldvalue.Visible = 1;
                                        fieldvalue.ReadOnly = 1;
                                        fieldvalue.Span = 0;
                                        fieldvalue.Editable = 1;
                                        fieldvalue.Notification = oshadata[oshadataindex].Notification;
                                        fieldvalue.Chart = oshadata[oshadataindex].Chart;
                                        fieldsGenerated.push(fieldvalue);
                                    }
                                    $.ajax({
                                        contentType: 'application/json; charset=utf-8',
                                        type: "POST",
                                        url: objectinserturl,
                                        dataType: "json",
                                        data: JSON.stringify(fieldsGenerated),
                                        success: function (data) {
                                            console.log(data);
                                        },
                                        error: function (error) {
                                            console.log(error);
                                        }
                                    });
                                }).fail(function (error) {
                                    console.log(error);
                                });
                            }
                            //var defaultdata = '[{"SystemName":"date","Caption":"Date","FieldType":"DateTime"},{"SystemName":"latitude","Caption":"Latitude","FieldType":"Text"},{"SystemName":"longitude","Caption":"Longitude","FieldType":"Text"},{"SystemName":"location","Caption":"Location","FieldType":"Text"},{"SystemName":"created","Caption":"Created","FieldType":"DateTime"},{"SystemName":"createdby","Caption":"Created By","FieldType":"Text"},{"SystemName":"modified","Caption":"Modified","FieldType":"DateTime"},{"SystemName":"modifiedby","Caption":"Modified By","FieldType":"Text"}]';
                            var defaultdata = response;
                            fieldsGenerated = [];
                            for (var dataindex in defaultdata) {
                                fieldvalue = {};
                                fieldvalue.Nomovi_Object_MappingId = guid;
                                fieldvalue.Nomovi_LookupId = null;
                                fieldvalue.ReportName = document.getElementById("incident-name").value;
                                fieldvalue.SystemName = defaultdata[dataindex].SystemName;
                                fieldvalue.Caption = defaultdata[dataindex].Caption;
                                fieldvalue.FieldType = defaultdata[dataindex].FieldType;
                                if (defaultdata[dataindex].SystemName != "created" &&
                                    defaultdata[dataindex].SystemName != "createdby" &&
                                    defaultdata[dataindex].SystemName != "modified" &&
                                    defaultdata[dataindex].SystemName != "modifiedby") {
                                    sortorder = sortorder + 1;
                                    fieldvalue.SortOrder = sortorder;
                                } else {
                                    fieldvalue.SortOrder = "";
                                }
                                fieldvalue.Mandatory = defaultdata[dataindex].Mandatory;
                                fieldvalue.Visible = defaultdata[dataindex].Visible;
                                fieldvalue.ReadOnly = defaultdata[dataindex].ReadOnly;
                                fieldvalue.Span = defaultdata[dataindex].Span;
                                fieldvalue.Editable = defaultdata[dataindex].Editable;
                                fieldvalue.Notification = defaultdata[dataindex].Notification;
                                fieldvalue.Chart = defaultdata[dataindex].Chart;
                                fieldsGenerated.push(fieldvalue);
                            }
                            console.log(JSON.stringify(fieldvalue));
                            $.ajax({
                                contentType: 'application/json; charset=utf-8',
                                type: "POST",
                                url: objectinserturl,
                                dataType: "json",
                                data: JSON.stringify(fieldsGenerated),
                                success: function (data) {
                                    console.log(data);
                                    var viewapi = 'https://nomovi365-api.azurewebsites.net/api/' + "ViewMappingInsert" + "/" + userid + "/" + sessionid;
                                    var viewmappinginventoryguid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
                                    var viewmappingdetailguid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
                                    var viewfields = {};
                                    var viewfieldsGenerated = [];
                                    viewfields.View_Mapping_Id = viewmappinginventoryguid;
                                    viewfields.ViewName = "Default Inventory View";
                                    viewfields.ViewType = "Inventory";
                                    viewfields.DefaultView = 1;
                                    viewfields.Incident_Id = guid;
                                    viewfieldsGenerated.push(viewfields);
                                    viewfields = {};
                                    viewfields.View_Mapping_Id = viewmappingdetailguid;
                                    viewfields.ViewName = "Default Detail View";
                                    viewfields.ViewType = "Detail";
                                    viewfields.DefaultView = 1;
                                    viewfields.Incident_Id = guid;
                                    viewfieldsGenerated.push(viewfields);
                                    $.ajax({
                                        contentType: 'application/json; charset=utf-8',
                                        type: "POST",
                                        url: viewapi,
                                        dataType: "json",
                                        data: JSON.stringify(viewfieldsGenerated),
                                        success: function (data) {
                                            console.log(data);
                                            var viewmappingfields = {};
                                            var viewmappingfieldsGenerated = [];
                                            var viewcreateinventoryurl = 'https://nomovi365-api.azurewebsites.net/api/' + "ViewCreateTable/" + viewmappinginventoryguid + "/" + userid + "/" + sessionid;
                                            var viewcreatedetailurl = 'https://nomovi365-api.azurewebsites.net/api/' + "ViewCreateTable/" + viewmappingdetailguid + "/" + userid + "/" + sessionid;
                                            var viewinserturl = 'https://nomovi365-api.azurewebsites.net/api/' + "ViewInsert" + "/" + userid + "/" + sessionid;
                                            var ObjectSystemColumnsurl = 'https://nomovi365-api.azurewebsites.net/api/' + "ObjectSystemColumns" + "/" + userid + "/" + sessionid;
                                            var commonobjecturl = 'https://nomovi365-api.azurewebsites.net/api/' + "CommonObject" + "/" + guid + "/" + userid + "/" + sessionid;
                                            var createstageurl = 'https://nomovi365-api.azurewebsites.net/api/' + "StageCreateTable" + "/" + guid + "/" + userid + "/" + sessionid;
                                            $.ajax({
                                                type: "GET",
                                                //url: ObjectSystemColumnsurl,
                                                url: commonobjecturl,
                                                dataType: "JSON",
                                                data: {},
                                                //'ReportId': key
                                            }).done(function (commonresponse) {
                                                console.log("Inventory URL " + viewmappinginventoryguid);
                                                for (var commonindex in commonresponse) {
                                                    viewmappingfields = {};
                                                    viewmappingfields.View_Mapping_Id = viewmappinginventoryguid;
                                                    viewmappingfields.Incident_Id = guid;
                                                    //viewmappingfields.Field_Id = commonresponse[commonindex].Nomovi_Object_System_ColumnsId;
                                                    viewmappingfields.Field_Id = commonresponse[commonindex].Nomovi_SchemaId;
                                                    viewmappingfields.Status = 1;
                                                    viewmappingfieldsGenerated.push(viewmappingfields);
                                                }
                                                $.ajax({
                                                    contentType: 'application/json; charset=utf-8',
                                                    type: "POST",
                                                    url: viewcreateinventoryurl,
                                                    dataType: "json",
                                                    //data: JSON.stringify(viewmappingfieldsGenerated),
                                                    success: function (fielddata) {
                                                        console.log(fielddata);
                                                        //Insert View Inventory Mapping Table
                                                        $.ajax({
                                                            contentType: 'application/json; charset=utf-8',
                                                            type: "POST",
                                                            url: viewinserturl,
                                                            dataType: "json",
                                                            data: JSON.stringify(viewmappingfieldsGenerated),
                                                            success: function (data) {
                                                                console.log(data);
                                                                viewmappingfieldsGenerated = [];
                                                                console.log("Detail URL " + viewmappingdetailguid);
                                                                for (var commonindex in commonresponse) {
                                                                    viewmappingfields = {};
                                                                    viewmappingfields.View_Mapping_Id = viewmappingdetailguid;
                                                                    viewmappingfields.Incident_Id = guid;
                                                                    //viewmappingfields.Field_Id = commonresponse[commonindex].Nomovi_Object_System_ColumnsId;
                                                                    viewmappingfields.Field_Id = commonresponse[commonindex].Nomovi_SchemaId;
                                                                    viewmappingfields.Status = 1;
                                                                    viewmappingfieldsGenerated.push(viewmappingfields);
                                                                }
                                                                $.ajax({
                                                                    contentType: 'application/json; charset=utf-8',
                                                                    type: "POST",
                                                                    url: viewcreatedetailurl,
                                                                    dataType: "json",
                                                                    //data: JSON.stringify(viewmappingfieldsGenerated),
                                                                    success: function (fielddata) {
                                                                        console.log(fielddata);
                                                                        ///////Insert View Detail Mapping Table///////
                                                                        $.ajax({
                                                                            contentType: 'application/json; charset=utf-8',
                                                                            type: "POST",
                                                                            url: viewinserturl,
                                                                            dataType: "json",
                                                                            data: JSON.stringify(viewmappingfieldsGenerated),
                                                                            success: function (data) {
                                                                                console.log(data);
                                                                                ////Create Stage
                                                                                $.ajax({
                                                                                    contentType: 'application/json; charset=utf-8',
                                                                                    type: "POST",
                                                                                    url: createstageurl,
                                                                                    dataType: "json",
                                                                                    success: function (data) {
                                                                                        console.log(data);
                                                                                        //Insert two default Stages
                                                                                        for (var i = 0; i <= 1; i++) {
                                                                                            var stageinsertapi = 'https://nomovi365-api.azurewebsites.net/api/' + "StageInsertTable" + "/" + userid + "/" + sessionid;
                                                                                            var stagemappinginsertapi = 'https://nomovi365-api.azurewebsites.net/api/' + "StageMappingInsert" + "/" + userid + "/" + sessionid;
                                                                                            var saveguid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
                                                                                            var savemappingguid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
                                                                                            var stagefields = {};
                                                                                            stagefields.Incident_Id = guid;
                                                                                            stagefields.Nomovi_Stage_Id = saveguid;
                                                                                            if (i == 0) {
                                                                                                stagefields.Stage_Name = "Draft";
                                                                                                stagefields.Sort_Order = 1;
                                                                                            } else {
                                                                                                stagefields.Stage_Name = "Closed";
                                                                                                stagefields.Sort_Order = 100;
                                                                                            }

                                                                                            stagefields.Status = 1;
                                                                                            $.ajax({
                                                                                                contentType: 'application/json; charset=utf-8',
                                                                                                type: "POST",
                                                                                                url: stageinsertapi,
                                                                                                dataType: "json",
                                                                                                data: JSON.stringify(stagefields),
                                                                                                success: function (data) {
                                                                                                    stagefields = {};
                                                                                                    stagefields.Nomovi_Stage_Mapping_Id = savemappingguid;
                                                                                                    stagefields.Stage_Id = saveguid;
                                                                                                    stagefields.View_Id = viewmappingdetailguid;
                                                                                                    stagefields.Incident_Id = guid;
                                                                                                    stagefields.Delete_Flag = 0;
                                                                                                    $.ajax({
                                                                                                        contentType: 'application/json; charset=utf-8',
                                                                                                        type: "POST",
                                                                                                        url: stagemappinginsertapi,
                                                                                                        dataType: "json",
                                                                                                        data: JSON.stringify(stagefields)
                                                                                                    });
                                                                                                },
                                                                                                error: function (error) {
                                                                                                    console.log(error);
                                                                                                }
                                                                                            });
                                                                                        }

                                                                                        //document.location.href = 'AddField?Incident_id='+guid+'&IncidentName='+document.getElementById("incident-name").value;
                                                                                        document.location.href = 'IncidentSettingsPage?Incident_id=' + guid;
                                                                                    },
                                                                                    error: function (error) {
                                                                                        console.log(error);
                                                                                    }
                                                                                });
                                                                                ////End
                                                                            },
                                                                            error: function (error) {
                                                                                console.log(error);
                                                                            }
                                                                        });
                                                                        ////////////////////////////
                                                                    },
                                                                    error: function (error) {
                                                                        console.log(error);
                                                                    }
                                                                });

                                                            },
                                                            error: function (error) {
                                                                console.log(error);
                                                            }
                                                        });
                                                    },
                                                    error: function (error) {
                                                        console.log(error);
                                                    }
                                                });
                                            }).fail(function (error) {
                                                console.log(error);
                                            });
                                            //
                                        },
                                        error: function (error) {
                                            console.log(error);
                                        }
                                    });
                                },
                                error: function (error) {
                                    console.log(error);
                                }
                            });
                        },
                        error: function (objectcreatetableurlerror) {
                            console.log(objectcreatetableurlerror);
                        }
                    });
                }).fail(function (error) {
                    console.log(error);
                });
                ////////////////////////////
            },
            error: function (objectmappingapierror) {
                console.log(objectmappingapierror);
            }
        });

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

    }

    handleClose = e => {
        this.props.history.goBack();
      };


    

    render() {
        const props = {
            icons: ['fa fa-exclamation', 'fa fa-home', 'fa fa-user-plus', 'fa fa-plus-circle', 'fa fa-shield', 'fa fa-unlock', 'fa fa-exclamation-triangle',
            'fa fa-exclamation-circle','fa fa-wheelchair','fa fa-universal-access','fa fa-street-view','fa fa-address-book',
            'fa fa-ambulance','fa fa-bell','fa fa-bolt','fa fa-briefcase','fa fa-map-marker','fa fa-compass',],
            theme: 'default',
            renderUsing: 'class',
            value: this.state.value,
            onChange: this.handleChange,
            isMulti: false,
        };
        
        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident" >
                            <Breadcrumb>
                                <Breadcrumb.Item>Incident</Breadcrumb.Item>
                                <Breadcrumb.Item>IncidentAddPage</Breadcrumb.Item>
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
                                        <Col sm={2} className="input-label" >Incident Name</Col >
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
                                        <Col sm={2} className="input-label" >Incident Icon</Col >
                                        <Col sm={10} className="input-group">
                                            <input type="text" className="icon-class-input" id="icon-name" value="zmdi zmdi-upload" style={{ display: 'none' }} />
                                            {/* <button type="button" className="btn picker-button ">Pick</button>
                                            <span className="demo-icon"></span> */}
                                            <FontIconPicker {...props} />
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Master Incident</Col >
                                        <Col sm={10} className="input-group">
                                            <div className="input-dropdown" id="divmaster-incident"></div>
                                        </Col>
                                    </Row>
                                </div >
                                <div className="form-group" >
                                    <Row>
                                        <Col sm={2} className="input-label" >Master Incident (Reportable)</Col >
                                        <Col sm={10} className="input-group">
                                            <div className="input-dropdown" id="divosha-log"></div>
                                        </Col>
                                    </Row>
                                </div >
                            </Container >
                        </div >
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default withRouter(IncidentAddPage);

