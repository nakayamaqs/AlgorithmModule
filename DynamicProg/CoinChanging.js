/**
*  This code is for Coin changing learning purpose.
*  Solution to Problem 16-1 - Introduction to algorithms: Coin changing.
*  dynamicPrgm.coinChanging(), Running time is O(n*k). n is size of cents, k is number of kinds of coins.
*  dynamicPrgm.coinChanging_New(), Running time is O(n*k). n is size of cents, k is number of kinds of coins.
*  Refer to: http://oucsace.cs.ohiou.edu/~razvan/courses/cs4040/lecture19.pdf
*  Zhe Zhang
*  July 11, 2013
*/


var dynamicPrgm = dynamicPrgm || {};

dynamicPrgm.CoinCount = []; //store number of coins
dynamicPrgm.CoinResult = []; //store the coins choosed

dynamicPrgm.CoinResult_New = [];

dynamicPrgm.coinChanging = function(n,d,k){

	dynamicPrgm.CoinCount[0] = 0;
	for (var j = 1; j <= n; j++) {
		//Init coin count as Max value;
		dynamicPrgm.CoinCount[j] = Number.MAX_VALUE;
			
		for (var i = 1; i <= k; i++) {
			//When 1, we can include d[i] coind; 2, the left count + 
			var currentCoinIndex = i-1;
			if(d[currentCoinIndex] <= j && 1 + dynamicPrgm.CoinCount[j-d[currentCoinIndex]] < dynamicPrgm.CoinCount[j])
			{
				dynamicPrgm.CoinCount[j] = 1 + dynamicPrgm.CoinCount[j-d[currentCoinIndex]];
				dynamicPrgm.CoinResult[j] = d[currentCoinIndex];
			}
		};
	};
	return dynamicPrgm.CoinCount;
};

dynamicPrgm.PrintChoosedCoins = function(dResult,j){
	if(j > 0)
	{
		dynamicPrgm.PrintChoosedCoins(dResult, j - dResult[j]); 
		console.log("Select: "+dResult[j] + ";");
	}
};

dynamicPrgm.coinChanging_New = function(n,d,k){
	// dynamicPrgm.CoinResult_New is Matrix as [1...K, 1...n].
	for (var i = 0; i <= k; i++) {
    	dynamicPrgm.CoinResult_New[i] = [];
    	dynamicPrgm.CoinResult_New[i][0] = 0;
    }

    for (var i = 1; i <= n; i++) {
    	dynamicPrgm.CoinResult_New[0][i] = Number.MAX_VALUE;
    	dynamicPrgm.CoinResult_New[1][i] = i;
    };

	//console.table(dynamicPrgm.CoinResult_New);
	
    for (var j = 1; j <= n; j++) {
    	
    	for (var i = 1; i <= k; i++) {
    		var currentCoinIndex = i-1;
    		if(j < d[currentCoinIndex]){
    			dynamicPrgm.CoinResult_New[i][j] = dynamicPrgm.CoinResult_New[i-1][j];
    		}
    		else{
    			dynamicPrgm.CoinResult_New[i][j] = Math.min(dynamicPrgm.CoinResult_New[i-1][j], 1 + dynamicPrgm.CoinResult_New[i][j - d[currentCoinIndex]]);
    		}	 	
    	};
    };
};

dynamicPrgm.coinChangingRun = function(m){
	//Init varaiables
	var n = 30;
	var denominations = [1,2,5,10,25];
	dynamicPrgm.CoinCount = []; //number of coins
	dynamicPrgm.CoinResult = []; //the coins choosed

	//Choose which dynamic programming way to choose.
	if(m == 1){
		var result = dynamicPrgm.coinChanging(n, denominations,denominations.length);
		console.log("Coin Count array:" + result);
		dynamicPrgm.PrintChoosedCoins(dynamicPrgm.CoinResult,n);
	}
	else{
		n = 8;
		denominations = [1,4,6];

		dynamicPrgm.coinChanging_New(n, denominations,denominations.length);
		console.table(dynamicPrgm.CoinResult_New);
	}
};

//Run coinChanging_New by selection 2.
dynamicPrgm.coinChangingRun(2);
