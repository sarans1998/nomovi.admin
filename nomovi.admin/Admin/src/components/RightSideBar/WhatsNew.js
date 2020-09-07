import React, { useRef } from "react";
import useOutsideClick from "./useOutsideClick";
import KeyboardShortcuts from './KeyboardShortcuts';

function WhatsNew() {

    const [ShowColor, setShowColor] = React.useState(false);
    const ref = useRef();

    useOutsideClick(ref, () => {
        if (ShowColor) setShowColor(false);
    });

    return (
        <div className="font-show">
            <div className="custom-picker">
                <p className="skin-text">Help</p>
                <li>
                    <a href="#">
                        <span>What's New</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>Launch guided tour</span>
                    </a>
                </li>
                <li>
                    <div onClick={() => setShowColor(!ShowColor)}>
                        <span>Keyboard shortcuts</span>
                    </div>
                </li>
                {ShowColor && (<KeyboardShortcuts />)}
                <li>
                    <a href="#">
                        <span>Privacy statement</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span>Version 0.0.2.1</span>
                    </a>
                </li>
            </div>
        </div>
    )
}

export default WhatsNew


