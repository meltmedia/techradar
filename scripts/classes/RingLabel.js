define([
  "jquery"
], function($){

  var defaults = {
    ringLabelEl: "h2",                // Javascript TagName
    ringLabelWrapSel: ".ring",
    ringLabelClassName: "ring-label"
  };

  // RingLabel
  function RingLabel(opts) {
    this.initVars(opts);
    this.renderRingLabel();
  }

  // Init Vars
  RingLabel.prototype.initVars = function (opts) {
    this.config = $.extend({}, defaults, opts);
    this.$ringLabelWrap = $(".ring-" + this.config.name.replace(/\s+/g, '-').toLowerCase());
  };

  // Render Ring Label
  RingLabel.prototype.renderRingLabel = function () {
    this.ringLabel = document.createElement(this.config.ringLabelEl);
    this.ringLabel.className = this.config.ringLabelClassName;
    this.ringLabel.innerHTML = this.config.name;
    this.$ringLabelWrap.append(this.ringLabel);
  };

  return RingLabel;

});
