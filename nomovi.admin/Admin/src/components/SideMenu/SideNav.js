import React from 'react'
import RouteSide from './RouteSide'
import MenuSide from './MenuSide'
import {
    BrowserRouter as Router,
} from "react-router-dom"

function SideNav() {
    return (
        <Router>
            <div className="sidebar-w">
                <MenuSide />
                <RouteSide />
            </div>
        </Router>
    )
}

export default SideNav