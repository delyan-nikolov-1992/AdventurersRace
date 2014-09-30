var app = app || {};
app.checkLocation = app.checkLocation || {};

(function (app) {
    app.checkLocation.init = function (location) {
        var EarthRadius = 6371; // Radius of the earth in km
        var SearchedDistance = 5; // in km

        function loadPhotos() {
            Everlive.$.Users.currentUser(function (currUser) {
                var userId = currUser.result.Id; // the user info
                checkLocation(userId);
            }, function (error) {
                error; // error info if no current user
            });
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
                    } else{
                        alert("You have added the image, but you have already a point from this location.");
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