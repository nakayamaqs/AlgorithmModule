/*
*
*   This code is for Matrix-chain multiplication problem,Memoized_Matrix_Chain version, solve the problem in Top Down way.
*	Details of recursive equation:
*		m[i,j] = 0,   when i == j;
*		m[i,j] = min(m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j];),   when i < j;  i<=k<j
*	Running time is theta(n 3e). Space is Theta (n square) - Array m and s as below..
*	Zhe Zhang
*	Created on Sep 2, 2013
*   Latest updated on Sep 2, 2013
*
*/

//namespace
var dynamicPrgm = dynamicPrgm || {};

dynamicPrgm.Memoized_Matrix_Chain = function Memoized_Matrix_Chain(plist){
	var n = plist.length -1; 	//Matrices length: plist's length is 1 larger than the Matrix elements
	var m = []; 				//save the costs (numbers of calculations).
	var s = []; 				//records which index of k achieved the optimal cost in computing m[i,j].

	for (var i = 0; i < n; i++) {
		m[i] = [];
		s[i] = [];
		for (var j = 0; j < n; j++) {
			m[i][j] = Infinity;
		};
	};

	var result = dynamicPrgm.Lookup_chain(m, plist, 0, n-1);
	console.table(m);	// print also all values in the m table.
	return result;
};

dynamicPrgm.Lookup_chain = function Lookup_chain(m, plist, i, j){
	if(m[i][j] < Number.Infinity)
	{
		return m[i][j];
	}
	else if(i == j)
	{
		m[i][j] = 0;
	}
	else 
	{
		for (var k = i; k <= j-1; k++) {
			var p = dynamicPrgm.Lookup_chain(m, plist, i,k) + dynamicPrgm.Lookup_chain(m, plist, k+1, j) + plist[i]*plist[k+1]*plist[j+1]; 
			if( p< m[i][j])
				{
					//save calculations and K position into output tables.
					m[i][j] = p;
					//s[i][j] = k;
				}
		};

	}
	return m[i][j];	
	// var result = {};
	// result.mArray = m;
	// result.sArray = s;

	// return result;
};

var inputPlist = [1,3,4,10,5]; //Input is P list, where matrix Ai has dimension P(i-1)P(i).
var result = dynamicPrgm.Memoized_Matrix_Chain(inputPlist);
console.log(result);