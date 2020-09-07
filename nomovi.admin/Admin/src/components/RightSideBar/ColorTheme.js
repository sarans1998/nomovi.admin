import React from 'react'
import InputColor from 'react-input-color';


class ColorTheme extends React.Component {
    constructor(props) {
        super(props)
    }
    setTheme(color) {
        if( color === "default")
            color = "#262253"

        document
            .documentElement
            .style
            .setProperty("--background-color", color);
    }
    render() {
        return (
            <div>
                <div className="font-show">
        <div className="custom-picker">
            <p className="skin-text">Skins</p>
            <li>
                <a href="#" >
                    <span className="custom-color">Dark Theme</span>
                </a>
            </li>
            <li>
                <a href="#" >
                    <div className="color-black"></div>
                    <span>Dark</span>
                </a>
            </li>
            <li>
                <a href="#">
                    <span className="custom-color">Flat Color</span>
                </a>
            </li>
            <li>
                <a href="#" onClick={() => this.setTheme("#78b83e")}>
                    <div className="color-green"></div>
                    <span>Green</span>
                </a>
            </li>
            <li>
                <a href="#" onClick={() => this.setTheme("#457fca")}>
                    <div className="color-blue"></div>
                    <span>Blue</span>
                </a>
            </li>
            <li>
                <a href="#" onClick={() => this.setTheme("#379c94")}>
                    <div className="color-cyan"></div>
                    <span>Cyan</span>
                </a>
            </li>
            <li>
                
                <a href="#">
                    <div className="color-custom"></div>
                    <span>Custom Color</span>
                </a>
            </li>
           
        </div>
    </div>
                 
            </div>
           
        )
    }
}

export default ColorTheme
