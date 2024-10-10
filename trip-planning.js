angular.module('tripApp', [])
.controller('TripController', function($scope) {
    $scope.currentTab = 1; // Start with the first tab
    $scope.trips = []; // Array to hold planned trips

    // Trip object to hold form data
    $scope.trip = {
        tripName: '',
        destination: '',
        startDate: '',
        endDate: '',
        budget: 0,
        transportation: '',
        accommodation: '',
        meal: '',
        insurance: false,
        packing: '',
        communication: '',
        localResearch: '',
        financialPreparation: '',
        notes: ''
    };

    $scope.setActiveTab = function(tabIndex) {
        $scope.currentTab = tabIndex;
    };

    $scope.previousTab = function() {
        if ($scope.currentTab > 1) {
            $scope.currentTab--;
        }
    };

    $scope.nextTab = function() {
        if ($scope.currentTab < 4) {
            $scope.currentTab++;
        }
    };

    $scope.submitForm = function() {
        // Add the trip to the list
        $scope.trips.push(angular.copy($scope.trip));
        // Reset the trip object
        $scope.trip = {
            tripName: '',
            destination: '',
            startDate: '',
            endDate: '',
            budget: 0,
            transportation: '',
            accommodation: '',
            meal: '',
            insurance: false,
            packing: '',
            communication: '',
            localResearch: '',
            financialPreparation: '',
            notes: ''
        };
        $scope.currentTab = 1; // Reset to the first tab
    };
});
