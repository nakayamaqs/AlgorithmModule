/*
*
*   This code is for Dijkstra learning purpose. 
*	Running time is O(V*V). If sparse enough, then O(V*V/lgV) for binary heap, O(V*lgV + E) for Fibonacci heap.
*	Suppose Underscore imported here.
*	Zhe Zhang
*	Aug 28, 2013
*
*/

/// <reference path="jslib/underscore/underscore-min.js"/>
/// <reference path="sorting/GenericHeap.js"/>

var graphBasic = graphBasic || {};
graphBasic.G = {};
graphBasic.G.V = []; //save all vertex
graphBasic.G.Adj = []; //save adjcent edges
graphBasic.G.Weight = {}; //save weight for all edges.
graphBasic.Dijkstra = {}; //declare namespace
graphBasic.G.QueueDistance = []; //store distances of all vertices

graphBasic.Dijkstra.InitSingleSource = function(){
	//!! Underscore helps save all the lines as in DFS.js.
	//Init all the vertex in the Graph.
	graphBasic.G.V = _.map( [0, 1, 2, 3, 4, 5, 6], function(num){ return new graphBasic.Vertex(num); });
	graphBasic.G.V[0].d = 0; //start vertex, set d=0;

	//Init all edges in the Graph.
	graphBasic.G.Adj = _.map([[1, 2, 3, 4, 5, 6],[5], [1,4], [2,6], [1,5], [2], [2,3]], function(adjcent){  
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

	mymodule.GenericHeap.BuildMinHeap(graphBasic.G.V,  graphBasic.CompareVertex, graphBasic.SetKey, graphBasic.GetKey,
		graphBasic.InsertVertex, graphBasic.Swap);
	console.table(graphBasic.G.V); //console.table support in Chrome
};

//Return the weight from u-v, Note: u, v are graphBasic.Vertex.
graphBasic.Dijkstra.W = function(u, v){
	var w_key = u.name + '-' + v.name;
	return _.find(graphBasic.G.Weight, function(num, key){ return key == w_key;});
};

//Return the weight from u-v, Note: w_key should be like "0-2"
graphBasic.Dijkstra.W_Key = function(w_key){
	return _.find(graphBasic.G.Weight, function(num, key){ return key == w_key;}); 	//find value by key, graphBasic.G.Weight is just hash table.
};


graphBasic.Dijkstra.Relax = function(u, v, w){
	if(v.d > u.d + w(u,v))
	{
		v.d = u.d + w(u,v);
		v.parent = u;
		mymodule.GenericHeap.MinHeapDecreaseKey(graphBasic.G.V, v.name, v.d); 	//Note: v.name is index of Vertex, v.d = Key to decrease
	}
};


graphBasic.Dijkstra.Algorithm = function(){

	graphBasic.Dijkstra.InitSingleSource();
	var S = [];
	Q = graphBasic.G.V; //we don't need to maintains Q here, just use QueueDistance instead.

	//graphBasic.G.QueueDistance = _.pluck(graphBasic.G.V, 'd');   // Extracting "distance" property from Vetices Matrics.
	//mymodule.Heap.BuildMinHeap(graphBasic.G.QueueDistance);      //Build Heap for distance array.

	while (graphBasic.G.V.HeapSize > 0){ 			 //_.isEmpty(graphBasic.G.QueueDistance)
		var minVertex = mymodule.GenericHeap.HeapExtraMin(graphBasic.G.V);
		S = _.union(S, minVertex);

		_.each(graphBasic.G.Adj[minVertex.name], function(vertex_end){
			 graphBasic.Dijkstra.Relax(minVertex, vertex_end, graphBasic.Dijkstra.W); 	  //from the minVertex (which have min distance) to Vertex_end by Adj array.
		});
	};

	console.log(S); //print S after while loop.
};

graphBasic.Dijkstra.Print = function(u, message){
	//console.log("vertex:" + u.name);
	message = message + "--> vertex:" + u.name;
	if(_.isEmpty(u.parent) == false)
	{
		return graphBasic.Dijkstra.Print(u.parent, message);
	}
	else{ 
		message = message + " --> End!";
		return message;
	}	
};

graphBasic.Dijkstra.PrintAll = function(){
	_.each(graphBasic.G.V , function(head_index){
		var resultPathMessage = "";
		resultPathMessage = graphBasic.Dijkstra.Print(graphBasic.G.V[head_index], resultPathMessage);
		console.log(""+resultPathMessage);
	});
};

//Basic data structure for Vertex.
graphBasic.Vertex = function(name){
	//this.color = "White";
	this.name = name;
	this.parent = null;
	this.d = Infinity; //distance: use Infinity instead of Number.MAX_VALUE;
	this.toString = function(){
		return this.name;
	};
};

graphBasic.CompareVertex = function(v1, v2){
	if (v1 && v1.d && v2 && v2.d){
		return v1.d -  v2.d;
	}
};

graphBasic.SetKey = function(array, i, key){
	if(array && _.isNumber(array[i].d))
	{ 
		array[i].d = key;
	}	
};

graphBasic.GetKey = function(array, i){
	if(array && _.isNumber(array[i].d))
	{ 
		return array[i].d;
	}	
};

graphBasic.InsertVertex = function(name){
	return new graphBasic.Vertex(name);
};

graphBasic.Swap = function(array, i, j){
	if(array && _.isNumber(array[i].d) && _.isEmpty(array[i].name))
	{ 
		var tempName = array[i].name;
		var temp_d = array[i].d;

		array[i].d = array[j].d;
		array[i].name = array[j].name;

		array[j].d = temp_d;
		array[j].name = tempName;
	}	
};

graphBasic.Dijkstra.Run = function(){

	graphBasic.Dijkstra.Algorithm();
	console.log("Print Shortest path:");
	graphBasic.Dijkstra.PrintAll();
	
	//graphBasic.Dijkstra.Print(graphBasic.G.V[6]);
	console.table(graphBasic.G.V); //console.table support in Chrome
	console.table(graphBasic.G.Adj);
	console.log(graphBasic.G.Weight);
};

graphBasic.Dijkstra.Run();

//test generic heap sorting..
// graphBasic.Dijkstra.InitSingleSource();
// graphBasic.G.V[0].d = 19;
// graphBasic.G.V[1].d = 8;
// graphBasic.G.V[2].d = 9;
// graphBasic.G.V[3].d = 4;
// graphBasic.G.V[4].d = 11;
// graphBasic.G.V[5].d = 6;
// graphBasic.G.V[6].d = 10;

// mymodule.GenericHeap.BuildMinHeap(graphBasic.G.V,  graphBasic.CompareVertex ,graphBasic.SetKey, graphBasic.InsertVertex);
// console.log("Get Minimum element after Heap built.");
// console.log(mymodule.GenericHeap.Minimum(graphBasic.G.V));

// console.log("After running heap MinHeapIFY at i = 1.");
// mymodule.GenericHeap.MinHeapIFY(graphBasic.G.V, 1);
// console.log(console.log(graphBasic.G.V));

// console.log("Decrease key at index=2");
// mymodule.GenericHeap.MinHeapDecreaseKey(graphBasic.G.V, 2, 5);
// console.log(mymodule.GenericHeap.Minimum(graphBasic.G.V));
// console.log(graphBasic.G.V);

// console.log("Insert key = 5 into Heap");
// mymodule.GenericHeap.MinHeapInsert(graphBasic.G.V,5);

// console.log("Sorting:"+ graphBasic.G.V);
// mymodule.GenericHeap.HeapSort(graphBasic.G.V);
// console.log(graphBasic.G.V);


// graphBasic.G.V[0].d = 19;
// graphBasic.G.V[1].d = 8;
// graphBasic.G.V[2].d = 9;
// graphBasic.G.V[3].d = 4;
// graphBasic.G.V[4].d = 11;
// graphBasic.G.V[5].d = 6;
// graphBasic.G.V[6].d = 10;
// console.log("Init array again.");
// console.log("Prepare to sort the array: ");
// console.log(graphBasic.G.V);
// mymodule.GenericHeap.HeapSort(graphBasic.G.V);
// console.log("After heap sorting..");
// console.log(graphBasic.G.V);


