define(["jquery", "Q", "requester", "mustache"], function($, Q, requester, Mustache) {
   var outputLoader = (function() {
        var loader, templateReady;
       loader = {};

       function fillTemplate(source) {
           var deferred = Q.defer();

           $.get(source, function (template) {
               deferred.resolve(template);
           });

           return deferred.promise;
       }

       function fillGetResult(template, data) {
           var $resultPlace = $('#get-result');

           var post, postsPlace, rendered;
           postsPlace = document.createElement('ul');
           $(postsPlace).addClass('result-posts');
           Mustache.parse(template);
           var len= data.length;
           for (var i = len - 1; i >= 0; i -= 1) {
               post = data[i];
               rendered = Mustache.render(template, post);
               $(postsPlace).append(rendered);
           }

           $($resultPlace).html(postsPlace);
       }

       loader.loadPosts = function(resultPlace) {
           $(resultPlace).html('Loading...');
           requester.getRequest()
               .then(function (data) {
                   if (templateReady) {
                       fillGetResult(templateReady, data);
                   }
                   else {
                       fillTemplate('views/message-template.html')
                           .then(function (template) {
                               templateReady = template;
                               fillGetResult(template, data);
                           }, function () {
                               throw new Error("The information could not be rendered.");
                           });
                   }
               }, function() {
                   throw new Error('Some error occurred during the visualization');
               });
       };

       return loader;
   }());

    return outputLoader;
});