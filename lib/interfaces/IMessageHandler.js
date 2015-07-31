/**
 * @class
 * @name IMessageHandler
 * @static
 */
var messageHandler = {
    /**
     * @name IMessageHandler.get
     * @param {Object} info Object with info about user message.
     * @param {IUser} info.user User info.
     * @param {Object} info.message Original user message.
     * @param {Object} info.data Object with info from analyzer.
     * @returns {Promise} Promise. 
     */
    get: function (info) {}
};