/**
*   This code is for BFS learning purpose.
*	Zhe Zhang
*	The total running time of the BFS procedure is O(V + E).
*	Created on Sep 5, 2013
*   Latest updated on  Sep 5, 2013
*	
*/

/// <reference path="jslib/underscore/underscore-min.js"/>

var graphBasic = graphBasic || {};

graphBasic.G = {};
graphBasic.G.V = [];    //save all vertex
graphBasic.G.Adj = [];  //save adjcent edges
graphBasic.BFS = {};    //namespace.


//Basic data structure for Vertex.
graphBasic.Vertex = function(name){
	this.color = "White";
	this.name = name;
	this.parent = null; //this is included for DFS_Path.js purpose.
	this.d = Infinity;
	this.toString = function(){
		return this.name + '(' + this.color + ") and parent is: " +  (_.isEmpty(this.parent) ? "no parent." :this.parent.name);
	};
};

graphBasic.BFS.Init = function(){
	
	//Init all the vertex in the Graph.
	graphBasic.G.V[0] = new graphBasic.Vertex("S");
	graphBasic.G.V[1] = new graphBasic.Vertex("Z");
	graphBasic.G.V[2] = new graphBasic.Vertex("Y");
	graphBasic.G.V[3] = new graphBasic.Vertex("X");
	graphBasic.G.V[4] = new graphBasic.Vertex("W");
	graphBasic.G.V[5] = new graphBasic.Vertex("T");
	graphBasic.G.V[6] = new graphBasic.Vertex("V");
	graphBasic.G.V[7] = new graphBasic.Vertex("U");

	//Init all edges in the Graph.
	graphBasic.G.Adj["S"] = [graphBasic.G.V[1], graphBasic.G.V[4]];
	graphBasic.G.Adj["Z"] = [graphBasic.G.V[2],graphBasic.G.V[4]];
	graphBasic.G.Adj["Y"] = [graphBasic.G.V[3],graphBasic.G.V[5]];
	graphBasic.G.Adj["X"] = [graphBasic.G.V[1]];
	graphBasic.G.Adj["W"] = [graphBasic.G.V[3]];
	graphBasic.G.Adj["T"] = [graphBasic.G.V[6],graphBasic.G.V[7]];
	graphBasic.G.Adj["V"] = [graphBasic.G.V[4],graphBasic.G.V[0]];
	graphBasic.G.Adj["U"] = [graphBasic.G.V[6],graphBasic.G.V[5]];

	//Init vertex properties.
	for (var i = 0; i < graphBasic.G.V.length; i++) {
		graphBasic.G.V[i].color = "White";
		graphBasic.G.V[i].color.parent = null;
	};
};

graphBasic.BFS.Algorithm = function(graph, s){

	_.each(graph.V, function(v){
		if(v != s)
		{
			v.d = Infinity;
			v.parent = null;
			v.color = "White";
		}		
	});

	s.d = 0;
	s.parent = null;
	s.color = "Gray";

	Q = [s]; //init Q with s.

	while(Q.length > 0)
	{
		u = _.first(Q);  // u=Q[0]
		Q.splice(0,1);;  // Dequeue = remove the first element

		var adjVertex = graphBasic.G.Adj[u.name]; //all the adjcent vertex of current node.
		for (var i = 0; i < adjVertex.length; i++) {
			var v = adjVertex[i];
			if(v.color == "White"){
				v.color =  "Gray";
				v.parent = u,
				v.d = u.d + 1;
				Q[Q.length] = v; //Enqueue = append to the end of array.
			}
		};
		u.color = "Black";
		console.log(u); //print out each vertex when it marked as Black.
	}
	//print vertices after running BFS.
	console.table(graphBasic.G.V);
};

//Print path from s to v.
graphBasic.BFS.PrintPath = function(s, v){
	if(s == v)
	{
		console.log(" -> "+ v.name);		
	}
	else if(_.isEmpty(v.parent))
	{
		console.log("No path from " + s.name + " to " + v.name);
	}
	else{
		graphBasic.BFS.PrintPath(s, v.parent);
		console.log(" -> "+ v.name);
	}
};
//Init Graph and run BFS.
console.time("BFS");
graphBasic.BFS.Init();
graphBasic.BFS.Algorithm(graphBasic.G, graphBasic.G.V[0]);
console.timeEnd("BFS");

console.log("Print path from graphBasic.G.V[0] to graphBasic.G.V[7]");
graphBasic.BFS.PrintPath(graphBasic.G.V[0], graphBasic.G.V[7]);
console.log("Print path from graphBasic.G.V[0] to graphBasic.G.V[4]");
graphBasic.BFS.PrintPath(graphBasic.G.V[0], graphBasic.G.V[4]);