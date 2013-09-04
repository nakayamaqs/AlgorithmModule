/*
*
*   This code is to illustrate Minimal spanning tree Prim algorithm, use binary heap in my implementation.
*	Prim's algorithm solves the MST problem.
*	Running time is O(E*lgV). If sparse enough, binary heap is better than array, which running time is O(V*V ).
*	Use Fibonacci heap, the running time is O(E + VlgV).
*	Suppose Underscore imported here.
*	Zhe Zhang
*	Created on Sep 4, 2013
*   Latest updated on Sep 4, 2013
*
*/

/// <reference path="jslib/underscore/underscore-min.js"/>
/// <reference path="sorting/GenericHeap.js"/>

var graphBasic = graphBasic || {};
graphBasic.G = {};
graphBasic.G.V = []; //save all vertex
graphBasic.G.Adj = []; //save adjcent edges
graphBasic.G.Weight = {}; //save weight for all edges.
graphBasic.Prim = {}; //declare namespace "Prim"

//Basic data structure for Vertex.
graphBasic.Vertex = function(name){
	this.name = name;
	this.parent = null;
	this.d = Infinity; //distance: use Infinity instead of Number.MAX_VALUE;
	this.toString = function(){
		return this.name + "'s parent is: " +  (_.isEmpty(this.parent) ? "no parent." :this.parent.name);
	};
};

graphBasic.Prim.InitGraph = function(){
	//!! Underscore helps save all the lines as in DFS.js.
	//Init all the vertex in the Graph.
	graphBasic.G.V = _.map( ['a', 'b', 'c', 'd', 'e', 'f','g', 'h', 'i'], function(name){ return new graphBasic.Vertex(name); });
	//graphBasic.G.V[0].d = 0; //root vertex, set d=0;

	
	// graphBasic.G.Adj = _.map([  ['b','h'],['a','c','h'], ['b','d','f','i'], ['c','e','f'], ['d','f'],
	// 							['c','e','g'],['f','h','i'],['a','b','g','i'],['c','g','h'] ], 
	// 							function(adjcent){  
	// 								//clone vertices in Adj list.  //return graphBasic.G.V[name];
	// 								return _.map(adjcent, function(name){ return _.clone(graphBasic.G.V[name]); });  	
	// });	
	//Init all edges in Graph.G.Adj Object of key/value pairs.
	graphBasic.G.Adj = _.object([ ['a',['b','h']],      ['b', ['a','c','h']], 		['c', ['b','d','f','i']],  
								  ['d',['c','e','f']],  ['e',['d','f']],  			['f',['c','e','g']],  
								  ['g',['f','h','i']],  ['h',['a','b','g','i']],  	['i',['c','g','h'], ]]);

	//set weight for each edges in G.
	graphBasic.G.Weight = { "a-b": 4, "a-h": 8,
							"b-a": 4, "b-c": 8,  "b-h": 11,
							"c-b": 4, "c-d": 7,  "c-f": 4,  "c-i": 2, 
							"d-c": 7, "d-e": 9,  "d-f": 14,
							"e-d": 9, "e-f": 10,
							"f-c": 4, "f-e": 10, "f-g": 2,
							"g-f": 2, "g-h": 1,  "g-i": 6,
							"h-a": 8, "h-b": 11, "h-g": 1,  "h-i": 7,
							"i-c": 2, "i-g": 6,  "i-h": 7,
						  };

	mymodule.GenericHeap.BuildMinHeap(graphBasic.G.V, graphBasic.CompareVertex, graphBasic.SetKey,  graphBasic.GetKey,
		graphBasic.InsertVertex,  graphBasic.Swap);
	//console.table(graphBasic.G.V); //console.table support in Chrome
};

//Return the weight from u-v, Note: u, v are graphBasic.Vertex.
graphBasic.Prim.W = function(u, v){
	var w_key = u.name + '-' + v.name;
	return graphBasic.Prim.W_Key(w_key);
};

//Return the weight from u-v, Note: w_key should be like "1-2"
graphBasic.Prim.W_Key = function(w_key){
	var result = _.find(graphBasic.G.Weight, function(num, key){ return key == w_key;}); //find value by key, graphBasic.G.Weight is just hash table.
	if(_.isUndefined(result))
	{
		return Infinity;
	}
	return result;
};

graphBasic.Prim.Algorithm = function(Graph, weight_func, root){
	Q = Graph.V; 	
	root.d = 0;

	while (Q.HeapSize > 0){ 			 //_.isEmpty(graphBasic.G.QueueDistance)
		var minVertex = mymodule.GenericHeap.HeapExtraMin(Q);

		_.each(graphBasic.G.Adj[minVertex.name], function(end_vertex_name){
			 var find_v = _.find(Q, function(vertex){ return vertex.name == end_vertex_name; });
			 end_vertex_index = _.indexOf(Q, find_v );
			 //while current v is in Q, check 1, if v can be found in Q, 2, if index of current vertex is less than heapsize!!
			 if( _.isEmpty(find_v) == false && end_vertex_index < Q.HeapSize) 
			 { 
			 	var w_edge = weight_func(minVertex, find_v);
			 	// Check if this weight (minVertex, end_vertex) is smaller.
			 	if( w_edge < find_v.d){
				 	find_v.parent = minVertex; //should be called before running MinHeapDecreaseKey(), or the parent reference get messed.
				 	//Update d value by the FibHeap_DecreaseKey method.
				 	mymodule.GenericHeap.MinHeapDecreaseKey(Q, end_vertex_index, w_edge); 	//Note: v.name is index of Vertex, v.d = Key to decrease
			 	}
			 }
		});
	};

	console.log("Print Minimal spanning tree:");
	graphBasic.Prim.Print(graphBasic.G.V);
	console.log("vertices array after running Prim algorithm:");
	console.table(graphBasic.G.V);
};

graphBasic.Prim.Print = function(vertices){

	_.each(vertices, function(v) {
		console.log(v.toString());
	});
};

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

graphBasic.Prim.Run = function(){
	graphBasic.Prim.InitGraph(); //r.d = 0; already done. init root vertex's key
	graphBasic.Prim.Algorithm(graphBasic.G, graphBasic.Prim.W, graphBasic.G.V[0]);
};

graphBasic.Prim.Run();