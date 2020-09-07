import React from 'react'
import './App.css'
import './Style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import NavigationBar from './components/NavigationBar'
import SideNav from './components/SideMenu/SideNav'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'react-table-v6/react-table.css';



function App() {
    return (
      <div className="App Style menutoggleitem">
          <React.Fragment>
              <NavigationBar />
          </React.Fragment>
          <React.Fragment>
              <SideNav />
          </React.Fragment>
      </div>
    )
  }

export default App;
