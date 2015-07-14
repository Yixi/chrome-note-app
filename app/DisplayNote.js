/**
 * Created by Yixi on 7/14/15.
 */

'use strict';

import React from 'react';


import NoteContent from './NoteContent.js';


var DisplayNote = React.createClass({

    render(){
        return (
            <div className="displayNote">
                note title
                <NoteContent />
            </div>
        );

    }
});

export default DisplayNote