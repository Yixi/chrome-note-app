/**
 * Created by Yixi on 7/14/15.
 */

'use strict';
require('./MainApp.less');

import React from 'react';


import SideBar from './SideBar.js';
import DisplayNote from './DisplayNote.js';

var MainApp  = React.createClass({

    render(){
        return (
            <div id="appWrapper">
                <div id="sideBar">
                    <SideBar />
                </div>
                <div id="mainArea">
                    <DisplayNote />
                </div>
            </div>
        )
    }
});

export default MainApp;