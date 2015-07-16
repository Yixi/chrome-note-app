/**
 * Created by Yixi on 7/14/15.
 */

'use strict';

require('./NoteContent.less');
import React from 'react';


var NoteContent = React.createClass({

    getInitialState(){
        return {
            noteContent:this.props.content,
            noteId:this.props.noteId
        }
    },

    _buildEditor(){
        var options = {
            editor: React.findDOMNode(this.refs.noteContent),
            list: ['blockquote', 'p', 'insertorderedlist', 'insertunorderedlist',
                'indent', 'outdent', 'bold', 'italic', 'createlink'] // editor menu list
        };

        var editor = new Pen(options);
    },

    componentDidMount(){
        this._buildEditor();
    },

    componentDidUpdate(){
        this._buildEditor();
    },

    componentWillReceiveProps(nextProps){
        this.setState({
            noteContent:nextProps.content,
            noteId:nextProps.noteId
        })
    },

    onInput(event){
        clearTimeout(this.Timer);
        this.Timer = setTimeout(()=>{
            this.props.onChange(React.findDOMNode(this.refs.noteContent).innerHTML);
        },20);
    },

    render(){
        return (
            <div key={this.state.noteId} className="noteContent" ref="noteContent" onInput={this.onInput}
                dangerouslySetInnerHTML = {{__html:this.state.noteContent}}
                >
            </div>
        );

    }
});

export default NoteContent