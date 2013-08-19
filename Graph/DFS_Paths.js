/**
*  This code is for DFS learning purpose.
*  Solution to Problem 22.4-2 - Introduction to algorithms: Returns the number of simple paths from u to s in Graph.
*  Zhe Zhang
*  July 5, 2013
*/

//Supporse I include the DFS.js file here.

//document.write('<script type="text/javascript" src="Graph/DFS.JS"></script>');
// jQuery.getScript('Graph/DFS.JS', function(data, textStatus) {
//   //optional stuff to do after getScript
//   console.log("Load DFS.JS");
// });

var graphBasic = graphBasic || {};

graphBasic.DFS_FindPaths = function(u, s){

	// graphBasic.DFSVisitWithPathCount(graphBasic.G.V[0], graphBasic.G.V[3]);
 //    console.log("Paths numbers: " + graphBasic.G.V[0].count +" from " + graphBasic.G.V[0].name + " to " + graphBasic.G.V[3].name);

	graphBasic.DFSVisitWithPathCount(u, s);
    console.log("Paths numbers: " + u.count +" from " + u.name + " to " + s.name);
};

graphBasic.DFSVisitWithPathCount = function(u, s){
    	
	u.d = ++graphBasic.Time;
	u.color = "Gray";
	u.count = 0;
	var adjVertex = graphBasic.G.Adj[u.name]; //get all the adjcent vertex of current node.

	for (var i = 0; i < adjVertex.length; i++) {
		var v = adjVertex[i];
		if(v.d == null ||  v.d > u.d || v.color == "Black") //KEY Point: when the edge is NOT Back edges nor corss edges.
			{
			if(v.name == s.name){
				u.count++;
				v.color = "Black"; //Mark the vertex as "Black", when it is the destination node.
			}
			else{
				u.count = u.count + graphBasic.DFSVisitWithPathCount(v,s);
			}
		}
	};

	u.color = "Black";
	u.f = ++graphBasic.Time;
	return u.count;
};

graphBasic.DFSPathRun = function(i,j){
	graphBasic.Init(); 		//Init Vertex and Edges before DFS.

	var u = graphBasic.G.V[i]; //find vertex by index.
	var s = graphBasic.G.V[j];
	graphBasic.DFS_FindPaths(u, s);
};

graphBasic.DFSPathRun(0,3);
graphBasic.DFSPathRun(1,5);
graphBasic.DFSPathRun(5,3);
graphBasic.DFSPathRun(4,7);
//console.table(graphBasic.G.V); //console.table support in Chrome