/**
 * Created by Yixi on 7/15/15.
 */
/*
 Data format:
 -"notes":
 |------   |-------|----------|-------|-------|--------|----- |--------|-----------|-----------|----------|
 |   id   |  title |  content |  url  |  list |  topic |  tag |  color |   created |   updated |  user_id |
 |------- |--------|----------|-------|-------|--------|------|--------|-----------|-----------|----------|

 */

'use strict';

var DB;

var getObjectStore = (name,mode) => {
    return DB.transaction([name],(mode == 1 ? 'readwrite' : 'readonly')).objectStore(name);
};

var openDataBase = () => {
    return new Promise((resolve,reject) => {
        var  request = window.indexedDB.open('FastNote',1);
        request.onerror = function(event){
            reject('open data base error');
        };

        request.onupgradeneeded = function(event){
            DB = event.target.result;
            if(!DB.objectStoreNames.contains("notes")){
                var store = DB.createObjectStore("notes", { keyPath: 'id', autoIncrement: true });
                store.createIndex('updated', 'updated', { unique: false });
            }
        };

        request.onsuccess = function(event){
            DB = event.target.result;
            resolve();
        }

    });
};

var init = () => {
    return new Promise( (resolve,reject) => {
        openDataBase().then(() => {
            resolve();
        },(error) => {
            console.error(error);
        })
    });
};

var addNote = (note) => {
    if(!note) note = {};
    return new Promise( (resolve,reject) => {
        var now = Date.parse(new Date())/1000;
        var request = getObjectStore('notes',1).add({
            title:note.title || "",
            content: note.content || "",
            url: "",
            list:"",
            topic: note.topic || "",
            tag: note.tag || "",
            color: note.color || "",
            created: now,
            updated: now,
            user_id:0
        });

        request.onsuccess = (event) => {
            getNote(event.target.result).then(
                (note)=>{
                    resolve(note);
                }
            )
        };

        request.onerror = (error) => {
            reject("add note error :" + error.message);
        };

    });
};

var getAllNotes = () => {
    return new Promise( (resolve,reject) => {
        var data = [];
        var request = getObjectStore('notes',0).openCursor();
        request.onsuccess = (event) => {
            var cursor = event.target.result;
            if(cursor){
                data.push(cursor.value);
                cursor.continue();
            }else{
                resolve(data);
            }
        };

        request.onerror = (error) => {
            reject("get All data error :" + error.message);
        };

    });
};

var getNote = (id) => {
    return new Promise( (resolve,reject) => {
        var request = getObjectStore('notes',0).get(id);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (error) => {
            console.error('get note '+ id + ' error');
            reject(error.message);
        }
    });
};

export default {
    init:init,
    addNote:addNote,
    getAllNotes:getAllNotes
};






