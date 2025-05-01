angular.module('pvtApp').directive('deleteAll', function ($timeout, $state, $q) {
    return {
        scope: {
            ondelete: '&onDelete'
        },
        restrict: 'E',
        template: '<a ng-click="step()" href="" class="text-danger">&lt; {{ message }} &gt;</a>',
        link: function (scope, element, attrs) {
            var acceptsInput = true;
            var messageIndex = 0;
            var timeoutPromise;
            var messages = [
                {msg: "Видалити все", wait: 2},
                {msg: "Ви впевнені?", wait: 2},
                {msg: "Двічі впевнені?", wait: 0},
                {msg: "Це не можна скасувати!", wait: 1},
                {msg: "Видалено", wait: 1, delete: true}
            ];

            element.on("$destroy", function () {
                if (timeoutPromise) { $timeout.cancel(timeoutPromise); }
            });

            scope.message = messages[messageIndex].msg;
            scope.step = function () {
                if (!acceptsInput || messageIndex >= messages.length) {
                    return;
                }

                var msg = messages[++messageIndex];

                if (msg.delete) {
                    scope.ondelete();
                    hasUndo = true;
                }

                if (msg.wait === 0) {
                    scope.message = msg.msg;
                    return;
                }

                acceptsInput = false;
                scope.message = " ... ";
                timeoutPromise = $timeout(function () {
                    acceptsInput = true;
                    scope.message = msg.msg;
                }, msg.wait * 1000);
            };
        }
    };
});
