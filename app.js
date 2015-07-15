/**
 * Created by Yixi on 7/14/15.
 */

'use strict';

import React from 'react';

import MainApp from './app/MainApp.js';

import DB from './app/libs/DB.js';

DB.init().then(()=>{
    React.render(<MainApp />,document.getElementById('_mainRender'));
});

