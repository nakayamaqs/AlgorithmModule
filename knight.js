var chess = {};

chess.size = 10000;

chess.Init = function(inputArray){
	if(chess.ValidateInputArray(inputArray)) //valide input string array.
	 {
		console.log(inputArray);
		for(var i=0; i<inputArray.length; i++)
		{
			var outputArray = chess.getKnightAttachPoints(inputArray[i]);
			console.log(outputArray);
		}	
	}
};

chess.getKnightAttachPoints = function(inputArray){
	var point = inputArray.split(',');

	var x = parseInt(point[0]);
	var y = parseInt(point[1]);

	var output = [];
	var index = 0;
	var p1 = new chess.Point(x+1,y+2);
	if(typeof p1!= "undefined" && p1.InChessBoard) output[index++] = p1.toString();

	var p2 = new chess.Point(x+1,y-2);
	if(typeof p2!= "undefined" && p2.InChessBoard) output[index++] = p2.toString();

	var p3 = new chess.Point(x+2,y+1);
	if(typeof p3!= "undefined" && p3.InChessBoard) output[index++] = p3.toString();

	var p4 = new chess.Point(x+2,y-1);
	if(typeof p4!= "undefined" && p4.InChessBoard) output[index++] = p4.toString();

	var p5 = new chess.Point(x-1,y+2);
	if(typeof p5!= "undefined" && p5.InChessBoard) output[index++] = p5.toString();

	var p6 = new chess.Point(x-1,y-2);
	if(typeof p6!= "undefined" && p6.InChessBoard) output[index++] = p6.toString();

	var p7 = new chess.Point(x-2,y+1);
	if(typeof p7!= "undefined" && p7.InChessBoard) output[index++] = p7.toString();

	var p8 = new chess.Point(x-2,y-1);
	if(typeof p8!= "undefined" && p8.InChessBoard) output[index++] = p8.toString();
	
	console.log(output);
	return output;
};

chess.getCommonPoints = function(inputArray){
  if(chess.ValidateInputArray(inputArray)) //valide input string array.
  {
  	var commonPoints = [];
  	var index = 0;

  	//When input have only one element, return the eight elements attachable by Knight!
  	if(inputArray.length == 1) return chess.getKnightAttachPoints(inputArray);
  	
	//When input have more than one element, return the common points.
  	if(inputArray.length >= 2) {
  		commonPoints = chess.getKnightAttachPoints(inputArray[0]); //init commonPoint as the first element.
  		var indexOfInput = 1; //Init: start from the 2nd element.

  		while(indexOfInput < inputArray.length)
  		{
  			var currentArray = chess.getKnightAttachPoints(inputArray[indexOfInput]);
  			var cusorIndex = commonPoints.length - 1; //init cusorIndex of current element as the last Index.

  			while(cusorIndex >= 0) //loop from end to start element of current commonPoints array.  			
  			{
  				if(currentArray.indexOf(commonPoints[cusorIndex]) == -1){ //check if the commonPoints' element has common element with current array
  					commonPoints.splice(cusorIndex,1); //remove uncommon element
  					// console.log("after aplice:"); 
  					// console.log(commonPoints); //debug purpose
  				}
				cusorIndex--; //move forward by one.

  				if(commonPoints.length == 0) return []; //return empty array when the commonPoints has been removed to empty.
  			} 			

  			indexOfInput++; //move to next input array's element.
  		}  	
  	}

	return commonPoints.sort();
  }
};

chess.Point = function(x,y){
	if(x>chess.size || y > chess.size)
	{
		//console.log("Outbound! size should be not greater than size = " + chess.size + ".");
		this.InChessBoard = false;
		return;
	}

	this.x = x;
	this.y = y;
	this.InChessBoard = true;

	this.toString = function(){
		return this.x + ',' + this.y;
	};
};

chess.ValidateInputArray = function(inputArray){
	if(inputArray == null || inputArray == 'undefined' || inputArray == "")
	{	
		console.log("input array is null or empty!");
		return false;
	}
		
	if( (inputArray instanceof Array) == false || inputArray.length <= 0)
	{
		console.log("input type is not array or Array size is 0, please check your input!");
		return false;
	}

	//Try parse every element
	for(var i =0; i<inputArray.length; i++)
	{
		var point = inputArray[i].split(',');
		if(point.length != 2 || isNaN(point[0]) || isNaN(point[1]) ) 
		{
			console.log("input array's element is not in proper format: " + inputArray[i]);
			return false;
		}
		if((parseFloat(point[0],10) != parseInt(point[0],10)) || parseFloat(point[1],10) != parseInt(point[1],10) ) //allow int only.
		{
			console.log("Contains non-integar number: " + inputArray[i]);
			return false;
		}
	}

	console.log(inputArray);
	return true;
};

//Test cases:
(function(){
	// var array1 = new Array();
	// array1[0] = "0,0";
	// array1[1] = "9999,11";
	// array1[2] = "22,10000";
	// array1[3] = "10000,10000";
	// array1[4] = "10100,10010";
	// //chess.Init();
	// chess.Init(array1);

	var array2 = new Array();
	array2[0] = "2,1";
	array2[1] = "-1,-2";
	console.log(chess.getCommonPoints(array2)); //have two common elements

	var array3 = ["0,0", "2,1"];
	console.log(chess.getCommonPoints(array3)); //havn't common elements

	var array4 = ["-1000,1000", "-999,999", "-999,997"];
	console.log(chess.getCommonPoints(array4)); //have a common element

	var array5 = ["-999,1000", "-999,1002", "-999,1003"];
	console.log(chess.getCommonPoints(array5)); //have a common element
})();
