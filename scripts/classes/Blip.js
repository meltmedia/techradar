define([
  "jquery",
  "underscore",
  "classes/DragIt"
], function($, _, DragIt){

  var defaults = {};

  // Blip
  function Blip(opts, index) {
    this.initVars(opts);
    this.renderBlip();
    this.positionBlip();
  }

  // Extend Blip Class to include DragIt methods
  $.extend(Blip.prototype, DragIt.prototype);

  // DragIt Instance Only
  Blip.prototype._super = DragIt.prototype;

  // Init Vars
  Blip.prototype.initVars = function (opts) {
    this.config = $.extend({}, defaults, opts);
  };

  // Render Blip
  Blip.prototype.renderBlip = function () {
    var template = _.template($("#blip-template").html());
    this.$el = $(template(this.config));
    this.config.$targetContainer.append(this.$el);
  };

  // Position Blip
  Blip.prototype.positionBlip = function () {
    this.$el.css({
      background: this.config.color,
      left: this.config.x,
      top: this.config.y
    });
  };

  return Blip;

});
