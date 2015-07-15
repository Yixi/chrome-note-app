/**
 * Created by Yixi on 7/15/15.
 */

'use strict';

import assign from 'object-assign';


var invariant = (condition, format, a, b, c, d ,e, f) =>{
    if (!condition) {
        var error;
        if (format === undefined) {
            error = new Error(
                'Minified exception occurred; use the non-minified dev environment ' +
                'for the full error message and additional helpful warnings.'
            );
        } else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(
                'Invariant Violation: ' +
                format.replace(/%s/g, function() { return args[argIndex++]; })
            );
        }

        error.framesToPop = 1; // we don't care about invariant's own frame
        throw error;
    }
};


var _prefix = "ID_";

//var Dispatcher = function(){};

//Dispatcher.prototype = assign({},Dispatcher.prototype,{
class Dispatcher{
    constructor(){
        this._lastId = 1;
        this._callbacks = {};
        this._isPending = {};
        this._isHandled = {};
        this._isDispatching = false;
        this._pendingPayload = null;
    }

    /**
     * registers a callback to be invoked every dispatched payload.
     */
    register(callback){
        var id = _prefix + this._lastId++;
        this._callbacks[id] = callback;
        return id;
    }


    unregister(id){
        invariant(
            this._callbacks[id],
            'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
            id
        );
        delete this._callbacks[id];
    }
    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     *
     * @param {array} ids
     */
    waitFor(ids){
        invariant(
            this._isDispatching,
            'Dispatcher.waitFor(...): Must be invoked while dispatching.'
        );

        for(var ii=0; ii < ids.length; ii++){
            var id = ids[ii];
            if(this._isPending[id]){
                invariant(
                    this._isHandled[id],
                    'Dispatcher.waitFor(...): Circular dependency detected while ' +
                    'waiting for `%s`.',
                    id
                );
                continue;
            }
            invariant(
                this._callbacks[id],
                'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
                id
            );

            this._invokeCallback(id);
        }
    }

    /**
     * Dispatches a payload to all registered callbacks.
     *
     * @param {object} payload
     */
    dispatch(payload) {
        invariant(
            !this._isDispatching,
            'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
        );
        this._startDispatching(payload);
        try {
            for (var id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        } finally {
            this._stopDispatching();
        }
    }

    /**
     * Is this Dispatcher currently dispatching.
     *
     * @return {boolean}
     */
    isDispatching() {
        return this._isDispatching;
    }


    _invokeCallback(id){
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayload);
        this._isHandled[id] = true;
    }
    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @param {object} payload
     * @internal
     */
    _startDispatching(payload) {
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    }

    /**
     * Clear bookkeeping used for dispatching.
     *
     * @internal
     */
    _stopDispatching() {
        this._pendingPayload = null;
        this._isDispatching = false;
    }

}

export default Dispatcher;