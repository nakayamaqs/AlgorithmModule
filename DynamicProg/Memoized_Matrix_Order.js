/*
*
*   This code is for Matrix-chain multiplication problem,Memoized_Matrix_Order version, solve the problem in Bottom up way.
*	Details of recursive equation:
*		m[i,j] = 0,   when i == j;
*		m[i,j] = min(m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j];),   when i < j;  i<=k<j
*	Running time is theta(n 3e). Space is Theta (n square) - Array m and s as below..
*	Zhe Zhang
*	Created on Someday, 2013
*   Latest updated on Sep 2, 2013
*
*/

//namespace
var dynamicPrgm = dynamicPrgm || {};

dynamicPrgm.Memoized_Matrix_Order = function Memoized_Matrix_Order(plist){
	var n = plist.length -1; 	//Matrices length: plist's length is 1 larger than the Matrix elements
	var m = []; 				//save the costs (numbers of calculations).
	var s = []; 				//records which index of k achieved the optimal cost in computing m[i,j].

	for (var i = 0; i < n; i++) {
		m[i] = [];
		s[i] = [];
	};

	for (var i = 0; i < n; i++) {
		m[i][i] = 0;
		//console.log(plist[i]);
	};

	for (var MLength = 2; MLength <= n; MLength++) { // MLength is the chain length: from 2 to n.
		
		for (var i = 0; i <= n-MLength; i++) {

			var j = i + MLength - 1 ; 		//get j index, which starts from the second element: Index = 1;
			m[i][j] = Number.MAX_VALUE; 	//set default as largest number;

			//K should starts from i to j-1.
			//Note: It(recursive equation) shows that the cost m[i,j] of computing a matrix-chain product of j-i+1 matrices depends 
			//only on the costs of computing matrix-chain products of fewer than j-i+1 matrices.
			for (var k = i; k <= j-1; k++) {

				var p = m[i][k] + m[k+1][j] + plist[i]*plist[k+1]*plist[j+1]; 
				if( p< m[i][j])
				{
					//save calculations and K position into output tables.
					m[i][j] = p;
					s[i][j] = k;
				}
			};
		};
	};
	
	var result = {};
	result.mArray = m;
	result.sArray = s;

	return result;
};

dynamicPrgm.PrintMarix = function printOrder(s,i,j){
	if(i==j)
	{
		dynamicPrgm.outputBuffer += "A"+i;
	}
	else if(i<j)
	{
		dynamicPrgm.outputBuffer += "(";

		printOrder(s,i, s[i][j]);
		printOrder(s,s[i][j] + 1, j);

		dynamicPrgm.outputBuffer += ")"
	}
	else { 
		return "";
		//throw error.
	}
}

dynamicPrgm.outputBuffer = "";

var inputPlist = [1,3,4,10,5]; //Input is P list, where matrix Ai has dimension P(i-1)P(i).
var orderas = dynamicPrgm.Memoized_Matrix_Order(inputPlist);
console.log(orderas);

dynamicPrgm.outputBuffer = ""; //init everytime
dynamicPrgm.PrintMarix(orderas.sArray, 0, inputPlist.length -2);
console.log(dynamicPrgm.outputBuffer);