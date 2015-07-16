/**
 * Created by Yixi on 7/14/15.
 */

'use strict';

require('./NoteList.less');

import React from 'react';
import cx from 'classnames';

import NoteStore from './store/NoteStore.js';

var NoteList = React.createClass({

    _onSelect(){

    },

    render(){

        var _list = (item,i) => {

            var itemClass = cx({
                "item":true,
                "active":item.id == this.props.focusId
            });

            return (
                <div className={itemClass} key={item.id} onClick={this.props.onNoteSelectChange.bind(null,item.id)}>
                    <div className="point"></div>
                    <div className="content">
                        <div className="header">{item.title}</div>
                    </div>
                </div>
            )
        };

        return(
            <div className="noteList">
                {this.props.notes.map(_list)}
            </div>
        )
    }
});


export default NoteList;