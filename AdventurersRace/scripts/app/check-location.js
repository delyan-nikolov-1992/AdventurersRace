var app = app || {};
app.checkLocation = app.checkLocation || {};

(function (app) {
    app.checkLocation.init = function (location) {
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
                            images[i].Location.longitude === location.longitude &&
                            images[i].Location.latitude === location.latitude) {
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

        loadPhotos();
    };
}(app));