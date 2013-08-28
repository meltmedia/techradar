/* global requirejs, require */
requirejs.config({
    
  paths: {
    "d3": "../lib/d3/d3",
    "underscore": "../lib/underscore/underscore"
  },

  shim: {
    d3: {
      exports: 'd3'
    }
  }  
});

require(['radar', 'radarData'], function(radar, radarData){
  radar.init(radarData);
});