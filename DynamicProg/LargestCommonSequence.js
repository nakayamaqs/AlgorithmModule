/*
*
*   This code is for Largest common sequence problem.
*	Algorithm is simple two case:
*		case 1: T[i][j] = T[i-1][j-1] + 1;
*		case 2: T[i][j] = Max(T[i][j-1], T[i-1][j]);
*	Running time is Theta(m*n). 
*	Suppose Underscore imported here.
*	Zhe Zhang
*	Created on Sep 1, 2013
*   Latest updated on Sep 1, 2013
*
*/

/// <reference path="jslib/underscore/underscore-min.js"/>
var dynamicPrgm = dynamicPrgm || {};
dynamicPrgm.LCS = dynamicPrgm.LCS || {};
dynamicPrgm.LCS.tabular = []; //store all the results including each subproblem.
dynamicPrgm.LCS.Solution = ""; //store solution "common sequence of two arrays."
dynamicPrgm.LCS.Number = 0; //default number of LCS.

//Note: A_Index/B_Index should starts from 1.
dynamicPrgm.LCS.Algorithm = function(inputArrayA, inputArrayB){
	var m = inputArrayA.length;
	n = inputArrayB.length;

	//Init: dynamicPrgm.LCS.tabular size: [0...m][0...n].
	for (var i = 0; i <= m; i++) {
		dynamicPrgm.LCS.tabular[i] = [];
		dynamicPrgm.LCS.tabular[i][0] = 0;
	};
	for (var j = 0; j <= n; j++) {
			dynamicPrgm.LCS.tabular[0][j] = 0;
	};

	//Print inited tabular object
	console.table(dynamicPrgm.LCS.tabular);

	for (var i = 0; i < m; i++) {		//iterate each element, so i < m instead of i<= m;
		for (var j = 0; j < n; j++) {
			if(inputArrayA[i] == inputArrayB[j]){
				dynamicPrgm.LCS.tabular[i+1][j+1] = dynamicPrgm.LCS.tabular[i][j] + 1; //case 1: T[i][j] = T[i-1][j-1] + 1;
				if(dynamicPrgm.LCS.Number < dynamicPrgm.LCS.tabular[i+1][j+1]){
					dynamicPrgm.LCS.Number = dynamicPrgm.LCS.tabular[i+1][j+1];
					dynamicPrgm.LCS.Solution += "inputArrayA:" + i + "; value:" +inputArrayA[i] + ";  ";
				}
			}
			else{
				dynamicPrgm.LCS.tabular[i+1][j+1] = Math.max(dynamicPrgm.LCS.tabular[i][j+1],dynamicPrgm.LCS.tabular[i+1][j]); //case 2: T[i][j] = Max(T[i][j-1], T[i-1][j]);
			}
		};
	};

	//after running dync prog..
	console.table(dynamicPrgm.LCS.tabular);
	console.log("Number of largest commone sequence of the two arrays: " + dynamicPrgm.LCS.Number);
	console.log(dynamicPrgm.LCS.Solution);
};

dynamicPrgm.LCS.Algorithm(["A","D","B","C"],["D","A","B","D","E","C"]);


