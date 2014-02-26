define([
 "jquery",
  "classes/Quadrant",
  "classes/Ring",
  "classes/BlipList"
], function($, Quadrant, Ring, BlipList){

  var defaults = {};

  // Radar
  function Radar(opts) {
    this.initVars(opts);
    this.getQuadrantData(this.renderRadar.bind(this));
  }

  // Init Vars
  Radar.prototype.initVars = function (opts) {
    this.config = $.extend({}, defaults, opts);
    this.quadrants = [];
    this.rings = [];
  }

  // Render Radar
  Radar.prototype.renderRadar = function (data) {
    this.createObjects(data);
    this.getRingData(this.createRing.bind(this));
  };

  // Get Quadrant Data
  Radar.prototype.getQuadrantData = function (callback) {
    return $.ajax({
      url: "/data/quadrant-data.json",
      type: "GET",
      dataType: "json",
      success: callback
    });
  };

  // Create Data Objects
  Radar.prototype.createObjects = function (data) {
    this.createQuadrant(data);
    this.createBlipList(data);
  };

  // Get Ring Data
  Radar.prototype.getRingData = function (callback) {
    return $.ajax({
      url: "/data/ring-data.json",
      type: "GET",
      dataType: "json",
      success: callback
    });
  };

  // Create Quadrant
  Radar.prototype.createQuadrant = function (data) {
    var _this = this;
    data.forEach(function(index) {
      _this.quadrants.push(new Quadrant(index));
    });
  };

  // Create Ring
  Radar.prototype.createRing = function (data) {
    var _this = this;
    data.forEach(function(config) {
      _this.rings.push(new Ring(config));
    });
  };

  // Create Blip List
  Radar.prototype.createBlipList = function (data) {
    data.forEach(function(config) {
      var legend = new BlipList(config);
    });
  };

  return Radar;

});
