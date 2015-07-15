/**
 * Created by liuyixi on 7/15/15.
 */


'use strict';
require('./AddButton.less');

import React from 'react';

import NoteActionCreators from './libs/NoteActionCreators.js';

var AddButton  = React.createClass({


    _onClick(){
        NoteActionCreators.AddNewNote();
    },

    render(){
        return (
            <div id="AddButton" onClick={this._onClick}>
                <i className="plus icon"></i>
            </div>
        )
    }
});


export default AddButton;