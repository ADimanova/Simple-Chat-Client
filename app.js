(function () {
    require.config({
        paths: {
            //libraries
            "sammy": "libs/sammy",
            "jquery": "libs/jquery-2.1.1.min",
            "Q": "libs/q",
            "mustache": "libs/mustache",

            //app scripts
            "requester": "scripts/requester",
            "loader": "scripts/functions-loader",
            "viewer": "scripts/output-loader"
        }
    });

    require(["jquery", "sammy", "loader"], function ($, sammy, loader) {
       var $container = $("#main-content");

        var app = sammy("#main-content", function () {
            this.get("#/home", function () {
                loader.loadView($container, "views/home-view.html");
            });

            this.get("#/chat", function () {
                loader.loadView($container, "views/message-form.html")
                    .then(function() {
                        loader.loadPostForm();
                    });
            });

            this.get("#/about", function () {
                loader.loadView($container, "views/about-view.html");
            });

        });
        app.run("#/home");

    });
}());
