### javascript entry point for this example interface. ###

# tell requirejs where everything is
requirejs.config

  # this should point to the URL for the compiled output of
  # celestrium/core-coffee, which is celestrium/core by convention.
  # if celestrium were located at www/scripts/celestrium,
  # the base URL should be "/scripts/celestrium/core"
  baseUrl: "/celestrium_code/core/"

  # paths tells requirejs to replace the keys with their values
  # in subsequent calls to require
  paths:

    # this is path, relative to the *baseUrl* to the directory
    # where  plugins defined for this example repo are located
    # this is a convenience
    local: "../../"

###

You need only require the Celestrium plugin.
NOTE: it's module loads the globally defined standard js libraries
      like jQuery, underscore, etc...

###

require ["Celestrium"], (Celestrium) ->

  ###

  This dictionary defines which plugins are to be included
  and what their arguments are.

  The key is the requirejs path to the plugin.
  The value is passed to its constructor.

  ###
  
  doWikiNetsSelection = (nodeName) ->
      $.getJSON "/json", (data) -> 
        select_node(node['_id']) for node in data["nodes"] when node['name'] is nodeName

  
  plugins =

    # organizes where things are displayed on the screen
    Layout:

      # el is it's container element
      el: document.querySelector("#maingraph")

    # listens for keystroke on the dom element it's given
    KeyListener:
      document.querySelector("body")

    # stores the actual nodes and links of the graph
    GraphModel:
      nodeHash: (node) -> node.text
      linkHash: (link) -> link.source.text+link.target.text

    # renders the graph using d3's force directedlayout
    GraphView: {}
      
    # allows nodes to be selected
    NodeSelection: 
      onClick: doWikiNetsSelection

    # provides functions to retreive nodes and links
    # relative present ones
    "local/WikiNetsDataProvider": {}

    "Sliders": {}

    "ForceSliders": {}

    "LinkDistribution": {}

    "NodeSearch": 
      prefetch: "/get_node_names"

    NodeDetails: {}

    MiniMap: {}  

  # initialize the plugins and execute a callback once done
  Celestrium.init plugins, (instances) ->

    loadEverything = (nodeNames) -> 
      instances["GraphModel"].putNode {text: nodeName} for nodeName in nodeNames

    #Prepopulate the GraphModel with all the nodes and links
    $.get('/get_node_names', loadEverything)

    # this prepopulates the graph with the "Albert" node
    #instances["GraphModel"].putNode {text: "WikiNets"} #, id:"300"}

    # this allows all link strengths to be visible
    instances["GraphView"].getLinkFilter().set("threshold", 0)