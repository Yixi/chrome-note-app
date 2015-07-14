/**
 * Created by Yixi on 7/14/15.
 */

'use strict';


import objectAssign from 'object-assign';
import {EventEmitter} from 'events';


var Notes = [
    {
        "title":"test note 1",
        "content":"this is a test note"
    },
    {
        "title":"test note 2",
        "content":"this is a test note"
    },
    {
        "title":"test note 3",
        "content":"this is a test note"
    },
    {
        "title":"test note 4",
        "content":"this is a test note"
    },
    {
        "title":"test note 5",
        "content":"this is a test note"
    },{
        "title":"test note 6",
        "content":"this is a test note"
    }

];


var NoteStore = objectAssign({},EventEmitter.prototype,{


    getAllNotes(){
        return Notes;
    }

});


export default NoteStore;