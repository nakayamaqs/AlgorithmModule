//namespace
var dynamicPrgm = dynamicPrgm || {};


dynamicPrgm.MarixChainOrder = function MarixChainOrder(plist){
	var n = plist.length - 1; //plist's length is 1 larger than the Matrix elements
	var m = []; //save the numbers of calculations
	var s = []; //save the K position to splict matrix

	for (var i = 0; i < n; i++) {
		m[i] = [];
		s[i] = [];
	};

	for (var i = 0; i < n; i++) {
		m[i][i] = 0;
		console.log(plist[i]);
	};

	//Loop the Matrices by length, 2 to n.
	for (var MLength = 2; MLength <= n; MLength++) {
		
		for (var i = 0; i <= n-MLength; i++) {

			var j = i + MLength - 1 ; //get j index, which starts from the second element: Index = 1;
			m[i][j] = Number.MAX_VALUE; //set default as smallest number;

			//K should starts from i to j-1.
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
		//console.log("A"+i);
		dynamicPrgm.outputBuffer += "A"+i;
	}
	else
	{
		//console.log("(");
		dynamicPrgm.outputBuffer += "(";

		printOrder(s,i, s[i][j]);
		printOrder(s,s[i][j] + 1, j);

		dynamicPrgm.outputBuffer += ")"
		//console.log(")");
	}
}

dynamicPrgm.outputBuffer = "";

var inputArray = [1,3,4,10,5];
var orderas = dynamicPrgm.MarixChainOrder(inputArray);
console.log(orderas);

dynamicPrgm.outputBuffer = ""; //init everytime
dynamicPrgm.PrintMarix(orderas.sArray, 0, inputArray.length -2);
console.log(dynamicPrgm.outputBuffer);