/**
 * Created by Yixi on 7/14/15.
 */

'use strict';

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('app.html', {
        'outerBounds': {
            'width': 800,
            'height': 600
        }
    });
});