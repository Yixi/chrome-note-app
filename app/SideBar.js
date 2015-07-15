/**
 * Created by Yixi on 7/14/15.
 */

'use strict';

require('./SideBar.less');

import React from 'react';

import NoteStore from './store/NoteStore.js';

import NoteList from './NoteList.js';


var getNotes = () => {
    return {
        notes:NoteStore.getAllNotes()
    }
};

var SideBar  = React.createClass({

    getInitialState(){
        return getNotes();
    },

    componentDidMount(){
        NoteStore.addChangeListener(this._onNotesChange);
    },

    componentWillUnmount(){
        NoteStore.removeChangeListener(this._onNotesChange);
    },


    _onNotesChange(){
        this.setState(getNotes());
    },

    _onNoteSelectChange(id){
        console.log(id);
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
                <NoteList notes={this.state.notes} {...this.props}/>
            </div>
        )
    }
});

export default SideBar;