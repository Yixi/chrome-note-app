/**
 * Created by Yixi on 7/14/15.
 */

'use strict';


import objectAssign from 'object-assign';
import {EventEmitter} from 'events';

import DB from './../libs/DB.js';
import NOTE from './../libs/NOTE.js';
import NoteDispatcher from './../libs/NoteDispatcher.js';


//var Notes = [
//    {
//        "title":"test note 1",
//        "content":"this is a test note"
//    },
//    {
//        "title":"test note 2",
//        "content":"this is a test note"
//    },
//    {
//        "title":"test note 3",
//        "content":"this is a test note"
//    },
//    {
//        "title":"test note 4",
//        "content":"this is a test note"
//    },
//    {
//        "title":"test note 5",
//        "content":"this is a test note"
//    },{
//        "title":"test note 6",
//        "content":"this is a test note"
//    }
//
//];

var Notes = [];

var loadNotes = () => {
    DB.getAllNotes().then( (notes) => {

    });
};


var NoteStore = objectAssign({},EventEmitter.prototype,{

    getAllNotes(){
        if(Notes.length == 0){

        }
        return Notes;
    },

    emitChange(){
        this.emit(NOTE.NOTE_STORE_CHANGE);
    },

    addChangeListener(callback){
        this.on(NOTE.NOTE_STORE_CHANGE,callback);
    },

    removeChangeListener(callback){
        this.removeChangeListener(NOTE.NOTE_STORE_CHANGE,callback);
    }

});

NoteStore.dispatchToken = NoteDispatcher.register( (action) => {
    switch (action.type){

    }
});


export default NoteStore;