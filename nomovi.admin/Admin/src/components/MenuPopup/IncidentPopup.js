import React from 'react'
import { faPlus, faEye, faExclamationTriangle, faExclamationCircle, faBell, faMapMarkerAlt, faSearch, faShieldAlt, faUser, faAddressBook, faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IncidentPopup = () => (
        <div className="master-show">
            <div className="menu-popup">
                <div className="popup-header">
                    <div><FontAwesomeIcon icon={faExclamationTriangle} className="menu-icon"/></div>
                    <div className="popup-menu-name">Incident</div>
                </div>
                <div className="popup-body">
                    <div className="flex-popup">
                        <a>
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Add</span>
                        </a>
                    </div>
                    <div className="flex-popup">
                        <a>
                            <FontAwesomeIcon icon={faEye} />
                            <span>View</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
)

export default IncidentPopup