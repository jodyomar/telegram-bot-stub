/**
 * @class
 * @name ICommandHandler
 * @static
 */
var command = {
    /**
     * @name ICommandHandler.get
     * @param {Object} info Object with info about user message.
     * @param {IUser} info.user User info.
     * @param {Object} info.message Original telegram message.
     * @param {Object} info.params Command parms. For example, params of command "/get Kristina" — "Kristina".
     * @returns {Promise}
     */
    get: function (info) {
        // return vow.resolve(new Message({
        //     message: 'Hello world!'
        // }));
    }
};
