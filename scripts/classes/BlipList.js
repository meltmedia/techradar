define([
  "jquery",
  "underscore"
], function($, _){

  var defaults = {};

  // BlipList
  function BlipList(opts) {
    this.initVars(opts);
    this.renderBlipList();
  }

  // Init Vars
  BlipList.prototype.initVars = function (opts) {
    this.config = $.extend({}, defaults, opts);
  };

  // Render BlipList
  BlipList.prototype.renderBlipList = function () {
    var template = _.template($("#blip-list-template").html());
    this.$el = $(template(this.config));
    $("#nav-items").append(this.$el);
  };

  return BlipList;

});
