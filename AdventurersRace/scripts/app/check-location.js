var app = app || {};
app.checkLocation = app.checkLocation || {};

(function (app) {
    app.checkLocation.init = function (location) {
        var EarthRadius = 6371; // Radius of the earth in km
        var SearchedDistance = 5; // in km

        function onSuccess(contact) {
            alert("Save Success");
        };

        function onError(contactError) {
            alert("Error = " + contactError.code);
        };

        function loadPhotos() {
            Everlive.$.Users.currentUser(function (currUser) {
                var userId = currUser.result.Id; // the user info
                createContact();
                checkLocation(userId);
            }, function (error) {
                error; // error info if no current user
            });
        }

        function createContact() {
            var contact = navigator.contacts.create();
            contact.displayName = "Plumber";
            contact.nickname = "Plumber"; // specify both to support all devices

            // populate some fields
            var name = new ContactName();
            name.givenName = "Jane";
            name.familyName = "Doe";
            contact.name = name;

            var phoneNumbers = [];
            phoneNumbers[0] = new ContactField('work', '212-555-1234', false);
            phoneNumbers[1] = new ContactField('mobile', '917-555-5432', true); // preferred number
            phoneNumbers[2] = new ContactField('home', '203-555-7890', false);
            contact.phoneNumbers = phoneNumbers;

            // save to device
            contact.save(onSuccess, onError);
            console.log(contact);
        }

        function checkLocation(userId) {
            $.ajax({
                type: "GET",
                url: 'http://api.everlive.com/v1/HAp0eHbnKuAuxQsa/Images',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("sessionKey")
                },
                contentType: "application/json",
                success: function (data) {
                    var i,
                        len,
                        images = data.Result,
                        result = true;

                    for (i = 0, len = images.length; i < len; i++) {
                        if (images[i].CreatedBy === userId &&
                            checkRadius(images[i].Location)) {

                            result = false;
                            break;
                        }
                    }

                    if (result) {
                        app.addPoint.init(userId);
                    }
                },
                error: function (error) {
                    alert(JSON.stringify(error));
                }
            });
        }

        function checkRadius(imageLocation) {
            var maxLat = Math.max(imageLocation.latitude, location.latitude);
            var minLat = Math.min(imageLocation.latitude, location.latitude);
            var maxLon = Math.max(imageLocation.longitude, location.longitude);
            var minLon = Math.min(imageLocation.longitude, location.longitude);

            var dLatInDegrees = maxLat - minLat;

            var dLat = toRad(dLatInDegrees);

            var dLonInDegrees = maxLon - minLon;

            var dLon = toRad(dLonInDegrees);

            var angle = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(minLat)) * Math.cos(toRad(maxLat)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            var counterAngle = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1 - angle));
            var distance = EarthRadius * counterAngle; // Distance in km
            console.log(distance);

            if (distance <= SearchedDistance) {
                return true;
            }

            return false;
        }

        function toRad(degree) {
            return degree * Math.PI / 180;
        }

        loadPhotos();
    };
}(app));