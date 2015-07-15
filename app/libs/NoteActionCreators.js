/**
 * Created by Yixi on 7/15/15.
 */

'use strict';

import NoteDispatcher from './NoteDispatcher.js';
import NOTE from './NOTE.js';


export default {
    AddNewNote(){
        NoteDispatcher.dispatch({
            type:NOTE.ADD_NEW_EMPTY_NOTE
        })
    }
};