/**
 * Contacts view model
 */

var app = app || {};

app.Contacts = (function () {
    'use strict'

    var contactsViewModel = (function () {

        var contacts = new kendo.data.DataSource({
            data: [{
                id: 1,
                name: 'Bob'
                }, {
                id: 2,
                name: 'Mary'
                }]
        });

        return {
            contacts: contacts
        };

    }());

    return contactsViewModel;

}());