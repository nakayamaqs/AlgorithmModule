/*
*
*   This code is for Bellman-ford learning purpose. Running time is O(V*E).
*	Suppose Underscore imported here.
*	Zhe Zhang
*	Aug 22, 2013
*
*/
/// <reference path="jslib/underscore/underscore-min.js"/>

var graphBasic = graphBasic || {};
graphBasic.G = {};
graphBasic.G.V = []; //save all vertex
graphBasic.G.Adj = []; //save adjcent edges
graphBasic.G.Weight = {}; //save weight for all edges.
graphBasic.Bellman_ford = {}; //declare namespace

graphBasic.Bellman_ford.InitSingleSource = function(){
	//!! Underscore helps save all the lines as in DFS.js.
	//Init all the vertex in the Graph.
	graphBasic.G.V = _.map( [0,1, 2, 3,4,5,6], function(num){ return new graphBasic.Vertex(num); });
	graphBasic.G.V[0].d = 0; //start vertex, set d=0;

	//Init all edges in the Graph.
	graphBasic.G.Adj = _.map([[0,1, 2, 3,4,5,6],[5], [1,4], [2,6], [1,5], [2], [2,3]], function(adjcent){  
		return _.map(adjcent, function(num){ return graphBasic.G.V[num]; }); 
	});	

	//set weight for each edges in G.
	graphBasic.G.Weight = { "0-1": 0, "0-2": 0,"0-3": 0,"0-4": 0,"0-5": 0,"0-6": 0,
							"1-5": -1,
							"2-1": 1, "2-4": 2,
							"3-2": 2, "3-6": -8,
							"4-1": -4,"4-5": 3,
							"5-2": 7,
							"6-2": 5,"6-3": 10,
						  };
};

//Return the weight from u-v, Note: u, v are graphBasic.Vertex.
graphBasic.Bellman_ford.W = function(u, v){
	var w_key = u.name + '-' + v.name;
	return _.find(graphBasic.G.Weight, function(num, key){ return key == w_key;});
};

//Return the weight from u-v, Note: w_key should be like "0-2"
graphBasic.Bellman_ford.W_Key = function(w_key){
	return _.find(graphBasic.G.Weight, function(num, key){ return key == w_key;});
};

graphBasic.Bellman_ford.Relax = function(u, v, w){
	if(v.d > u.d + w(u,v))
	{
		v.d = u.d + w(u,v);
		v.parent = u;
	}
};

//The main Bellman Ford algorithm function.
graphBasic.Bellman_ford.Algorithm = function(){
	graphBasic.Bellman_ford.InitSingleSource();

	//iterate all vertices outer, and iterate each vertex's adj edges inner.
	_.each(graphBasic.G.V , function(vertex_head){
		var vIndex = vertex_head.name;
		_.each(graphBasic.G.Adj[vIndex] , function(vertex_end){
			graphBasic.Bellman_ford.Relax(vertex_head, vertex_end, graphBasic.Bellman_ford.W);
		});
	});

	//check negative weight cycle existence.
	_.each(graphBasic.G.Adj , function(head_index){
		_.each(graphBasic.G.Adj[head_index] , function(end_index){
			if( graphBasic.G.V[end_index].d > graphBasic.G.V[head_index].d + graphBasic.Bellman_ford.W)
			{
				return false; 
			}
		});
	});
	return true;
};

graphBasic.Bellman_ford.Print = function(u, message){
	//console.log("vertex:" + u.name);
	message = message + "--> vertex:" + u.name;
	if(_.isEmpty(u.parent) == false)
	{
		return graphBasic.Bellman_ford.Print(u.parent, message);
	}
	else{ 
		message = message + " --> End!";
		return message;
	}	
};

graphBasic.Bellman_ford.PrintAll = function(){
	_.each(graphBasic.G.V , function(head_index){
		var resultPathMessage = "";
		resultPathMessage = graphBasic.Bellman_ford.Print(graphBasic.G.V[head_index], resultPathMessage);
		console.log(""+resultPathMessage);
	});
};

//Basic data structure for Vertex.
graphBasic.Vertex = function(name){
	//this.color = "White";
	this.name = name;
	this.parent = null;
	this.d = Number.MAX_VALUE; //distance
	//this.count = 0; //this is included for DFS_Path.js purpose.
	this.toString = function(){
		return this.name;
	};
};

graphBasic.Bellman_ford.Run = function(){
	var result = graphBasic.Bellman_ford.Algorithm();
	if(result) {
		console.log("Shortest path exist!");
		graphBasic.Bellman_ford.PrintAll();
	}
	else{
		console.log("Negative weight cycle exist! Can't get any shortest path!");
	}
	//graphBasic.Bellman_ford.Print(graphBasic.G.V[6]);
	console.table(graphBasic.G.V); //console.table support in Chrome
	console.table(graphBasic.G.Adj);
	console.log(graphBasic.G.Weight);
};

graphBasic.Bellman_ford.Run();