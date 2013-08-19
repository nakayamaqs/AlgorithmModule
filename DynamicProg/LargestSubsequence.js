//namespace
var dynamicPrgm = dynamicPrgm || {};

//Below is an O(N*lgN) algorithm from here: http://www.geeksforgeeks.org/longest-monotonically-increasing-subsequence-size-n-log-n/

dynamicPrgm.LSS.CeilIndex = function(inputArray,  startIndex,  endIndex,  key) {
    var insertTo = -1; 
    while( endIndex - startIndex > 1 ) {
        insertTo = startIndex + parseInt((endIndex - startIndex)/2) ;
        if(inputArray[insertTo] >= key ) { 
         	endIndex = insertTo; 
     	}
		else { startIndex =insertTo; 
		}
    } 
    return endIndex;
}

var activeList = [];

dynamicPrgm.LSS.LongestIncreasingSubsequenceLength = function(inputArray) {
	var size = inputArray.length;
	var tailTable = [];
	tailTable[0] = inputArray[0];
	var lenthOfTail = 1;


	var activeListRow = 1;
	activeList[0] = [inputArray[0]];

	for (var i = 1; i < inputArray.length; i++) {
		var currentElement = inputArray[i];
		if( currentElement < tailTable[0]) // new smallest value
		{
			tailTable[0] = currentElement;
			activeList[0] = currentElement;
		}
		else if(currentElement >= tailTable[lenthOfTail-1])  // inputArray[i] wants to extend largest subsequence
		{
			tailTable[lenthOfTail] = currentElement; //append new element
			lenthOfTail++;

			
			activeList[activeListRow] = [];
			activeListRow++;

			for (var i = 0; i < activeList[activeListRow-2].length; i++) {
				activeList[activeListRow-1][i] = activeList[activeListRow -2][i] ;
			}
			activeList[activeListRow-1][activeList[activeListRow-2].length] = currentElement;

			// for (var i = 0; i < activeList.length; i++) {
			// 	activeList[activeListRow-1][activeList[i].length]  = tailTable[lenthOfTail-1];
			// };			
		}
		else{  
		    // inputArray[i] wants to be current end candidate of an existing subsequence
            // It will replace ceil value in tailTable.
			var indexToReplace = dynamicPrgm.LSS.CeilIndex(tailTable, -1, lenthOfTail-1, currentElement); //startindex should always be -1.
			tailTable[indexToReplace] = currentElement;

			for (var i = 0; i < activeList[indexToReplace].length; i++) {
				activeList[indexToReplace][i] = activeList[indexToReplace -1][i] ;
			}
			activeList[indexToReplace][activeList[indexToReplace].length-1]  = currentElement;
		
		}
	};

	//return lenthOfTail;
	return tailTable;
}

//console.log(dynamicPrgm.LSS.CeilIndex([2,5], -1, 1, 3));
//console.log(dynamicPrgm.LSS.LongestIncreasingSubsequenceLength([2, 5, 3, 7, 11, 8, 10, 13, 6]));
console.log(dynamicPrgm.LSS.LongestIncreasingSubsequenceLength([0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]));
