angular.module("gomap.controllers",["firebase",'angular-loading-bar'])

    //controller for gmaps................

.controller("gmapCtrl",function(fireRef,bodyHeight,bph) {
            //to set height for map........
            //console.log("hii")
            var gmc=this;
            document.getElementById('mapForAll').style.height=(bodyHeight - bph)+"px";
              gmc.markers=[];
    gmc.particular=[];
    gmc.display;
            //set up map and initialise map
            var mapData=fireRef;
                            function initMap() {
                                var mapDiv = document.getElementById('mapForAll');
                                mapForAll = new google.maps.Map(mapDiv, {
                                    center: {lat: 26.9124, lng: 75.7873},
                                    zoom: 13
                                });
                            }

    //initialise done..now call dat function initialise..

                             var infoWindow = new google.maps.InfoWindow();
    //WHEN DATA LOADED FROM FIREBASE,,DO THIS,,,
                mapData.$loaded().then(function(){
                                initMap();          loading_screen.finish();

                           gmc.search=function()
                             {
                                 var mapDiv = document.getElementById('mapForAll');
                                 mapForAll = new google.maps.Map(mapDiv, {
                                     center: {lat: 26.9124, lng: 75.7873},
                                     zoom: 13
                                 });
                                 gmc.particular=[];
                                function clearMarkers() {
                                    setMapOnAll(null);
                                }
                                function setMapOnAll(mapForAll) {
                                    //console.log("m"+gmc.markers)
                                    for (var i = 0; i < gmc.markers.length; i++) {
                                        gmc.markers[i].setMap(mapForAll);
                                    }
                                }
                                clearMarkers();
                                // Removes the markers from the map, but keeps them in the array.

                               //console.log(gmc.particular)
                                for(i=0;i<mapData.length;i++){
                                    if(gmc.searchbox=="all"){
                                        gmc.particular.push(mapData[i]);
                                        gmc.display=mapData[i].category;
                                        createMarker(mapData[i]);
                                    }
                                    else if
                                    (gmc.searchbox==mapData[i].category)
                                        {
                                            gmc.particular.push(mapData[i]);
                                            gmc.display=mapData[i].category;
                                            createMarker(mapData[i]);
                                        }
                                    }

                             }

                            gmc.seeonmap=function() {
                                function clearMarkers() {
                                    setMapOnAll(null);
                                }

                                function setMapOnAll(mapForAll) {
                                    for (var i = 0; i < gmc.markers.length; i++) {
                                        gmc.markers[i].setMap(mapForAll);
                                    }
                                }

                                clearMarkers();
                                for (i = 0; i < mapData.length; i++) {
                                    //console.log(gmc.display)
                                    if (gmc.match == mapData[i].name) {
                                        //console.log(mapData[i])
                                        var mapDiv = document.getElementById('mapForAll');
                                        mapForAll = new google.maps.Map(mapDiv, {
                                            center: {lat: mapData[i].cordinates.lat, lng:mapData[i].cordinates.lng},
                                            zoom: 13
                                        });
                                        var marker = new google.maps.Marker({
                                            position: mapData[i].cordinates,
                                            map: mapForAll,
                                            title: mapData[i].name,
                                            desc: mapData[i].desc,
                                            icon: "img/" + mapData[i].category + ".png",
                                            animation: google.maps.Animation.BOUNCE
                                        });
                                        gmc.markers.push(marker);
                                        google.maps.event.addListener(marker, 'click', function () {
                                            //console.log(marker)
                                            infoWindow.setContent('<h2>' + marker.title + '</h2>' + '<br>' + marker.desc);
                                            infoWindow.open(mapForAll, marker);
                                        });
                                    }
                                }


                            }
                            var createMarker = function (info)
                            {
                                var marker = new google.maps.Marker({
                                    position: mapData[i].cordinates,
                                    map: mapForAll,
                                    title:mapData[i].name,
                                    desc:mapData[i].desc,
                                    icon:"img/"+gmc.display+".png"
                                });
                                gmc.markers.push(marker);
                                google.maps.event.addListener(marker, 'click', function(){
                                    //console.log(marker)
                                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + '<br>' + marker.desc);
                                    infoWindow.open(mapForAll, marker);
                                });
                            }
                            for(i=0;i<mapData.length;i++)
                            {
                                gmc.display=mapData[i].category;
                                createMarker(mapData[i]);
                            }


                }),function(error)
                {
                        //Failure callback
                        //console.log("error"+error)
                        window.alert("check your net connection")
                }




})

