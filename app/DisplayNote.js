/**
 * Created by Yixi on 7/14/15.
 */

'use strict';

import React from 'react';


import NoteContent from './NoteContent.js';
import NoteStore from './store/NoteStore.js';

var DisplayNote = React.createClass({

    getInitialState(){
        return {
            noteId:"",
            noteContent:""
        }
    },

    componentWillReceiveProps(nextProps){
        var nextFocusId = nextProps.focusId;
        NoteStore.getNoteAsync(nextFocusId).then((note) => {

            console.log(note);
            this.setState({
                noteContent:note.content,
                noteId:note.id
            });
        });
    },

    onNoteContentChange(content){
        NoteStore.updateNote({
            id:this.state.noteId,
            content:content
        })
    },

    render(){
        return (
            <div className="displayNote">
                note title {this.state.noteId}
                <NoteContent content={this.state.noteContent} noteId={this.state.noteId} onChange={this.onNoteContentChange}/>
            </div>
        );

    }
});

export default DisplayNote