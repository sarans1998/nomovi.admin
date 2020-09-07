// import React, { Component } from 'react'
// import { PhotoshopPicker } from 'react-color';

// class ColorPicker extends Component {
//     state = {
//         background: '#fff',
//       };
    
//       handleChangeComplete = (color) => {
//         this.setState({ background: color.hex });
//       };
    
//       render() {
//         return (
//           <PhotoshopPicker
//             color={ this.state.background }
//             onChangeComplete={ this.handleChangeComplete }
//           />
//         );
//       }
// }

// export default ColorPicker


import React, { Component } from 'react'


var React = require('react')

var ColorPicker = require('react-color-picker')
require('react-color-picker/index.css')

var COLOR = 'red'

class ColorPicker extends Component {

    render(){

        return (
            <div style={{padding: 10}}>
                <ColorPicker value={COLOR} onDrag={this.onDrag} />
                <div style={{background: COLOR, width: 100, height: 50, color: 'white'}}>
                    {COLOR}
                </div>
            </div>
        )
    }
}

export default ColorPicker
