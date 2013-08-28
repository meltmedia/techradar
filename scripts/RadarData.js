/* globals define */
define(function() {

    function createItem(name, r, t, movement) {
        return {
            "name":name, 
            "pc":{"r":r,"t":t},
            "movement":movement
        };
    }

    return {
        //This is the title for your window tab, and your Radar
        title : "Technology Radar",

        //This is the concentic circles that want on your radar
        radar_arcs : [
                       {'r':100,'name':'Adopt'}
                      ,{'r':200,'name':'Trial'}
                      ,{'r':300,'name':'Assess'}
                      ,{'r':400,'name':'Hold'}
                     // ,{'r':500,'name':'Possible Extra if you want it'}
                     ],

        //This is your raw data
        //
        // Key
        //
        // movement:
        //   t = moved
        //   c = stayed put
        //
        // blipSize: 
        //  intValue; This is optional, if you omit this property, then your blip will be size 70.
        //            This give you the ability to be able to indicate information by blip size too
        //
        // url:
        // StringValue : This is optional, If you add it then your blips will be clickable to some URL
        //
        // pc: polar coordinates
        //   r = distance away from origin ("radial coordinate")
        //     - Each level is 100 points away from origin
        //     t = angle of the point from origin ("angular coordinate")
        //     - 0 degrees is due east
        //
        // Coarse-grained quadrants
        // - Techniques: elements of a software development process, such as experience design; and ways of structuring software, such micro-services.
        // - Tools: components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistance.
        // - Platforms: things that we build software on top of: mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds
        // - Programming Languages and Frameworks
        //
        // Rings:
        // - Adopt: blips you should be using now; proven and mature for use
        // - Trial: blips ready for use, but not as completely proven as those in the adopt ring; use on a trial basis, to decide whether they should be part of your toolkit
        // - Assess: things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you
        // - Hold: things that are getting attention in the industry, but not ready for use; sometimes they are not mature enough yet, sometimes they are irredeemably flawed
        //      Note: there's no "avoid" ring, but throw things in the hold ring that people shouldn't use.

        h : 1160,
        w : 1200,

        radar_data : [
            { "quadrant": "Techniques",
                "left" : 45,
                "top" : 18,
                "color" : "#8FA227",
                // [Techniques] (90 - 180)
                "items" : [ 
                    // [Hold]
                    // [Assess]
                    createItem('Performance testing', 230, 100, 't'),
                    createItem('Load testing', 280, 120, 't'),
                    createItem('Integration Testing', 210, 140, 't'),
                    createItem('Self executable app containers', 215, 160, 't'),
                    // [Trial]
                    createItem('System Testing', 110, 100, 't'),
                    createItem('Continuous Delivery', 110, 120, 't'),
                    createItem('Smoke Tests', 140, 140, 't'),
                    createItem('Mobile Web Apps', 160, 160, 't'),
                    // [Adopt]
                    createItem('Unit Testing', 50, 100, 't'),
                    createItem('TDD', 90, 120, 't'),
                    createItem('Responsive Design', 30, 140, 't'),
                    createItem('Continuous Integration', 70, 140, 't'),
                    createItem('Version control systems', 20, 160, 't')
                ]
            },
            { "quadrant": "Tools",
                "left": 1160-100+30,
                "top" : 18,
                "color" : "#587486",
                // [Tools] (0 - 90)
                "items" : [ 


                    // [Hold]
                    createItem('Ant', 340, 45, 't'),
                    // [Assess]
                    createItem('Gradle', 280, 70, 't'),
                    // [Trial]
                    createItem('Docker', 120, 20, 't'),
                    // [Adopt]
                    createItem('Require.js', 60, 10, 't'),
                    createItem('Bower', 70, 20, 't'),
                    createItem('Grunt', 60, 30, 't'),
                    createItem('Maven', 55, 40, 't'),
                    createItem('Chef', 90, 50, 't'),
                    createItem('Vagrant', 60, 60, 't'),
                    createItem('GitHub', 40, 70, 't')
                ]
            },
            { "quadrant": "Platforms",
                "left" :45,
                 "top" : (1200/2 + 18),
                "color" : "#DC6F1D",
                // [Platforms] (180 - 270)
                "items" : [

                    // [Hold]
                    createItem('OSGi', 350, 190, 't'),
                    createItem('Sling', 390, 225, 't'),
                    createItem('JBoss', 320, 260, 't'),
                    // [Assess]
                    // [Trial]
                    createItem('MongoDB', 220, 220, 't'),
                    // [Adopt]
                    createItem('Cadmium', 70, 190,'t'),
                    createItem('Amazon AWS', 50, 220, 't'),
                    createItem('MySQL', 80, 260, 't')
                ]
            },
            { "quadrant": "Languages",
                "color" : "#B70062",
                "left"  : (1160-100+30),
                "top" :   (1200/2 + 18),
                // [Languages & Framework] (270 - 360)
                "items" : [ 


                    // [Hold]
                    createItem('J2EE', 350, 280, 't'),
                    createItem('Flash', 340, 300, 't'),
                    createItem('Flex', 380, 320, 't'),
                    createItem('Dart', 310, 340, 't'),
                    // [Assess]
                    createItem('Dropwizard', 280, 285, 't'),
                    createItem('Ruby', 250, 305, 't'),
                    createItem('Go', 290, 315, 't'),
                    createItem('Clojure', 290, 350, 't'),
                    createItem('Grails', 250, 330, 't'),
                    // [Trial]
                    createItem('PHP', 120, 290, 't'),
                    createItem('Drupal', 120, 310, 't'),
                    createItem('Angular.js', 110, 330, 't'),
                    createItem('Groovy', 110, 350, 't'),
                    createItem('Python', 140, 320, 't'),
                    // [Adopt]
                    createItem('Require.js', 50, 280, 't'),
                    createItem('Twitter Bootstrap', 60, 300, 't'),
                    createItem('HTML 5', 40, 320, 't'),
                    createItem('Docpad', 70, 320, 't'),
                    createItem('Javascript', 40, 300, 't'),
                    createItem('Node.js', 40, 340, 't'),
                    createItem('Java', 20, 350, 't'),
                    createItem('Objective C', 60, 350, 't')

                ]
            }
        ]
    };
});