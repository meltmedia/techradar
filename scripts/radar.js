/* globals define*/
 define(['utils', 'd3'], function (utils, d3) {

  function displayArcs(radar, radarData) {
    var archLabelPadding = 5;

    var arcs = radar.append("g")
      .attr("class", "arcs")
      .selectAll("circle")
      .data(radarData.radar_arcs)
      .enter()
      .append("g")
      .attr("transform", function(d) {
           d.x = radarData.w/2;
           d.y = radarData.h/2;
           return "translate(" + d.x + "," + d.y + ")"; 
         });

    arcs.append("circle")  
      .attr("class", "arc")
      .attr("r", function(d) {
          return d.r;
      })
     .attr("fill", "none")
     .attr("stroke", "gray")
     .attr("stroke-width", 1);  

    arcs.append("text")
      .attr("text-anchor", "middle")
      .attr("y", function(d) {
        return -d.r - archLabelPadding;
      })
      .text(function(d) {
        return d.name;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px");  
  }

  function init(radarData) {
    // $('#title').text(radarData.title);  

    var blipLabelPadding = 5;

    var globalIndex = 1;  // Start with one so the display is 1 based
    var maxRadius = 0;

    for (var arcIndex in radarData.radar_arcs) {
      maxRadius = Math.max(maxRadius, radarData.radar_arcs[arcIndex].r);
    }

    // Compute the global index on all the entries
    // this mutates the data
    for (var quad in radarData.radar_data) {
      for (var item in radarData.radar_data[quad].items) {
        radarData.radar_data[quad].items[item].globalIndex = globalIndex++;
      }
    }

    var radar = d3.select("body")
      .append("svg")
      .attr("width", radarData.w)
      .attr("height", radarData.h);

    // Draw the radar arcs
    displayArcs(radar, radarData); 

    // Draw the axis
    radar.append("g")
      .append("line")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("x1", (radarData.w/2)-maxRadius)
      .attr("y1", radarData.h/2)
      .attr("x2", (radarData.w/2)+maxRadius)
      .attr("y2", radarData.h/2);

    radar.append("g")
      .append("line")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("x1", radarData.w/2)
      .attr("y1", (radarData.h/2)-maxRadius)
      .attr("x2", radarData.w/2)
      .attr("y2", (radarData.h/2)+maxRadius);  

    // Draw the blips
    var techs = radar.append("g")
      .attr("class", "radar blips")  
      .selectAll("g")
      .data(radarData.radar_data)
      .enter()
      .append("g")
      .text(function(d) {
        return d.quadrant;
      });

    var blips = techs.append("g")
      .selectAll("g")
      .data(function(d) {
        return d.items;
      })    
      .enter()
      .append("g")
      .attr("class", "blips")  
      .attr("transform", function(d) {
          var polar = utils.polar_to_raster(d.pc.r, d.pc.t, radarData.w, radarData.h);

          d.x = polar[0];
          d.y = radarData.h-polar[1];
          return "translate(" + d.x + "," + d.y + ")"; 
        });  

    // The symbol for the blip
    blips.append("path")  
      .attr("class", "blip")
      .attr("d", function() {
        var movement = d3.select(this.parentNode).datum().movement;

        var type = "circle";

        if (movement === "c") {
          type = "circle";
        } else if (movement === "t") {
          type = "triangle-up";
        }

        return d3.svg.symbol().type(type).size(d3.select(this.parentNode).datum().blipSize || 90)();
       }) 
      .attr("fill", function() {
        return d3.select(this.parentNode.parentNode).datum().color;  
       })
      .attr("stroke", "gray")
      .attr("stroke-width", 1);  

    // The index for the blip
    blips.append("text")
      .attr("text-anchor", "middle")
      .attr("y", function() {
        return -blipLabelPadding;
      })
      .text(function(d) {    
        return d.globalIndex;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px");     

    // Draw the legend
    var legend = radar.append("g")
      .attr("class", "radar legends")  
      .selectAll("g")
      .data(radarData.radar_data)
      .enter()
      .append("g")
      .text(function(d) {
        return d.quadrant;
      })
      .attr("transform", function(d) {
          d.x = d.left;
          d.y = d.top;
          return "translate(" + d.x + "," + d.y + ")"; 
        });    

    // Header for each category
    legend.append("text")
      .attr("text-anchor", "left")
      .attr("y", 4)  
      .text(function(d) {    
        return d.quadrant;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "18px");     

    // Group all the legend entries together
    var entry = legend.append("g")
      .selectAll("g")
      .data(function(d) {
        return d.items;
      })    
      .enter()
      .append("g")
      .attr("class", "blips")  
      .attr("transform", function(d, i) {
          d.x = 0;
          d.y = 18 + i*18;
          return "translate(" + d.x + "," + d.y + ")"; 
        });  

    // For each entry add a symbol to represent the change or lack there of
    entry.append("path")  
      .attr("class", "blip")
      .attr("d", function() {
        var movement = d3.select(this.parentNode).datum().movement;

        var type = "circle";

        if (movement === "c") {
          type = "circle";
        } else if (movement === "t") {
          type = "triangle-up";
        }

        return d3.svg.symbol().type(type)();
       }) 
      .attr("fill", function() {
        return d3.select(this.parentNode.parentNode).datum().color;  
       })
      .attr("stroke", "gray")
      .attr("stroke-width", 1);  

    // The index as seen on the radar
    entry.append("text")
      .attr("text-anchor", "left")
      .attr("x", 10)  
      .attr("y", 4)  
      .text(function(d) {    
        return d.globalIndex;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px");   

    // The name of the entry
    entry.append("text")
      .attr("text-anchor", "left")
      .attr("x", 26)
      .attr("y", 4)  
      .text(function(d) {    
        return d.name;
      })
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px");     
  }

  return {
    init: init
  };
});