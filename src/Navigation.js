import React from 'react'
import {  Nav, Navbar } from 'reactstrap';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import View from './View';
import ViewOne from './ViewOne';
import Create from './Create';
import Update from './Update';





function Navigation() {

    return (
        < Router>

            <Navbar >
                <Nav>
                    
                    <Link to="/view">View</Link>&nbsp;&nbsp;
                    <Link to="/create">Create</Link>
                </Nav>
            </Navbar>

            <Switch>
                <Route path="/" exact ><View  /></Route>
                <Route path='/view' render={(props) => <View {...props} />} />
                <Route path="/create"><Create /></Route>
                <Route path='/update/:id' render={(props) => <Update {...props} />} />
                <Route path='/viewone/:id' render={(props) => <ViewOne {...props} />} />
            </Switch>

        </Router>
    )

}



export default Navigation;