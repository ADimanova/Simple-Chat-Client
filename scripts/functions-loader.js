define(["jquery", "requester", "Q", "viewer"], function ($, requester, Q, viewer) {
    'use strict';
    var functionsLoader = (function () {
        var loaderObj = {};

        loaderObj.loadPostForm = function () {
            var $getBtn, $submit;
            var $resultPlace = $('#get-result');

            $getBtn = $('#get-button');
            $submit = $('#submit-btn');

            viewer.loadPosts($resultPlace);

            $($getBtn).on('click', function () {
                viewer.loadPosts($resultPlace);
            });

            $($submit).on('click', function () {
                event.preventDefault();
                var user, message;
                user = $('#user').val();
                message = $('#message').val();

                requester.postRequest({
                        user: user,
                        text: message
                    }
                )
                    .then(function () {
                        viewer.loadPosts($resultPlace);
                    });
            });
        };

        //Used to load content from an external html file into a container
        //in the current document.
        loaderObj.loadView = function loadView(constainer, file) {
            var deferred = Q.defer();
            $(constainer).load(file, function () {
                deferred.resolve();
            });

            return deferred.promise;
        };

        return loaderObj;
    }());

    return functionsLoader;
});