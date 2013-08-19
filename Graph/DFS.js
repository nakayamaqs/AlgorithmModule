/**
*   This code is for DFS learning purpose.
*	Zhe Zhang
*	July 4, 2013
*/
var graphBasic = graphBasic || {};

graphBasic.G = {};
graphBasic.G.V = []; //save all vertex
graphBasic.G.Adj = []; //save adjcent edges
graphBasic.Time = 0; //ini Time as 0.
graphBasic.G.SortList = []; //save all vertex in Topological-sort.

graphBasic.Init = function(){
	
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
	graphBasic.G.Adj["Y"] = [graphBasic.G.V[3]];
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

	graphBasic.Time = 0; //ini Time as 0.
};

graphBasic.DFS = function(Init){
	
	Init(); //Init Vertex and Edges before DFS.

	for (var i = 0; i < graphBasic.G.V.length; i++) {
		if(graphBasic.G.V[i].color == "White")
		{
			//console.log(graphBasic.G.V[i]);
			graphBasic.DFSVisit(graphBasic.G.V[i]);
		}
	};
};

graphBasic.DFSVisit = function(u){
    	
	u.d = ++graphBasic.Time;
	u.color = "Gray";

	var adjVertex = graphBasic.G.Adj[u.name]; //all the adjcent vertex of current node.
	for (var i = 0; i < adjVertex.length; i++) {
		var v = adjVertex[i];
		if(v.color == "White"){
			v.parent = u,
			graphBasic.DFSVisit(v);
			//console.log(v);
		}
	};

	u.color = "Black";
	u.f = ++graphBasic.Time; // graphBasic.Time++;
	graphBasic.G.SortList.push(u); //push finiseh vertex into Sortlist, so the list arranged in sorted order.
};

//Basic data structure for Vertex.
graphBasic.Vertex = function(name){
	this.color = "White";
	this.name = name;
	this.count = 0; //this is included for DFS_Path.js purpose.
	this.toString = function(){
		return this.name + ',' + this.color;
	};
};

graphBasic.Run = function(){
	//graphBasic.Init();
	//console.log("Start DFS..");
	graphBasic.DFS(graphBasic.Init);
	//Sort by start time
	graphBasic.G.V.sort(function(v1,v2){
	   	//return v1.f - v2.f;
	   	return v1.d - v2.d;
	});

	console.log("Sorting result..");
	console.table(graphBasic.G.V); //console.table support in Chrome
	console.log("Topological Sorting result..");
	console.table(graphBasic.G.SortList); //console.table support in Chrome
};

//graphBasic.Run();
