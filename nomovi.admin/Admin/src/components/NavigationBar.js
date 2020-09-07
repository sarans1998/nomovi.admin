import React, { useRef } from "react";
import ColorTheme from './RightSideBar/ColorTheme'
import WhatsNew from './RightSideBar/WhatsNew'
import NewUser from './RightSideBar/NewUser'
import useOutsideClick from "./RightSideBar/useOutsideClick";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function NavigationBar() {
    const [menuActive, setMenuState] = React.useState(false);

    const [ShowColor, setShowColor] = React.useState(false)
    const [ShowWhat, setShowWhat] = React.useState(false)
    const [ShowUser, setShowUser] = React.useState(false)
    const ref = useRef();

    useOutsideClick(ref, () => {
        if (ShowColor) setShowColor(false);
        if (ShowWhat) setShowWhat(false);
        if (ShowUser) setShowUser(false);
    });


    return (
        <div className={`menu-item ${menuActive ? "lstogglemenu" : ""}`}>
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <nav className="navbar navbar-expand-lg navbar-light bg-color full-navbar">
                            <React.Fragment>
                                <div className="custom-brand1 w-auto">
                                    <div>
                                        <i className="fa fa-bars bar-icon" onClick={() => setMenuState(!menuActive)} aria-hidden="true"></i>
                                        <a className="navbar-brand brand-color" href="#">Nomovi</a>
                                        <i className="fa fa-exchange toggle-icon" onClick={() => setMenuState(!menuActive)} aria-hidden="true"></i>
                                    </div>

                                    {/* {ShowMenu ? <MenuSide /> : null} */}
                                </div>
                                <div ref={ref}>
                                    <i className="fa fa-cog settings-icon" onClick={() => setShowColor(!ShowColor)}></i>
                                    {ShowColor && (<ColorTheme />)}
                                    <i className="fa fa-question-circle-o question-icon" onClick={() => setShowWhat(!ShowWhat)}></i>
                                    {ShowWhat && (<WhatsNew />)}
                                    <div className="user" onClick={() => setShowUser(!ShowUser)}>
                                        <span className="name-circle">UserName</span>
                                        <span className="user-circle" >U</span>
                                    </div>
                                    {ShowUser && (<NewUser />)}
                                </div>
                            </React.Fragment>
                        </nav>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default NavigationBar;



