var mymodule = mymodule || {};

//Find the second minimal elements in n + lg(n) - 2 running time.
mymodule.SecondMin = function SecondMin (){
	
	var inputArray = [6,10,8,4,100,20,5,2,1,3,4,5,6,7,8,9,0,11,22,33,44,55]; //array to find Seconde minimal elements.
	

	var idxList = []; //save all the indexes that compares.
	for (var i = 0; i < inputArray.length; i++) {
		idxList[i] = i;
	};

	var knockoutList = []; //save all knocked out elements in list.
	for (var i = 0; i < idxList.length; i++) {
		knockoutList[i] = [];
	};

	//var winList = [];
	var j = 0;
	//number of comparisons
	var num_compare = 0;

	//index of nodes that win this tournament	
	var tempIndexList = [];
	var odd = 0; //flag: whether the input array to sort is odd or not.
	var length =0;
	// first index
    var iFirst = -1;     
    // second index
    var iSecond = -1;

	//Step 1: tournament among all elements. Pair-comparasion until you get the indexes list with the smallest element.
	while(idxList.length > 1){
		
		//Save all index that win the tournament!
    	tempIndexList = [];
    	j = 0; //reset the index for tempIndexList.
    	//nodes in idx odd, if yes then last automatically goes to next round
    	odd = idxList.length % 2;

		for (var i = 0; i < idxList.length - odd; i = i+2) {
			num_compare++;
			iFirst = idxList[i];
			iSecond = idxList[i+1];

			//pair-comparsion.
			if(inputArray[iFirst] < inputArray[iSecond])
			{
				tempIndexList[j++] = iFirst;
				length = knockoutList[iFirst].length;
				knockoutList[iFirst][length] = inputArray[iSecond]; //append current element to the array element -->'knockoutList[iFirst]'.
			}
			else{
				tempIndexList[j++] = iSecond;
				length = knockoutList[iSecond].length;
				knockoutList[iSecond][length] = inputArray[iFirst];
			}
		};

		if(odd == 1)
        {
        	tempIndexList[j++] = idxList[i]; //store the index for the last element.
        }

    //perform new tournament
    idxList = tempIndexList;

	}

	console.log( "Smallest element =" + inputArray[tempIndexList[0]]);
	console.log( "Total comparisons =", num_compare);
	console.log( "Nodes knocked off by the smallest =", knockoutList[tempIndexList[0]]);


	//Step 2: compute second smallest
	var aList = knockoutList[tempIndexList[0]];
	var v = 0;
	if (aList.length > 0)
	    {
	    	v = aList[0];
	    	for (var i = 0; i < aList.length; i++) {
	        	num_compare += 1
	        	if (v > aList[i]) { 
	        		v = aList[i];
	        	}
	    	}
	    }
	console.log(aList);
    console.log( "Second smallest element =" + v );
    console.log( "Total comparisons =" + num_compare);
};

mymodule.SecondMin();
