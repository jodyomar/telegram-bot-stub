var inherit = require('inherit');
var assign = require('object-assign');
var vow = require('vow');

/**
 * @class
 * @name UserController
 */
var UserController = inherit({
    /**
     * @param {App} app Application
     */
    __constructor: function (app) {
        this._app = app;
        this._dbUsersCollection = null;
    },

    /**
     * Set users collection from MongoDB.
     * @param {MongoCollection} usersCollection Collection with users.
     * @returns {UserController}
     */
    setUsersCollection: function (usersCollection) {
        this._dbUsersCollection = usersCollection;
        return this;
    },

    /**
     * Set info for current user.
     * @param {Object} data
     * @returns {Promise}
     */
    setData: function (data) {
        data = data || {};
        var user = this._app.getUser();

        return this._dbUsersCollection.updateOne(
            {_id: user.id},
            {$set:data},
            {upsert: true, w: 1}
        );
    },

    /**
     * Get current user.
     * @returns {Promise}
     */
    get: function () {
        var user = this._app.getUser();
        return this._dbUsersCollection.find({_id: user.id})
            .toArray()
            .then(function (results) {
                return results[0];
            });
    }
});

module.exports = UserController;
