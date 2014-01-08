define([
  "jquery",
  "classes/Radar"
], function($, Radar){

  var techRadar = new Radar();

  // Blip List Accordion Toggle
  $('body').on("click", '[data-toggle="item-list"]', function (ev) {
    ev.preventDefault();
    $(this).parent().find(".item-list").slideToggle();
  });

});
