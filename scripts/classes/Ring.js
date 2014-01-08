define([
  "jquery",
  "classes/RingLabel"
], function($, RingLabel){

  var defaults = {
    el: "div",
    ringWrapSel: "#chart",
    ringClassName: "ring"
  };

  // Ring
  function Ring(opts) {
    this.initVars(opts);
    this.renderRing();
    this.createRingLabel();
  }

  // Init Vars
  Ring.prototype.initVars = function (opts) {
    this.config = $.extend({}, defaults, opts);
    this.ringClasses = [];
    this.ringLabels = [];
    this.$ringWrap = $(this.config.ringWrapSel);
  };

  // Render Ring
  Ring.prototype.renderRing = function () {
    this.ring = document.createElement(this.config.el);
    this.ring.className = this.config.ringClassName + " " + "ring-" + this.config.name.replace(/\s+/g, '-').toLowerCase();
    this.ring.style.height = this.config.height + "px";
    this.ring.style.width = this.config.width + "px";
    this.ring.style.marginLeft = (-1 * this.config.width/2) + "px";
    this.ring.style.marginTop = (-1 * this.config.height/2) + "px";
    this.$ringWrap.append(this.ring);
  };

  // Create Ring Label
  Ring.prototype.createRingLabel = function () {
    var ringLabelOpts = {
      "name": this.config.name,
      "ringHeight": this.config.ringHeight,
      "ringWidth": this.config.ringWidth
    };
    this.ringLabels.push(new RingLabel(ringLabelOpts));
  };

  return Ring;

});
