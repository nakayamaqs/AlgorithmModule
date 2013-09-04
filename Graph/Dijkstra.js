/*
*
*   This code is for Dijkstra learning purpose, use binary heap in my implementation.
*	Dijkstra’s algorithm solves the single-source shortest-paths problem on a weighted, directed graph G(V,E) for the case in which all edge weights are nonnegative.
*	Running time is O(V*V). If sparse enough, then O(V*V/lgV) for binary heap, O(V*lgV + E) for Fibonacci heap.
*	Suppose Underscore imported here.
*	Zhe Zhang
*	Created on Aug 28, 2013
*   Latest updated on Aug 30, 2013
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

/** Dijkstra main functions **/
graphBasic.Dijkstra.InitSingleSource = function(){
	//!! Underscore helps save all the lines as in DFS.js.
	//Init all the vertex in the Graph.
	graphBasic.G.V = _.map( [0, 1, 2, 3, 4], function(num){ return new graphBasic.Vertex(num); });
	graphBasic.G.V[0].d = 0; //start vertex, set d=0;

	//Init all edges in the Graph.
	graphBasic.G.Adj = _.map([ [1,4],[2,3], [3], [0,2], [1,2,3] ], function(adjcent){  
		return _.map(adjcent, function(num){ return _.clone(graphBasic.G.V[num]); });  	//clone vertices in Adj list.  //return graphBasic.G.V[num];
	});	

	//set weight for each edges in G.
	graphBasic.G.Weight = { "0-1": 10, "0-4": 5,
							"1-2": 1,  "1-3": 2,
							"2-3": 4,
							"3-0": 7, "3-2": 6,
							"4-1": 3,"4-2": 9, "4-3": 2,
						  };

	mymodule.GenericHeap.BuildMinHeap(graphBasic.G.V, graphBasic.CompareVertex,  graphBasic.SetKey,  graphBasic.GetKey,
		graphBasic.InsertVertex,  graphBasic.Swap);
	//console.table(graphBasic.G.V); //console.table support in Chrome
};

//Return the weight from u-v, Note: u, v are graphBasic.Vertex.
graphBasic.Dijkstra.W = function(u, v){
	var w_key = u.name + '-' + v.name;
	return graphBasic.Dijkstra.W_Key(w_key);
};

//Return the weight from u-v, Note: w_key should be like "0-2"
graphBasic.Dijkstra.W_Key = function(w_key){
	var result = _.find(graphBasic.G.Weight, function(num, key){ return key == w_key;}); //find value by key, graphBasic.G.Weight is just hash table.
	if(_.isUndefined(result))
	{
		return Infinity;
	}
	return result;
};

graphBasic.Dijkstra.Relax = function(u_name, v_name, w, vertex_q){
	//Make sure u and v points to the object in Heap - graphBasic.G.V.
	var u = _.find(vertex_q, function(vertex){ return vertex.name == u_name; });
	v = _.find(vertex_q, function(vertex){ return vertex.name == v_name; });

	if(v.d > u.d + w(u,v))
	{
		v.d = u.d + w(u,v);
		v.parent = u;
		//v_q = _.find(vertex_q, function(vertex){ return vertex.name == v.name; });
		v_index = _.indexOf(_.map(vertex_q,  function(vertex){ return vertex.name; }), v.name);
		mymodule.GenericHeap.MinHeapDecreaseKey(vertex_q, v_index, v.d); 	//Note: v.name is index of Vertex, v.d = Key to decrease
		//mymodule.GenericHeap.MinHeapDecreaseKey(graphBasic.G.V, v.name, v.d); 	//Note: Update G.V, too. v.name is index of Vertex, v.d = Key to decrease
	}
};

graphBasic.Dijkstra.Algorithm = function(){
	graphBasic.Dijkstra.InitSingleSource();
	var S = [];
	//Q = _.clone(graphBasic.G.V); //Clone it.
	Q = graphBasic.G.V; //Don't Clone it.
	Q.HeapSize = graphBasic.G.V.HeapSize; //Note: underscore's clone method does not clone property of array.

	//graphBasic.G.QueueDistance = _.pluck(graphBasic.G.V, 'd');   // Extracting "distance" property from Vetices Matrics.
	//mymodule.Heap.BuildMinHeap(graphBasic.G.QueueDistance);      //Build Heap for distance array.

	while (Q.HeapSize > 0){ 			 //_.isEmpty(graphBasic.G.QueueDistance)
		var minVertex = mymodule.GenericHeap.HeapExtraMin(Q);
		S = _.union(S, minVertex);

		_.each(graphBasic.G.Adj[minVertex.name], function(vertex_end){
			 graphBasic.Dijkstra.Relax(minVertex.name, vertex_end.name, graphBasic.Dijkstra.W, Q); 	  //from the minVertex (which have min distance) to Vertex_end by Adj array.
		});
	};

	console.log(S); //print S after while loop.
	console.log("Print Shortest path:");
	graphBasic.Dijkstra.PrintAll(S);
	//console.log(Q);
	//graphBasic.Dijkstra.PrintAll(Q);
};

graphBasic.Dijkstra.Print = function(u, message){
	//console.log("vertex:" + u.name);
	message = message + "--> vertex:" + u.name + " (d=" + u.d + ")";
	if(_.isEmpty(u.parent) == false)
	{
		return graphBasic.Dijkstra.Print(u.parent, message);
	}
	else{ 
		message = message + " --> End!";
		return message;
	}	
};

graphBasic.Dijkstra.PrintAll = function(vertex_result){
	_.each(vertex_result , function(head_index){
		var resultPathMessage = "";
		resultPathMessage = graphBasic.Dijkstra.Print(vertex_result[head_index], resultPathMessage);
		console.log("" + resultPathMessage);
	});
};
/** End Dijkstra **/

/** Functions for Generic Heap's delegates  */
graphBasic.CompareVertex = function(v1, v2){
	if (v1 && v1.d && v2 && v2.d){
		return v1.d -  v2.d;
	}
};

graphBasic.SetKey = function(array, i, key){
	if(array && array[i].hasOwnProperty("d")) //&& _.isNumber(array[i].d)
	{ 
		array[i].d = key;
		// var vertex = _.find(array, function(vertex){ return vertex.name == v_name; }); //find vertex by name.
		// if(_.isNumber(vertex.d)){
		// 	vertex.d = key;
		// }
	}	
};

graphBasic.GetKey = function(array, i){
	if(array && array[i].hasOwnProperty("d")) //&& _.isNumber(array[i].d)
	{ 
		return array[i].d;
	}	
};

graphBasic.InsertVertex = function(name){
	return new graphBasic.Vertex(name);
};

graphBasic.Swap = function(array, i, j){
	if(array && _.isNumber(array[i].d) && _.isEmpty(array[i].name) == false)
	{ 
		var tempName = array[i].name;
		var temp_d = array[i].d;
		var temp_parent = array[i].parent; //swap parent

		array[i].d = array[j].d;
		array[i].name = array[j].name;
		array[i].parent = array[j].parent;

		array[j].d = temp_d;
		array[j].name = tempName;
		array[j].parent = temp_parent;
	}	
};
/** End -- Functions for Generic Heap's delegates  */

graphBasic.Dijkstra.Run = function(){
	graphBasic.Dijkstra.Algorithm();
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


