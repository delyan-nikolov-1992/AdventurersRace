/**
 * Contacts view model
 */

var app = app || {};

app.Contacts = (function () {
    'use strict'

    var contactsViewModel = (function () {
        var result = [];

        var users = new kendo.data.DataSource({
            data: [{
                Points: 1,
                Username: 'Bob'
                }, {
                Points: 2,
                Username: 'Mary'
                }]
        });

        return {
            contacts: users
        };

    }());

    return contactsViewModel;

}());