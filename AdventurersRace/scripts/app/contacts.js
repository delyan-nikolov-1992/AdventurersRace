/**
 * Contacts view model
 */

var app = app || {};

app.contacts = (function () {
    'use strict';
    
    function show(e) {
        var phoneNumbers = [];
        
        function onSuccess(contacts) {
            var i,
                j,
                contactsLength,
                phonesLength;
            
            for (i = 0, contactsLength = contacts.length; i < contactsLength; i++) {
                var phones = contacts[i].phoneNumbers;
                
                for (j = 0, phonesLength = phones.length; j < phonesLength; j++) {
                    //console.log(phones[j].value);
                    var currentPhone = phones[j].value;
                    phoneNumbers.push(currentPhone);
                }
            }
        }

        function onError() {
            alert('An error has occured by getting the contacts');
        }
        
        function getContacts() {
            var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.phoneNumbers];
            var options = new ContactFindOptions();
            options.multiple = true;
            navigator.contacts.find(fields, onSuccess, onError, options);
        }
        
        getContacts();
        getUserFromDb();
        
        function getUserFromDb() {
            var filter = new Everlive.Query();
            filter.where().isin('Phone', phoneNumbers);

            var data = everlive.data('Users');
            
            data.get(filter)
                .then(function(data) {
                    //alert(JSON.stringify(data));
                    console.log(data);
                },
                      function(error) {
                          alert(JSON.stringify(error));
                      });
        }
        
        var data = {
            data: [{
                        Points: 1,
                        Username: 'Bob'
                    }, {
                        Points: 2,
                        Username: 'Mary'
                    }
            ]
        };
        
        var vm = kendo.observable(data);
        
        kendo.bind(e.view.element, vm);
    }

    return {
        show: show  
    };
}());