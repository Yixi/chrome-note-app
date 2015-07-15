/**
 * Created by Yixi on 7/14/15.
 */

'use strict';
require('./MainApp.less');

import React from 'react';


import SideBar from './SideBar.js';
import DisplayNote from './DisplayNote.js';
import AddButton from './AddButton.js';

var MainApp  = React.createClass({

    getInitialState(){
        return {
            selectNoteId:null
        }
    },

    _onNoteSelectChange(id){
        console.log(id);
        this.setState({selectNoteId:id});
    },

    render(){
        return (
            <div id="appWrapper">
                <div id="sideBar">
                    <SideBar onNoteSelectChange={this._onNoteSelectChange} focusId={this.state.selectNoteId}/>
                </div>
                <div id="mainArea">
                    <DisplayNote focusId={this.state.selectNoteId}/>
                </div>
                <AddButton />
            </div>
        )
    }
});

export default MainApp;