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
            
            getUserFromDb();
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
        
        function getUserFromDb() {
            var el = new Everlive('HAp0eHbnKuAuxQsa');
            var filter = new Everlive.Query();
            filter.where().isin('Phone', phoneNumbers);
            filter.orderDesc('Points');

            var data = el.data('Users');
            
            data.get(filter)
                .then(function(data) {
                    //alert(JSON.stringify(data));
                    //console.log(data);
                    var vm = kendo.observable(data);
                    //app.contacts.vm = vm;
                    //console.log(vm);
                    kendo.bind($("#listContacts"), vm);
                    //console.log(data.result[0].Username);
                },
                      function(error) {
                          alert(JSON.stringify(error));
                      });
        }
        
        //var data = {
        //    data: [{
        //                Points: 1,
        //                Username: 'Bob'
        //            }, {
        //                Points: 2,
        //                Username: 'Mary'
        //            }
        //    ]
        //};
        //var vm = kendo.observable(data);
        //app.contacts.vm = vm;
        //console.log(vm);
        //kendo.bind($("#listContacts"), vm);
    }

    return {
        show: show  
    };
}());