//CONTROLLER FOR LOGIN PAGE...................
.controller("adminLoginCtrl",function($state,Auth,cfpLoadingBar){

    this.signIn = function(e) {
        cfpLoadingBar.start();
        //e.preventDefault();
        var username = this.user.email;
        var password = this.user.password;
        Auth.$signInWithEmailAndPassword(username,password)
            .then(function(user) {
                //Success callback
                $state.go('adminMap')
            }, function(error) {
                //Failure callback
                window.alert("Authentication failure")

            });
    }

})

//controller for admin map ...................................
.controller("adminMapCtrl",function($q,$timeout,$state,Auth,bodyHeight,bph,fireRef){
    //to set height for map........

    document.getElementById('mapForAdmin').style.height=(bodyHeight - bph)+"px";
    var amc=this;
    amc.display;
    var infoWindow = new google.maps.InfoWindow();
    //logout function
    amc.logout=function(){
        Auth.$signOut();
       $state.go('gmap')
    }
    var mapData=fireRef;
    //maps initialise....
        function initMap() {
            var mapDiv = document.getElementById('mapForAdmin');
            mapForAdmin = new google.maps.Map(mapDiv, {
                center: {lat: 26.9124, lng: 75.7873},
                zoom: 13
            });
        }
    //now  add  features,,,
    var g,h;
    initMap();
    amc.place={};
        google.maps.event.addListener(mapForAdmin, 'click', function (event) {
            g="";
            function async() {
                var a = $q.defer();
                //console.log(event)
                //console.log(amc.place)
                //console.log(typeof event)
                g = event.latLng.lat();
                h = event.latLng.lng();
                if (g)
                    a.resolve();
                return a.promise;
            }
            async().then(function()
            {
                amc.place.lat = g;
                amc.place.lng = h
            })
        });
        amc.submit=function(place){
                mapData.$add({
                    cordinates:{ lat: amc.place.lat,
                        lng: amc.place.lng},
                    name:amc.place.name,
                    desc:amc.place.desc,
                    category:amc.place.category
                })
                   amc.display=amc.place.category;
                var marker = new google.maps.Marker({
                    position: {lat: amc.place.lat,
                    lng: amc.place.lng},
                    map: mapForAdmin,
                    title:amc.place.name,
                    desc:amc.place.desc,
                    icon:"img/"+amc.display+".png"
                })

            google.maps.event.addListener(marker, 'click', function(){
                //console.log(marker)
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + '<br>' + marker.desc );
                infoWindow.open(mapForAdmin, marker);
            });
                amc.place={};
            }


    mapData.$loaded().then(function(){
              //console.log(mapData)
        var createMarker = function (info){
            var marker = new google.maps.Marker({
                position: mapData[i].cordinates,
                map: mapForAdmin,
                title:mapData[i].name,
                desc:mapData[i].desc,
                icon:"img/"+amc.display+".png"
            });

            google.maps.event.addListener(marker, 'click', function(){

                infoWindow.setContent('<h2>' + marker.title + '</h2>' + '<br>' + marker.desc);
                infoWindow.open(mapForAdmin, marker);
            });
        }

        for(i=0;i<mapData.length;i++){
            amc.display=mapData[i].category;
            createMarker(mapData[i]);
        }

    }),function(error) {
        //Failure callback
        window.alert("check your net connection")
        $state.go('adminMap')
    }

})
