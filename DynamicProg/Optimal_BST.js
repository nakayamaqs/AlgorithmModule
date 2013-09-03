/*
*
*   This code is for optimal binary search tree problem, solve the problem in Bottom up way.
*	Details of recursive equation:
*		case 1: e[i,j] = q[i-1],   if j = i-1;
*		case 2: e[i,j] = min(e[i][r-1] + e[r+1][j] + w[i,j];),   if i <= j
*	Some Equations: 
		1, E[search cost in T] = sum( (depth_T(k[i]) + 1)*p[i] ) {i=1 to n} + sum( (depth_T(d[i]) + 1)*q[i] ) {i=0 to n}
							= 1 + sum( depth_T(k[i])*p[i] ) {i=1 to n}   + sum( depth_T(d[i])*q[i] ) {i=1 to n}
*		2, w(i,j) = sum(p[l]) {l from i to j} + sum(q[l]) {l from i-1 to j};            //if k[r] is the root of an optimal subtree containing keys ki ... kj
*		3, e[i,j] = p[r] + ( e[i,r-1] + w(i, r-1) ) + ( e[r+1,j] + w(r+1,j) ); //root is r, left subtree [i, r-1], right subtree [r,j];
*		=>
*		e[i,j] = e[i,r-1] + e[r,j] + w(i,j);
		
		Since w(i,j) = w(i,r) + p[r] + w(r+1,j);
		=>
		w(i,j) = w(i,j-1) + p[j] + q[j];  //We have: w[j+1,j] = q[j]
*	Running time is theta(n 3e). Space is Theta (n square).
*	Zhe Zhang
*	Created on Sep 3, 2013
*   Latest updated on Sep 3, 2013
*
*/

var dynamicPrgm = dynamicPrgm || {};

/*
p: length is n, p[i] represents possibility of search Key[i] of n keys
q, length is n+1, q[i] represents possibility of search one of n+1 dummy keys
*/
dynamicPrgm.Optimal_BST = function(p, q, n){
	var e = []; 		//save search cost of Optimal-BST-tree, useful range [1,n+1][0,n], length should be n+1.
	var w = []; 		//save the increase of of sum of possiblities of sub trees), length should be n+1.
	var root = []; 		//root of the Optimal-BST-tree, length should be n

	//init w and e, and root.
	for (var i = 1; i <= n+1; i++) {
		e[i] = [];
		w[i] = [];
		e[i][i-1] = q[i-1];   	//from recursive equation case 1.
		w[i][i-1] = q[i-1];   	//by Equation 1, the inscrease is possibility of all keys(it just has dummy kesy in this case). 

		if(i<n+1){ 				//do not need to init root[n+1]
			root[i] = []; 		//init root from 1 to n
		}
	};

	for (var l = 1; l <= n; l++) {
		for (var i = 1; i <= n-l+1; i++) {
				var j = i + l - 1;
				e[i][j] = Infinity; //default cost is infinity.
				w[i][j] = w[i][j-1] + p[j] + q[j];

				//iterate sub problem from i to j.
				for (var r = i; r <= j; r++) {
					var t = e[i][r-1] + e[r+1][j] + w[i][j];  ////from recursive equation case 2
					if(t < e[i][j]){
						e[i][j] = t;
						root[i][j] = r;
					}
				};
		};
	};

	return {
		CostArray : e,
		W_Array : w,
		Root : root
	};
};

//Not actually used here. Due to a know bug: https://bugzilla.mozilla.org/show_bug.cgi?id=452198
// we have know bug about javascript add for floats, e.g. 0.4+0.2 = 0.6000000000000001. 
dynamicPrgm.validateInput = function validateInput(p,q){
	var inputArray = p.concat(q);
	console.log(inputArray);
	var sum = _.reduce(inputArray, function(memo, num){ 
		if(_.isNumber(num))
		{
			return parseFloat(memo) + parseFloat(num); 
		}
		else { 
			return parseFloat(memo);
		}
	}, 0);
	console.log(sum);
	return sum == 1;
};

var p = [undefined, 0.15, 0.10, 0.05, 0.10, 0.20];
q = [ 0.05, 0.10, 0.05, 0.05, 0.05, 0.10];
n = 5;

var result = dynamicPrgm.Optimal_BST(p, q, n);
console.log(result);
