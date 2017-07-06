angular.module("gomap.factories",["firebase"])

.factory("fireRef",function($firebaseArray){
    var root=firebase.database().ref();

    return $firebaseArray(root);
})

//.factory("mapInit",function(){
//    var mapDiv = document.getElementById('mapForAll');
//    mapForAll = new google.maps.Map(mapDiv, {
//        center: {lat: 26.9124, lng: 75.7873},
//        zoom: 11
//    });
//    return mapForAll;
//})

//.factory("adminMap",function(){
//    var mapDiv = document.getElementById('mapForAdmin');
//    mapForAdmin = new google.maps.Map(mapDiv, {
//        center: {lat: 26.9124, lng: 75.7873},
//        zoom: 11
//    });
//    return mapForAdmin;
//
//})

.factory("Auth",function($firebaseAuth){
    var ref=firebase.database().ref();
    return $firebaseAuth();
})

.factory("bodyHeight",function(){
    return window.innerHeight;

})

.factory("bph",function(){
    return document.getElementById('bluePart').offsetHeight;
})

.factory("category",function(){
   var category=["temples","cinema","university","tourist","military","hotel","museum"];
    return category;
})

