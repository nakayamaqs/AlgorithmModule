var dynamicPrgm = dynamicPrgm || {};

dynamicPrgm.LSS ={};
dynamicPrgm.LSS.m = []; //save the numbers of nodes
dynamicPrgm.LSS.treeList =[]; //tree list for input numbers.

dynamicPrgm.LSS.Init = function(inputArray){

	dynamicPrgm.LSS.m = [];
	dynamicPrgm.LSS.treeList =[]; 

	for (var i = 0; i < inputArray.length; i++) {
		dynamicPrgm.LSS.m[i] = 0;
	};

	dynamicPrgm.LSS.BuildTree(dynamicPrgm.LSS.treeList,inputArray);
};

dynamicPrgm.LSS.Run = function(node){

	if(node != null){
		//when current node has no child nodes.
		// if((dynamicPrgm.LSS.treeList[node.LeftChild] == null && dynamicPrgm.LSS.treeList[node.RightChild] == null) 
		// 	|| (node.RightChild == null && node.LeftChild == null))//to-do

		dynamicPrgm.LSS.Run(dynamicPrgm.LSS.treeList[node.LeftChild]);
		dynamicPrgm.LSS.Run(dynamicPrgm.LSS.treeList[node.RightChild]);

		if(node.RightChild == null)
		{
			dynamicPrgm.LSS.m[node.Index] = 1; //default length is 1.
		}
		else{
			dynamicPrgm.LSS.m[node.Index] = dynamicPrgm.LSS.m[node.RightChild] + 1;
		}
	}
};

dynamicPrgm.LSS.Print = function(){

	var maxNumber = 0;
	for (var i = 0; i < dynamicPrgm.LSS.treeList.length; i++) {
		if( maxNumber < dynamicPrgm.LSS.m[i] ){
			maxNumber = dynamicPrgm.LSS.m[i];
		}
	};

	console.log(dynamicPrgm.LSS.m);
	console.log("Max number is: " + maxNumber);
};

dynamicPrgm.LSS.BuildTree = function(treeList, inputArray){
	for (var i = 0; i < inputArray.length; i++) {
		dynamicPrgm.LSS.InsertTree(treeList[0], treeList, inputArray[i]); //default root node is the first element
	};
};

dynamicPrgm.LSS.InsertTree = function(root, treeList, value){

    var insertToIndex = dynamicPrgm.LSS.SearchTree(root, value);
    var newNode;
    if(insertToIndex == null) //When this is the first node to insert.
    {
    	newNode = new dynamicPrgm.LSS.Node(0, value, null, null, null);
    	treeList[treeList.length] = newNode;
    }
    else{
	    //console.log("l: "+treeList.length);
	    newNode = new dynamicPrgm.LSS.Node(treeList.length, value, insertToIndex, null, null);
	    treeList[treeList.length] = newNode;

		var parent = treeList[insertToIndex];
	    if(parent.Value > value)
	    {
	    	parent.LeftChild = newNode.Index;
	    }
	    else { 
	    	parent.RightChild = newNode.Index;
	    }
	}
};

dynamicPrgm.LSS.SearchTree = function(root, value){	
	if(root != null) 
	{
		if(root.Value > value)
		{
			if(root.LeftChild != null){
				return dynamicPrgm.LSS.SearchTree(dynamicPrgm.LSS.treeList[root.LeftChild], value);
			}
			else{
				return root.Index;
			}
		}
		else{ 
			if(root.RightChild != null){ 
				return dynamicPrgm.LSS.SearchTree(dynamicPrgm.LSS.treeList[root.RightChild], value);}
			
			else{
				return root.Index;
			}
		};
	}
	return null;
};

//define Node object.
dynamicPrgm.LSS.Node = function(index, value,insertToIndex, leftChildIndex, rightChildIndex){
	
	this.Index = index;
	this.Value = value;
	this.Parent = insertToIndex;
	this.LeftChild = leftChildIndex;
	this.RightChild = rightChildIndex;

	this.toString = function(){
		return this.Value + ' at Index -' + this.Index;
	};
};

//Uncomment below to check what I did: Build BSTree, and trying to calculate(Undone).

// dynamicPrgm.LSS.Init([1,5,3,7,4,100,7,8]);
// //dynamicPrgm.LSS.Init([1,5,3,7]);
// console.log(dynamicPrgm.LSS.treeList);

// dynamicPrgm.LSS.Run(dynamicPrgm.LSS.treeList[0]);
// dynamicPrgm.LSS.Print();