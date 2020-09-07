import React from 'react'
import { faPlus, faHome, faExclamationTriangle, faExclamationCircle, faBell, faMapMarkerAlt, faSearch, faShieldAlt, faUser, faAddressBook, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom"
import MasterPopup from '../MenuPopup/MasterPopup'
import IncidentPopup from '../MenuPopup/IncidentPopup'
import LookupsPopup from '../MenuPopup/LookupsPopup'
import LocationsPopup from '../MenuPopup/LocationsPopup'
import NotificationsPopup from '../MenuPopup/NotificationsPopup'
import StagePopup from '../MenuPopup/StagePopup'
import UserPopup from '../MenuPopup/UserPopup'
import AuditPopup from '../MenuPopup/AuditPopup'
import ConfigPopup from '../MenuPopup/ConfigPopup'
import { NavLink } from 'react-router-dom';

function MenuSide() {
    return (
        <div className="custom-sidebar">
            {/* <ul id="list-id"> */}
            <li className="admin-configure">
                <span className="admin-configure">ADMIN CONFIGURATION</span>
                <FontAwesomeIcon icon={faHome} className="togglemenuicon" />
            </li>
            <li key="mi">
                <NavLink to="/master/masterincidentinventory" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <span className="hide-menu"> Master Incident</span>
                    <MasterPopup />
                </NavLink>
            </li>
            <li>
                <NavLink to="/incident/incidentinventory" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <span className="hide-menu"> Incident</span>
                    <IncidentPopup />
                </NavLink>
            </li>
            <li>
                <NavLink to="/lookups/lookupinventory" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faSearch} />
                    <span className="hide-menu"> Lookups</span>
                    <LookupsPopup />
                </NavLink>
            </li>
            <li>
                <NavLink to="/location/locationinventory" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span className="hide-menu"> Locations</span>
                    <LocationsPopup />
                </NavLink>
            </li>
            <li>
                <NavLink to="/notification/notificationinventory" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faBell} />
                    <span className="hide-menu"> Notifications</span>
                    <NotificationsPopup />
                </NavLink>
            </li>
            <li>
                <NavLink to="/permission/stagepermission" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faShieldAlt} />
                    <span className="hide-menu"> Stage Permission</span>
                    <StagePopup />
                </NavLink>
            </li>
            <li>
                <NavLink to="/usermanagement/userlist" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="hide-menu"> User Management</span>
                    <UserPopup />
                </NavLink>
            </li>
            <li>
                <NavLink to="/auditlog/auditlog" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faAddressBook} />
                    <span className="hide-menu"> Audit Log</span>
                    <AuditPopup />
                </NavLink>
            </li>
            <li>
                <NavLink to="/configurationsettings/configuration" className="custom-menu-style" activeClassName="li-active">
                    <FontAwesomeIcon icon={faCog} />
                    <span className="hide-menu"> Configuration</span>
                    <ConfigPopup />
                </NavLink>
            </li>
            {/* </ul> */}
        </div>
    )
}

export default MenuSide
