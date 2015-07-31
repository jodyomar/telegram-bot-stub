var inherit = require('inherit');

/**
 * @class
 * @name Message
 */
var Message = inherit({
    __constructor: function (data) {
        this.setData(data);
    },

    getData: function () {
        return this._data;
    },

    getMessage: function () {
        return this._data.message; 
    },

    getType: function () {
        return this._data.type;
    }
});

module.exports = Message;