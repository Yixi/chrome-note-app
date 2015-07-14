/**
 * Created by Yixi on 7/14/15.
 */

'use strict';

require('./SideBar.less');

import React from 'react';

import NoteStore from './store/NoteStore.js';

import NoteList from './NoteList.js';

var SideBar  = React.createClass({

    getInitialState(){
        return {
            notes:NoteStore.getAllNotes()
        }
    },


    render(){
        return (
            <div className="sideBar">
                <div className="appTitle">Fast Note</div>
                <div className="notesInfo">
                    <div className="point"></div>
                    <div className="info">
                        {this.state.notes.length + " " + "Notes"}
                    </div>
                </div>
                <NoteList notes={this.state.notes}/>
            </div>
        )
    }
});

export default SideBar;