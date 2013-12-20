/* globals define*/
 define(['utils', 'd3'], function (utils, d3) {

  function init(radarData) {
    renderData(radarData);
    initEvents();
  }

  /*===============================
    Display Arcs
  ---------------------------------*/
  function displayArcs(radar, radarData) {
    var
      arcs,
      arcLabelPadding = 5;

    arcs = radar.append("g")
      .attr("class", "arcs")
      .selectAll("circle")
      .data(radarData.radar_arcs)
      .enter()
        .append("g")
        .attr("class", "ring")
        .attr("transform", function(d) {
          d.x = radarData.w/2;
          d.y = radarData.h/2;
          return "translate(" + d.x + "," + d.y + ")"; 
        });

    /*===============================
      Arcs
    ---------------------------------*/
    arcs.append("circle")
      .attr("class", "arc-outline")

      // Radius
      .attr("r", function(d) {
        return d.r;
      })

      // Styles
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1);

    /*===============================
      Arc Labels
    ---------------------------------*/
    arcs.append("text")
      .attr("class", "arc-label")
      .attr("text-anchor", "middle")

      // Positioning
      .attr("y", function(d) {
        return -d.r - arcLabelPadding;
      })

      // Label Text
      .text(function(d) {
        return d.name;
      });

  }

  /*===============================
    Render Data
  ---------------------------------*/
  function renderData(radarData) {
    
    var
      radar = d3.select("body"),
      blipLabelPadding = 8,
      defaultBlipSize = 300,
      globalIndex = 1,  // Start with one so the display is 1 based
      maxRadius = 0;

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

    // Append svg element to the body
    radar = d3.select("body")
      .append("svg")
      .attr("id", "radar")
      .attr("width", radarData.w)
      .attr("height", radarData.h);

    // Draw the radar arcs
    displayArcs(radar, radarData); 

    /*==================================
      Draw the axis
    ------------------------------------*/

    // X-Axis
    radar.append("g")
      .append("line")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .attr("x1", (radarData.w/2)-maxRadius)
      .attr("y1", radarData.h/2)
      .attr("x2", (radarData.w/2)+maxRadius)
      .attr("y2", radarData.h/2);

    // Y-Axis
    radar.append("g")
      .append("line")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .attr("x1", radarData.w/2)
      .attr("y1", (radarData.h/2)-maxRadius)
      .attr("x2", radarData.w/2)
      .attr("y2", (radarData.h/2)+maxRadius);

    /*==================================
      Draw the Quadrants
    ------------------------------------*/
    var techs = radar.append("g")
      .attr("class", "radar")  
      .selectAll("g")
      .data(radarData.radar_data)
      .enter()
        .append("g")
          .attr("class", "quadrant")
          .text(function(d) {
            return d.quadrant;
          });

    /*==================================
      Create the Blips
    ------------------------------------*/
    var blips = techs.append("g")
      .selectAll("g")
      .data(function(d) {
        return d.items;
      })    
      .enter()
        .append("g")
          .attr("class", "blip")
          .attr("data-global-index", function(d){
            return d.globalIndex;
          })
          .attr("transform", function(d) {
            var polar = utils.polar_to_raster(d.pc.r, d.pc.t, radarData.w, radarData.h);
            d.x = polar[0];
            d.y = radarData.h-polar[1];
            return "translate(" + d.x + "," + d.y + ")"; 
          });

    /*==================================
      Create Tooltips
    ------------------------------------*/
    var tooltips;

    // Create tooltip element
    blips.append("g")
      .attr("class", "tooltip");

    // Store all tooltips
    tooltips = d3.selectAll(".tooltip");

    // Tooltip text
    var tooltipLabel = tooltips.append("svg:text")
      .attr("class", "tooltip-label")
      .attr("x", 0)
      .attr("y", -24)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(function() {
        var data = d3.select(this.parentNode).datum();
        return data.name;
      });

    var bbox = tooltipLabel.node().getBBox();

    //console.log(bbox.width);

    // Tooltip container
    tooltips.append("svg:rect")
      .attr("width", bbox.width)
      .attr("height", 15)
      .attr("y", bbox.y)
      .attr("x", bbox.x);

    /*==================================
      Create the blip symbol
    ------------------------------------*/
    blips.append("path")
      .attr("d", function() {
        var
          movement = d3.select(this.parentNode).datum().movement,
          type = movement ? "circle" : "triangle-up";
        return d3.svg.symbol().type(type).size(d3.select(this.parentNode).datum().blipSize || defaultBlipSize)();
      }) 

      // Style
      .attr("fill", function() {
        return d3.select(this.parentNode.parentNode).datum().color;  
      });

    /*==================================
      Create blip text element
      - Shows the global index value
    ------------------------------------*/
    blips.append("text")
      .attr("text-anchor", "middle")

      // Positioning
      .attr("y", function() {
        return blipLabelPadding;
      })
      
      // Text
      .text(function(d) {
        return d.globalIndex;
      })

      // Style
      .attr("fill", "white");

    /*==================================
      Draw the Legends
    ------------------------------------*/
    var legend = d3.select("body").append("div")
      .attr("class", "radar-legends")
      .selectAll("div")
      .data(radarData.radar_data)
      .enter()
        .append("div")
        .attr("class", "legend")
        .attr("id", function(d){
          return d.quadrant.replace(/\s+/g, '-').toLowerCase();
        });

    /*==================================
      Legend Header
    ------------------------------------*/
    legend.append("h3")
      .attr("class", "legend-heading")
      .text(function(d) {
        return d.quadrant;
      });


    /*==================================
      Legend Entries
    ------------------------------------*/
    var entry = legend.append("ul")
      .attr("class","legend-list")
      .selectAll("li")
      .data(function(d) {
        return d.items;
      })
      .enter()
        .append("li")
          .append("a")
          .attr("href", function (d) {
            return "?item=" + d.name.replace(/\s+/g, '-').toLowerCase();
          })
          .attr("data-global-index", function(d){
            return d.globalIndex;
          })
          .attr("class", "blip");

    /*==================================
      Legend List Item Symbol
    ------------------------------------*/
    var entryIcon = entry.append("svg")
      .attr("height", 10)
      .attr("width", 15);

    entryIcon.append("path")
      .attr("height", 12)
      .attr("width", 10)
      .attr("d", function() {
        var
          movement = d3.select(this.parentNode.parentNode.parentNode.parentNode).datum().movement,
          type = movement ? "circle" : "triangle-up";
        return d3.svg.symbol().type(type)();
      })
      .attr("transform", function(){
        // Positions the triange inside the svg element
        return "translate(" + 6 + "," + 6 + ")";
      })
      .attr("fill", function() {
        return d3.select(this.parentNode.parentNode.parentNode.parentNode).datum().color;  
      });

    /*==================================
      Legend List Item Index Number
    ------------------------------------*/
    entry.append("text")
      .attr("text-anchor", "left")
      .attr("x", 10)
      .attr("y", 4)
      .attr("text-anchor", "right")
      .text(function(d) {
        return d.globalIndex + " ";
      });

    /*==================================
      Legend List Item Name
    ------------------------------------*/
    entry.append("text")
      .attr("text-anchor", "left")
      .attr("x", 26)
      .attr("y", 4)
      .text(function(d) {
        return d.name;
      });

  }

  /*==================================
    Init Events
  ------------------------------------*/
  function initEvents() {

    d3.selectAll(".blip")
      .on("mouseenter", function () {
        var targetIndex  = d3.select(this).attr("data-global-index");
        d3.selectAll(".blip").style("opacity", 0.2);
        d3.selectAll('[data-global-index="' + targetIndex + '"]').style("opacity", 1);
        d3.selectAll('[data-global-index="' + targetIndex + '"]').select(".tooltip").style("opacity", 1);
      })
      .on("mouseleave", function () {
        d3.selectAll(".blip").style("opacity", 1);
        d3.selectAll(".tooltip").style("opacity", 0);
      });

  }

  return {
    init: init
  };
});