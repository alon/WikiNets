// Generated by CoffeeScript 1.6.3
/* javascript entry point for this example interface.*/


(function() {
  requirejs.config({
    baseUrl: "/celestrium_code/core/",
    paths: {
      local: "../../"
    }
  });

  /*
  
  You need only require the Celestrium plugin.
  NOTE: it's module loads the globally defined standard js libraries
        like jQuery, underscore, etc...
  */


  require(["Celestrium"], function(Celestrium) {
    /*
    
    This dictionary defines which plugins are to be included
    and what their arguments are.
    
    The key is the requirejs path to the plugin.
    The value is passed to its constructor.
    */

    var doWikiNetsSelection, plugins;
    doWikiNetsSelection = function(nodeName) {
      return $.getJSON("/json", function(data) {
        var node, _i, _len, _ref, _results;
        _ref = data["nodes"];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          node = _ref[_i];
          if (node['name'] === nodeName) {
            _results.push(select_node(node['_id']));
          }
        }
        return _results;
      });
    };
    plugins = {
      Layout: {
        el: document.querySelector("#maingraph")
      },
      KeyListener: document.querySelector("body"),
      GraphModel: {
        nodeHash: function(node) {
          return node['_id'];
        },
        linkHash: function(link) {
          if (link['_id'] != null) {
            return link['_id'];
          } else {
            return 0;
          }
        }
      },
      GraphView: {},
      NodeSelection: {},
      "local/WikiNetsDataProvider": {},
      "local/Neo4jDataController": {},
      "local/NodeEdit": {},
      "local/Create": {},
      "Sliders": {},
      "ForceSliders": {},
      "LinkDistribution": {},
      "NodeSearch": {
        prefetch: "/node_names"
      },
      MiniMap: {},
      Stats: {},
      "local/TopBarCreate": {},
      "local/ShowAll": {}
    };
    return Celestrium.init(plugins, function(instances) {
      var loadEverything;
      loadEverything = function(nodes) {
        var node, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = nodes.length; _i < _len; _i++) {
          node = nodes[_i];
          _results.push(instances["GraphModel"].putNode(node));
        }
        return _results;
      };
      $.get('/get_nodes', loadEverything);
      return instances["GraphView"].getLinkFilter().set("threshold", 0);
    });
  });

}).call(this);
