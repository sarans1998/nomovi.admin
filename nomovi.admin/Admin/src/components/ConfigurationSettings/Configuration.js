import React  from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import InputColor from 'react-input-color';
import { PhotoshopPicker } from 'react-color';
import $ from "jquery";

class Configuration extends React.Component {
    
    state = {
        background: '#457fca',
        colorPicker1: false,
        colorPickerValue1: "#fff",
        
    };
   
    // const [menuActive, setMenuState] = React.useState(false);
    toggle = () => {
        // this.setState({ colorPicker1: !this.state.colorPicker1 });
        $(".photoshop-picker").toggleClass("active");
      };
    setTheme(color) {
        if( color === "default")
            color = "#262253"

        document.documentElement.style.setProperty("--background-color", color);
        // $(".sketch-picker .flexbox-fix:nth-of-type(3) input:nth-child(0)").addClass("red");
        $(".photoshop-picker :input").attr('value', '' + color.replace("#", "")).val(color.replace("#", "")); 
    }
   
  
    handleChangeComplete = (color, event) => {
        document.documentElement.style.setProperty("--background-color", color.hex);
        // $('.bg-color').addClass("bg-color");
        //  $(".bg-color").css('--background-color', '' + color.hex);
     
        this.setState({ background: color.hex });
    };

    // const [initial, setInitial] = React.useState('#5e72e4');
    // const [color, setColor] = React.useState(':root');
    // const onChange = () => setColor('--background-color')
    
    render() {
        
        return (
            <Container fluid>
                <Row>
                    <Col sm={12}>
                        <div className="m-custom-incident">
                            <div className="table-title">
                                <div>Configuration</div>
                            </div>
                            
                            <Container fluid className="m-t-30">
                                <Row>
                                    <Col sm={2}>
                                        <label className="control-label">
                                            Choose a theme
                                        </label>
                                    </Col>
                                    <Col sm={10}>
                                        <ul>
                                            <Row>
                                                <Col sm={4} className="config-skin">
                                                    <li>
                                                        <div className="green"></div>
                                                        <span onClick={() => this.setTheme("#78b83e")}>Green</span>
                                                    </li>
                                                </Col>
                                                <Col sm={4} className="config-skin">
                                                    <li>
                                                        <div className="blue"></div>
                                                        <span onClick={() => this.setTheme("#457fca")}>Blue</span>
                                                    </li>
                                                </Col>
                                                <Col sm={4} className="config-skin">
                                                    <li>
                                                        <div className="cyan"></div>
                                                        <span onClick={() => this.setTheme("#379c94")}>Cyan</span>
                                                    </li>
                                                </Col>
                                                <Col sm={4} className="config-skin">
                                                    <li>
                                                        <div className="black"></div>
                                                        <span onClick={() => this.setTheme("#000000")}>Dark</span>
                                                    </li>
                                                </Col>
                                            </Row>
                                        </ul>
                                    </Col>
                                    <Col sm={2} style={{ marginBottom: 25 }}>
                                        <label className="control-label">
                                            Menu
                                    </label>
                                    </Col>
                                    <Col sm={10}>
                                        <label className="switch">
                                            <input type="checkbox" className="toggle"  aria-hidden="true"/>
                                            <span className="slider round"></span>
                                        </label>
                                    </Col>
                                    <Col sm={2}>
                                        <label className="control-label">
                                            Custom theme
                                    </label>
                                    </Col>
                                    <Col sm={10}>
                                        <div className="color-pick">
                                        <div color={ this.state.background } onChangeComplete={this.handleChangeComplete}
                                            className="pickr mx-auto"
                                            onClick={this.toggle}
                                        />
                                        <div className="colorpickerpalette">
                                           <PhotoshopPicker  color={ this.state.background } onChangeComplete={this.handleChangeComplete} onAccept={this.toggle} onCancel={this.toggle} disablergb ='true'/>
                                        </div>
                                           
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Configuration
