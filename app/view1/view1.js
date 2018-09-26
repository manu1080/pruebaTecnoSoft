'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngMaterial', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])
  .factory('getCompanies', ['$http', function getCompanies($http) {
    return {
      getData: function () {
        return $http.get('json/companies.json').then(function (response) {
          return response.data.result.companies;
        });
      }
    }
  }])
  .factory('getProducts', ['$http', function getProducts($http) {
    return {
      getData: function (id) {
        return $http.get('json/products' + id + '.json').then(function (response) {
          return response.data.result.productos;
        });
      }
    }
  }])
  .factory('getClients', ['$http', function getClients($http) {
    return {
      getData: function (id) {
        return $http.get('json/clients' + id + '.json').then(function (response) {
          return response.data.result.clients;
        });
      }
    }
  }])

  .controller('View1Ctrl', ['$scope', '$http', 'getCompanies', 'getProducts', 'getClients', function ($scope, $http, getCompanies, getProducts, getClients) {
    $scope.selected = [];
    $scope.busqueda = "";
    $scope.detalles = false;
    $scope.selectCompanie = "";
    $scope.clientes = "";
    $scope.productos = "";
    //Parametros Iniciales DATATABLE
    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
    //Muestra los detalles de una compania
    $scope.mostrarDetalles = function (companie) {
      if ($scope.detalles == false) {
        $scope.detalles = true;
        $scope.selectCompanie = companie;
        $scope.consutarClientes(companie.id);
        $scope.consutarProductos(companie.id);
      } else {
        $scope.selectCompanie = "";
        $scope.clientes = "";
        $scope.productos = "";
        $scope.detalles = false;
      }
    }
    //Metodo GET que trae la lista de companias
    $scope.consutarCompanias = function () {
      getCompanies.getData().then(function (response) {
        $scope.compaines = response;
      });
    }
    //Metodo GET que trae la lista de productos
    $scope.consutarProductos = function (id) {
      getProducts.getData(id).then(function (response) {
        $scope.productos = response;
      });
    }
    //Metodo GET que trae la lista de clientes
    $scope.consutarClientes = function (id) {
      getClients.getData(id).then(function (response) {
        $scope.clientes = response;
      });
    }
    //Metodo que Filtra las companias por nombre
    $scope.filtrarTabla = function () {
      if ($scope.busqueda !== "") {
        getCompanies.getData().then(function (resp) {
          $scope.compaines = resp.filter(function (item) {
            return $scope.busqueda === item.name;
          });
        });
      } else {
        $scope.consutarCompanias();
      }
    };
    //Llamada al metodo Lista Companias 
    $scope.consutarCompanias();

  }]);
