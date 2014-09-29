var app = app || {};
app.addPoint = app.addPoint || {};

(function (app) {
    app.addPoint.init = function (userId) {
        function addPointToUser() {
            var userPoints = {
                "Points": app.Users.currentUser.get('data').Points + 1
            };

            $.ajax({
                type: "PUT",
                url: 'http://api.everlive.com/v1/HAp0eHbnKuAuxQsa/Users/' + app.Users.currentUser.get('data').Id,
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("sessionKey")
                },
                contentType: "application/json",
                data: JSON.stringify(userPoints),
                success: function (data) {
                    alert("You have one point more.")
                },
                error: function (error) {
                    alert(JSON.stringify(error));
                }
            });
        }

        addPointToUser();
    };
}(app));