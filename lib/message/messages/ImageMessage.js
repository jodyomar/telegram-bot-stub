var inherit = require('inherit');
var Message = require('./Message');

/**
 * @name ImageMessage
 * @augments {Message}
 */
var ImageMessage = inherit(Message, {
    /**
     * @param {Object} data
     * @param {String} data.image
     * @param {String} data.caption
     */
    __constructor: function (data) {
        this.__base.apply(this, arguments);

        this._image = data.image;
        this._caption = data.caption;
    },

    getImage: function () {
        return this._image;
    },

    getCaption: function () {
        return this._caption;
    },

    getType: function () {
        return 'image';
    }
});

module.exports = ImageMessage;