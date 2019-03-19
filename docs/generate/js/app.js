(function () {

    'use strict';

    // creates an angular module called  - bound to body through ng-app directive
    var app = angular.module('parkelsewhere_spwa', [ 'monospaced.qrcode' ]);

    // creating controller
    app.controller('Main', control);

    // Inject the $http service. Need $http to make HTTP requests to the API
    control.$inject = ['$http'];

    // Pass any injected services to the controller constructor function
    function control($http) {

        var vm = angular.extend(this, {
            title: 'Welcome to the Sticker App',
            stickers: [],
            events: [],
            endpoint: ''
        });

        vm.init = function () {
            // get the endpoint from the config file
            $http.get('config.json').then(
                function success(response) {
                    vm.endpoint = response.data.endpoint;
                    console.info(response.data);
                },
                function failure(err) {
                    console.err(err);
                }
            )
        }

        vm.getData = function () {
            // Using an unauthenticated API here
            // Use $http service to send get request to API and execute different functions depending on whether it is successful or not
            $http.get(vm.endpoint + 'incidents/16d5b9d9-77a8-4709-bfc7-a080512af177').then(
                function success(response) {
                    vm.incident = response.data;
                    console.info(response);
                },
                function failure(err) {
                    console.error(err);
                }
            )
        };

        vm.postStickers = function () {
            var sticker_ids = [];

            var form = document.getElementById("form1");
           
            var str_num_stickers = form.elements[0].value;
            var num_stickers = parseInt(str_num_stickers);
            var jsonpayload={
                reference: "Alice"
            }; 
            

             //Use $http service to send get request to API and execute different functions depending on whether it is successful or not
            for(var index = 0; index < num_stickers; index++){
            
                $http.post(vm.endpoint + '/stickers/', jsonpayload).then(
                    function success(response) {

                        sticker_ids.push(response.data.id);

                        
                        if(sticker_ids.length == num_stickers){
                            //vm.stickers.concat(sticker_ids);
                            vm.stickers = sticker_ids.concat(vm.stickers);
                        }

                        console.log("vm.stickers: ",vm.stickers.length)
                        console.info(response);
                    },
                    function failure(err) {
                        console.error(err);
                    }
                )
            }
        };

        vm.init();
    }

})();