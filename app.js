angular.module("gomap",["gomap.controllers","ui.router","gomap.factories"])

//routing is done here.................in config section.............


.config(function($stateProvider,$urlRouterProvider,cfpLoadingBarProvider){
    cfpLoadingBarProvider.includeSpinner =false;
    $stateProvider

        .state("gmap",{
            url:"/gmap",
            templateUrl:"gmap.html",
            controller:"gmapCtrl as gmc"
        })
        .state("adminLogin",{
            url:"/adminLogin",
            templateUrl:"adminLogin.html",
            controller:"adminLoginCtrl as alc",

        })
        .state("adminMap",{
            url:"/adminMap",
            templateUrl:"adminMap.html",
            controller:"adminMapCtrl as amc"
        })
    $urlRouterProvider.otherwise("gmap")
})





