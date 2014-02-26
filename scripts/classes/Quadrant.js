define([
  "jquery",
  "underscore",
  "classes/Blip"
], function($, _, Blip){

  var defaults = {};

  // Quadrant Constructor
  function Quadrant(opts) {
    this.initVars(opts);
    this.renderQuadrant();
    this.createBlips();
  }

  // Init Vars
  Quadrant.prototype.initVars = function (opts) {
    this.config = $.extend({}, defaults, opts);
    this.blips = [];
  };

  // Render Quadrant
  Quadrant.prototype.renderQuadrant = function () {
    var template = _.template($("#quadrant-template").html());
    this.$el = $(template(this.config));
    $("#chart").append(this.$el);
  };

  // Create Blips
  Quadrant.prototype.createBlips = function () {
    var _this = this;
    this.config.items.forEach(function(config, index) {
      config.blipIndex = index + 1;
      config.$targetContainer = _this.$el;
      config.color = _this.config.color;
      _this.blips.push(new Blip(config));
    });
  };

  return Quadrant;

});
