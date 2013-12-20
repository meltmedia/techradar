/* globals define */
define(function() {

    function createItem(name, r, t, movement, hr, ht) {
        return {
            "name":name, 
            "pc":{"r":r,"t":t},
            "movement":movement,
            "history": [
                {
                    "pc": {
                        "r": hr,
                        "t": ht
                    }
                }
            ]
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

        h : 800,
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
                    createItem('Performance testing', 230, 100, false, 350, 100),
                    createItem('Load testing', 280, 120, false),
                    createItem('Integration Testing', 220, 140, false),                    
                    // [Trial]
                    createItem('Self executable app containers', 120, 160, false),                    
                    createItem('Continuous Delivery', 120, 120, false),
                    createItem('Smoke Tests', 140, 140, false),
                    createItem('Mobile Web Apps', 160, 160, false),
                    // [Adopt]
                    createItem('System Testing', 90, 130, false),
                    createItem('GitFlow', 70, 120, false),
                    createItem('Unit Testing', 50, 110, false),
                    createItem('TDD', 80, 100, false),
                    createItem('Responsive Design', 50, 160, false),
                    createItem('Continuous Integration', 70, 140, false),
                    createItem('Version control systems', 25, 135, false),
                    createItem('Health checks', 85, 160, false)
                ]
            },
            { "quadrant": "Tools",
                "left": 1160-100+30,
                "top" : 18,
                "color" : "#587486",
                // [Tools] (0 - 90)
                "items" : [ 

                    // [Hold]
                    createItem('Ant', 340, 45, false),
                    createItem('Zookeeper', 340, 80, false),
                    createItem('ActiveMQ', 350, 60, false),
                    createItem('Less', 350, 20, false),
                    // [Assess]
                    createItem('etcd', 280, 15, false),                    
                    createItem('leiningen', 250, 50, false),
                    createItem('Gradle', 270, 70, false),
                    createItem('RabbitMQ', 280, 45, false),
                    // [Trial]
                    createItem('Collected', 180, 80, false),
                    createItem('statsd', 170, 40, false),
                    createItem('redis', 170, 20, false),
                    createItem('Docker', 120, 20, false),
                    createItem('graphite', 120, 70, false),
                    createItem('MongoDB', 120, 50, false),
                    // [Adopt]
                    createItem('Sass', 90, 65, false),
                    createItem('Require.js', 60, 15, false),
                    createItem('Bower', 85, 15, false),
                    createItem('Grunt', 30, 30, false),
                    createItem('Maven', 55, 40, false),
                    createItem('Chef', 90, 30, false),
                    createItem('Vagrant', 60, 60, false),
                    createItem('GitHub', 40, 70, false),
                    createItem('nagios', 80, 80, false),
                    createItem('MySQL', 80, 50, false)                    
                ]
            },
            { "quadrant": "Platforms",
                "left" :45,
                 "top" : (1000/2 + 50),
                "color" : "#DC6F1D",
                // [Platforms] (180 - 270)
                "items" : [

                    // [Hold]
                    createItem('OSGi', 350, 190, false),
                    createItem('Sling', 380, 225, false),
                    createItem('JBoss', 320, 260, false),
                    createItem('Servicemix', 370, 240, false),
                    createItem('J2EE', 350, 210, false),
                    // [Assess]
                    createItem('Dropwizard', 280, 195, false),
                    createItem('Drupal', 220, 200, false),
                    createItem('Statamic', 220, 230, false),
                    // [Trial]
                    createItem('Grails', 130, 250, false),
                    createItem('Totem', 120, 200, false),
                    createItem('Angular.js', 115, 230, false),
                    // [Adopt]
                    createItem('Cadmium', 70, 190,false),
                    createItem('Amazon AWS', 50, 220, false),
                    createItem('Twitter Bootstrap', 60, 255, false),

                ]
            },
            { "quadrant": "Languages",
                "color" : "#B70062",
                "left"  : (1160-100+30),
                "top" :   (1000/2 + 50),
                // [Languages & Framework] (270 - 360)
                "items" : [ 

                    // [Hold]
                    createItem('Flash', 340, 300, false),
                    createItem('Flex', 380, 320, false),
                    createItem('Dart', 315, 340, false),
                    // [Assess]
                    createItem('Ruby', 250, 305, false),
                    createItem('Go', 280, 315, false),
                    createItem('Clojure', 270, 350, false),
                    // [Trial]
                    createItem('SVG', 170, 350, false),
                    createItem('PHP', 120, 290, false),
                    createItem('Groovy', 120, 350, false),
                    createItem('Python', 140, 320, false),
                    // [Adopt]                    
                    createItem('HTML 5', 45, 300, false),
                    createItem('Docpad', 70, 320, false),
                    createItem('Javascript', 70, 290, false),
                    createItem('Node.js', 50, 350, false),
                    createItem('Java', 25, 330, false),
                    createItem('Objective C', 80, 350, false)

                ]
            }
        ]
    };
});