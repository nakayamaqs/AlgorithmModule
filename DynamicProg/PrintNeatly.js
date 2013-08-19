var dynamicPrgm = dynamicPrgm || {};

//Implement the print algorithm in O(N^2) running time.
dynamicPrgm.pn = {};
dynamicPrgm.pn.extras = []; //store extra spaces in each line => [1..n, 1..n]. Starts from 1.
dynamicPrgm.pn.lc = []; //line cost. => lc[1..n, 1..n]. Starts from 1.
dynamicPrgm.pn.arrangement = []; //store optimal arranges => [0..n, 0..n]. Starts from 0.
dynamicPrgm.pn.p = []; //store  the from Index for words for every line.


dynamicPrgm.pn.PrintNeatly = function(l, n, M){

	//Init all the arrays
	for (var i = 1; i <= n; i++) {
		dynamicPrgm.pn.lc[i] = [];
		dynamicPrgm.pn.extras[i] = [];
		
		//Compute extra spaces for each i...j words array.
		dynamicPrgm.pn.extras[i][i] = M - l[i-1]; //l[i-1] -> the ith element in l.

		for (var j = i+1; j <= n; j++) {
			dynamicPrgm.pn.extras[i][j] = dynamicPrgm.pn.extras[i][j-1] - l[j-1] - 1;
		};
	};

	//Compute line cost for each i...j words.
	for (var i = 1; i <= n; i++) {
		for (var j = i; j <= n; j++) {

			if(dynamicPrgm.pn.extras[i][j] < 0)
			{
				dynamicPrgm.pn.lc[i][j] = Number.MAX_VALUE;
			}
			else if( j == n && dynamicPrgm.pn.extras[i][j] >= 0)
			{
				dynamicPrgm.pn.lc[i][j] = 0;
			}
			else
			{
				dynamicPrgm.pn.lc[i][j] = Math.pow(dynamicPrgm.pn.extras[i][j],3); //power of 3 as cost
			}
		};
	};

	//Compute the optimal arrangement
	dynamicPrgm.pn.arrangement[0] = 0;

	for (var j = 1; j <= n; j++) {

		dynamicPrgm.pn.arrangement[j] = Number.MAX_VALUE;

		for (var i = 1; i <= j; i++) {

			if(dynamicPrgm.pn.arrangement[i-1] + dynamicPrgm.pn.lc[i][j] < dynamicPrgm.pn.arrangement[j]) //to-think? what to do when equal? How does it affect the print sequences.
			{
				dynamicPrgm.pn.arrangement[j] = dynamicPrgm.pn.arrangement[i-1] + dynamicPrgm.pn.lc[i][j];
				dynamicPrgm.pn.p[j] = i;
			}
		};
	};

	//var result = { resultTable : dynamicPrgm.pn.arrangement, indexTable : dynamicPrgm.pn.p};
};

//Print all the lines given any words array.
dynamicPrgm.pn.GiveLines = function(p, j){
	var i = p[j];
	var k;
	if(i == 1)
	{ 
		k = 1;
	}
	else 
	{ 
		k = dynamicPrgm.pn.GiveLines(p, i-1) + 1; 
	}

	console.log("on line k = "+ k + "; word printed from i= " + i +" to j= "+ j);
	return k;
};

//console.log(dynamicPrgm.LSS.LongestIncreasingSubsequenceLength([2, 5, 3, 7, 11, 8, 10, 13, 6]));
var inputArray = [3, 8, 4, 13, 9, 7, 15, 6];
dynamicPrgm.pn.PrintNeatly(inputArray, inputArray.length, 20);

console.log("Optimal arrangement:  "+dynamicPrgm.pn.arrangement);
console.log("Indexs:  "dynamicPrgm.pn.p);
dynamicPrgm.pn.GiveLines(dynamicPrgm.pn.p, inputArray.length);
