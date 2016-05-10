'use strict';

angular.module('confusionApp')


.controller('ZhopaController', ['$scope', 'zhopaFactory', function ($scope, zhopaFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.showMenu = true;
    $scope.message = "Loading ...";
    $scope.dishes = zhopaFactory.getZhopaDishes();

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };
        }])




.controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.showMenu = false;
    $scope.message = "Loading ...";
    menuFactory.getDishes().query(
        function (response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };
        }])

.controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

        }])


.controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.sendFeedback = function () {

        console.log($scope.feedback);

        feedbackFactory.saveFeedback().addFeedbackRecord($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        } else {
            $scope.invalidChannelSelection = false;
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };

            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
        }])

.controller('DishDetailController', ['$scope', '$stateParams', 'zhopaFactory', function ($scope, $stateParams, zhopaFactory) {

    $scope.dish = {};
    $scope.showDish = true;
    $scope.message = "Loading ...";

    $scope.dish = zhopaFactory.getZhopaDish(parseInt($stateParams.id, 10));

        }])

.controller('DishCommentController', ['$scope', function ($scope) {

    $scope.mycomment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
    };
    $scope.submitComment = function () {

        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);

        $scope.dish.comments.push($scope.mycomment);
        $scope.commentForm.$setPristine();
        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };
    };
        }])


.controller('IndexController', ['$scope', 'zhopaFactory', function ($scope, zhopaFactory) {

    $scope.dish = {};
    $scope.showDish = true;
    $scope.firstPromotion = {};
    $scope.showPromotion = true;
    $scope.executiveChief = {};
    $scope.showLeader = true;
    $scope.message4dish = "Loading ...";
    $scope.message4promotion = "Loading ...";
    $scope.message4leader = "Loading ...";

    $scope.dish = zhopaFactory.getZhopaDishes()[0];
    $scope.firstPromotion = zhopaFactory.getZhopaPromotions()[0];
    $scope.executiveChief = zhopaFactory.getZhopaLeaders()[3];

    $("#mycarousel").carousel({
        interval: 5000
    });
    $("#carousel-pause").click(function () {
        $("#mycarousel").carousel('pause');
    });
    $("#carousel-play").click(function () {
        $("#mycarousel").carousel('cycle');
    });
    $("#loginOpenDialog").click(function () {
        $("#loginModal").modal();
    });
    $("#reserveOpenDialog").click(function () {
        $("#reserveModal").modal();
    });

   }])

.controller('AboutController', ['$scope', 'zhopaFactory', function ($scope, zhopaFactory) {

    $scope.message = "Loading ...";
    $scope.showLeaders = true;
    $scope.leaders = zhopaFactory.getZhopaLeaders();

}])

;