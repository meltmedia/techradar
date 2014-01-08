define([
  "jquery"
], function($){

  var defaults = {
    el: "",
    overlaySel: "#dragit-overlay"
  };

  // DragIt
  function DragIt(opts) {

    console.log(this);
    this.initVars(opts);
    this.initEvents();
  }

  // Init Vars
  DragIt.prototype.initVars = function (opts) {
    this.config = $.extend({}, defaults, opts);
    this.$el = $(this.config.el);
    this.$overlay = $(this.config.overlaySel);
  };

  // InitEvents
  DragIt.prototype.initEvents = function () {
    this.$el.on({
      mousedown: this.pickup.bind(this)
    });
  };

  // Pickup
  DragIt.prototype.pickup = function (ev) {
    this.dragging = true;
    this.showOverlay();
    this.startX = ev.clientX;
    this.startY = ev.clientY;
    this.$overlay.on({
      mouseup: this.drop.bind(this),
      mousemove: this.drag.bind(this)
    });
  };

  // Drag
  DragIt.prototype.drag = function (ev) {

    var
      endX = parseInt(this.$el.css("left")) + ev.clientX - this.startX,
      endY = parseInt(this.$el.css("top")) + ev.clientY - this.startY;

    this.$el.css({
      "left": endX,
      "top": endY
    });

    this.startX = ev.clientX;
    this.startY = ev.clientY;
  };

  // Drop
  DragIt.prototype.drop = function () {
    this.dragging = false;
    this.hideOverlay();
    this.$overlay.off("mouseup mousemove");
  }; 

  // Show Overlay
  DragIt.prototype.showOverlay = function () {
    this.$overlay.show();
  };

  // Hide Overlay
  DragIt.prototype.hideOverlay = function () {
    this.$overlay.hide();
  };

  return DragIt;

});
