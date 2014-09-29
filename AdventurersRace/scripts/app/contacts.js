/**
 * Contacts view model
 */

var app = app || {};

app.contacts = (function () {
    'use strict';
    
    function show(e) {
        function onSuccess(contacts) {
            //debugger;
            console.log(contacts);
            
        }

        function onError(contactError) {
            alert('onError!');
        }
        
        function getContacts() {
             //find all contacts with 'Bob' in any name field
            //debugger;
            var fields = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
            var options = new ContactFindOptions();
            options.filter = "t";
            options.multiple = true;
            navigator.contacts.find(fields, onSuccess, onError, options);
        }
        
       // debugger;
        getContacts();
        //console.log(navigator);
        //console.log(navigator.contacts);
        
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