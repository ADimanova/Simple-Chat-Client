define(['jquery', 'Q'], function ($, Q) {
    'use strict';
    var requester = (function() {
        var defaultUrl, requesterObj;

        requesterObj = {};
        defaultUrl = 'http://crowd-chat.herokuapp.com/posts';

        requesterObj.getRequest = function getRequest() {
            return makeRequest({
                url: defaultUrl,
                data: null,
                type: 'GET'
            });
        };

        requesterObj.postRequest = function postRequest(data) {
            var options = {};
            if(!data) {
                throw Error('You must provide data for the POST request.');
            }

            options.url = defaultUrl;
            options.data = data;
            options.type = 'POST';
            return makeRequest({
                url: defaultUrl,
                data: data,
                type: 'POST'
            });
        };

        function makeRequest(options) {
            var deferred;
            deferred = Q.defer();

            $.ajax({
                url: options.url,
                type: options.type,
                data: JSON.stringify(options.data),
                contentType: 'application/json',
                accept: 'application/json',
                success: function (data) {
                    if (data) {
                        return deferred.resolve(data);
                    }
                },
                error: function (err) {
                    if (err) {
                        return deferred.reject(err);
                    }
                }
            });

            return deferred.promise;
        }

        return requesterObj;
    }());

    return requester;
});