import React from 'react'
import MasterIncidentInventory from '../Master/MasterIncidentInventory'
import IncidentsInventory from '../Incident/IncidentsInventory'
import LookupInventory from '../Lookups/LookupInventory'
import LocationInventory from '../Location/LocationInventory'
import NotificationInventory from '../Notification/NotificationInventory'
import StagePermission from '../permission/StagePermission'
import UserList from '../Usermanagement/UserList'
import AuditLog from '../Auditlog/AuditLog'
import Configuration from '../ConfigurationSettings/Configuration'
import MasterAddPage from '../Master/MasterAddPage'
import MasterIncidentSettingsPage from '../Master/MasterIncidentSettingsPage'
import MasterAddField from '../Master/MasterAddField'
import IncidentAddPage from '../Incident/IncidentAddPage'
import IncidentSettingsPage from '../Incident/IncidentSettingsPage'
import IncidentAddField from '../Incident/IncidentAddField'
import IncidentViewPage from '../Incident/IncidentViewPage'
import IncidentStagePage from '../Incident/IncidentStagePage'
import IncidentNotificationPage from '../Incident/IncidentNotificationPage'
import LookupsAddPage from '../Lookups/LookupsAddPage'
import LookupsSettingsPage from '../Lookups/LookupsSettingsPage'
import LocationAddPage from '../Location/LocationAddPage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom"


function RouteSide() {

    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/master/masterincidentinventory">
                    <MasterIncidentInventory />
                </Route>
                <Route path="/master/masteraddpage">
                    <MasterAddPage />
                </Route>
                <Route path="/master/masterincidentsettingspage">
                    <MasterIncidentSettingsPage />
                </Route>
                <Route path="/master/masteraddfield">
                    <MasterAddField />
                </Route>
                <Route exact path="/incident/incidentinventory">
                    <IncidentsInventory />
                </Route>
                <Route path="/incident/incidentaddpage">
                    <IncidentAddPage />
                </Route>
                <Route path="/incident/incidentsettingspage">
                    <IncidentSettingsPage />
                </Route>
                <Route path="/incident/incidentaddfield">
                    <IncidentAddField />
                </Route>
                <Route path="/incident/incidentviewpage">
                    <IncidentViewPage />
                </Route>
                <Route path="/incident/incidentstagepage">
                    <IncidentStagePage />
                </Route>
                <Route path="/incident/incidentnotificationpage">
                    <IncidentNotificationPage />
                </Route>
                <Route exact path="/lookups/lookupinventory">
                    <LookupInventory />
                </Route>
                <Route path="/lookups/lookupsaddpage">
                    <LookupsAddPage />
                </Route>
                <Route path="/lookupslookupssettingspage">
                    <LookupsSettingsPage />
                </Route>
                <Route exact path="/location/locationinventory">
                    <LocationInventory />
                </Route>
                <Route path="/location/locationaddpage">
                    <LocationAddPage />
                </Route>
                <Route path="/notification/notificationinventory">
                    <NotificationInventory />
                </Route>
                <Route path="/permission/stagepermission">
                    <StagePermission />
                </Route>
                <Route path="/usermanagement/userlist">
                    <UserList />
                </Route>
                <Route path="/auditlog/auditlog">
                    <AuditLog />
                </Route>
                <Route path="/configurationsettings/configuration">
                    <Configuration />
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default RouteSide
