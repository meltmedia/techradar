define(['utils'], function(utils) {
  describe("Radar", function() {
    describe("Cartesian to Raster Co-ordinate Transformation functions", function() {
      it("cartesian_to_raster_origin", function() {
        var w = 100, h = 100;
        expect(utils.cartesian_to_raster(0,0, w, h)).to.eql([w/2,h/2]);
      });
      
      it("cartesian_to_raster_bounds", function() {
        var w = 1000, h = 1000;        
        expect(utils.cartesian_to_raster(-500,-500, w, h)).to.eql([0,0]);
        expect(utils.cartesian_to_raster(500,500, w, h)).to.eql([w,h]);
        expect(utils.cartesian_to_raster(-500,500, w, h)).to.eql([0,h]);
        expect(utils.cartesian_to_raster(500,0, w, h)).to.eql([w,h/2]);
      });
    });  
    
    describe("Polar to Cartesian Co-ordinate Transformation functions", function() {

      it("polar origin ", function() {
        var r = 0, t = 0;
        expect(Math.round(utils.polar_to_cartesian(r,t)[0])).to.eql(0);
        expect(Math.round(utils.polar_to_cartesian(r,t)[1])).to.eql(0);
      });

      it("polar to cartesian 1,90", function() {
        var r = 1, t = 90;
        expect(Math.round(utils.polar_to_cartesian(r,t)[0])).to.eql(0);
        expect(Math.round(utils.polar_to_cartesian(r,t)[1])).to.eql(1);
      });

      it("polar to cartesian 20,90", function() {
        var r = 20, t = 90;
        expect(Math.round(utils.polar_to_cartesian(r,t)[0])).to.eql(0);
        expect(Math.round(utils.polar_to_cartesian(r,t)[1])).to.eql(r);
      });

      it("polar to cartesian 20, 180", function() {
        var r = 20, t = 180;
        expect(Math.round(utils.polar_to_cartesian(r,t)[0])).to.eql(-20);
        expect(Math.round(utils.polar_to_cartesian(r,t)[1])).to.eql(0);
      });

      it("polar to cartesian, 20, 270", function() {
        var r = 20, t = 270;
        expect(Math.round(utils.polar_to_cartesian(r,t)[0])).to.eql(0);
        expect(Math.round(utils.polar_to_cartesian(r,t)[1])).to.eql(-20);
      });

    });  

    describe("Raster to Cartesian Co-ordinate Transformation functions", function() {
      it("Raster to cartesian", function() {
        var w = 1000, h = 1000;        
        expect(utils.raster_to_cartesian(0,0, w, h)).to.eql([-500,-500]);
        expect(utils.raster_to_cartesian(1000,1000, w, h)).to.eql([500,500]);
      });            
    });   
  });
})
