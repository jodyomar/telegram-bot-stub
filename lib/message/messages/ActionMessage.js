var inherit = require('inherit');
var Message = require('./Message');

/**
 * @name ActionMessage
 * @augments {Message}
 */
var ActionMessage = inherit(Message, {
    /**
     * @param {Object} data
     * @param {String} data.action
     * @param {Object} data.data
     * @param {String} data.message
     */
    __constructor: function (data) {
        this.__base.apply(this, arguments);

        this._action = data.action;
        this._actionData = data.data;
    },

    getActionType: function () {
        return this._action;
    },

    getActionData: function () {
        return this._actionData;
    },

    getType: function () {
        return 'action';
    }
});

module.exports = ActionMessage;