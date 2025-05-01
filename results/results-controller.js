angular.module('pvtApp').controller('ResultsCtrl', function ($scope, $state, trialStore, analyzeData, settings) {
    $scope.trials = trialStore.all();
    $scope.settings = settings;

    if ($state.is("results")) {
        $state.go('.all');
    }

    $scope.titleForTrial = function (trial) {
        var date = moment(trial.date).locale('uk'); // Устанавливаем локаль на украинский
        return date.format('D MMMM YYYY, h:mm a');
    };

    $scope.getDateSpan = function (trials) {
        if (trials.length > 0) {
            var date1 = moment(trials[0].date).locale('uk'); // Устанавливаем локаль на украинский
            var date2 = moment(trials[trials.length - 1].date).locale('uk'); // Устанавливаем локаль на украинский
            return date2.diff(date1, 'days') + 1;
        }
        return 0;
    };

    $scope.textForTrial = function (trial) {
        var data = analyzeData(trial.data);
        return "Середнє значення"+data.mean().toPrecision(4)+" | Пропуски "+data.lapses(settings.lapse_threshold).length;
    };

    $scope.idForTrial = function (trial) {
        return trial.date;
    };

});
