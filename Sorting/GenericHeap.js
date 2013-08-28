/*
*
*   This code is for Binary-Heap learning purpose.  Implement Min Generic Heap by referring to MinHeap.js. 
*	The min generic heap support operations on any object, given to the property or compare function.
*	Suppose Underscore imported here.
*	Zhe Zhang
*	Aug 28, 2013
*
*/
/// <reference path="jslib/underscore/underscore-min.js"/>

var mymodule = mymodule || {};
mymodule.GenericHeap = {};
mymodule.GenericHeap.Key = "";
mymodule.GenericHeap.MyArray = [];

mymodule.GenericHeap.Parent = function(i){
	//i is Index, so we should convernt to number first.
	return Math.round(i/2) - 1; //calculate partent index for array starts from 0..
};

mymodule.GenericHeap.left = function(i){
	return (i*2) + 1;
};

mymodule.GenericHeap.right = function(i){
	return ((i+1) * 2);
};

//swap two elements in array.
mymodule.GenericHeap.Swap = function(array, x, y){
	var temp = array[x];
	array[x] = array[y];
	array[y] = temp;
};

//Default compare function: return difference of two elements.
mymodule.GenericHeap.Compare = function(x, y){
	return x-y;  
};

//Default SetKey function: return difference of two elements in array.
mymodule.GenericHeap.SetKey = function(array, i, key){
	array[i] = key;  
};

//Maintains Min Heap's property.
mymodule.GenericHeap.MinHeapIFY = function(array, i){
	
	var smallest = i;
	var l = mymodule.GenericHeap.left(i);
	var r = mymodule.GenericHeap.right(i);

	//!! l is index, so l should be less than heapsize,
	if(l < array.HeapSize && mymodule.GenericHeap.Compare(array[l],array[smallest]) < 0 ) //array[l] < array[i] 
	{
		smallest = l;
	}
	else{
		smallest = i;
	}
	if(r < array.HeapSize && mymodule.GenericHeap.Compare(array[r],array[smallest]) < 0 ) //array[r] < array[smallest]
	{
		smallest = r;
	}

	if(smallest != i)
	{
		mymodule.GenericHeap.Swap(array, smallest, i);
		mymodule.GenericHeap.MinHeapIFY(array, smallest); //recursively run MinHeapIFY to maintains Min Heap's property
	}
};

mymodule.GenericHeap.BuildMinHeap = function(array, compareFunc, setKeyFunc){
	//! Note: support customzied sorting for generic JS object.
	if(_.isFunction(compareFunc)){
		mymodule.GenericHeap.Compare = compareFunc; //over write with customized compare function.
	}
	if(_.isFunction(setKeyFunc)){
		mymodule.GenericHeap.SetKey = setKeyFunc;
	}
	//check if array is 'array'
	array.HeapSize = array.length;
	for (var i = Math.round(array.HeapSize / 2); i >= 0; i--) { 	//from end of first half to the first element.
		mymodule.GenericHeap.MinHeapIFY(array, i);
	};
};

mymodule.GenericHeap.HeapSort = function(array){
	//to-do: check if array is 'array'
	mymodule.GenericHeap.BuildMinHeap(array);

	for (var i = array.HeapSize - 1; i >= 1; i--) { 	//from the last element to the second.
		mymodule.GenericHeap.Swap(array, i, 0); 				//swap the Min element with the last element.
		array.HeapSize--;
		mymodule.GenericHeap.MinHeapIFY(array, 0); 			//Main heap's property
	};
};

mymodule.GenericHeap.Minimum = function(array){
	return array[0];	
};

mymodule.GenericHeap.HeapExtraMin = function(array){
	if(array.HeapSize >= 1)
	{
		var Min = array[0];
		array[0] = array[array.HeapSize-1];
		mymodule.GenericHeap.MinHeapIFY(array, 0); 			//Main heap's property
		array.HeapSize--;
		return Min;
	}
	else{
		console.log("Error - HeapSize is less than 1.");
	}
};

mymodule.GenericHeap.MinHeapDecreaseKey = function(array, i , key){
	if(mymodule.GenericHeap.Compare(array[i] , key) <= 0)
	{
		console.log("Error - The element to Decrease is smaller than the key.");
	}
	else
	{
		mymodule.GenericHeap.SetKey(array, i, key); //overwritted SetKey func.
		//array[i] = key;
		while(i > 0 && mymodule.GenericHeap.Compare(array[mymodule.GenericHeap.Parent(i)] , array[i]) > 0) //array[mymodule.GenericHeap.Parent(i)] > array[i]
		{
			mymodule.GenericHeap.Swap(array, mymodule.GenericHeap.Parent(i), i);
			i = mymodule.GenericHeap.Parent(i);
		}
	}	
};

mymodule.GenericHeap.MinHeapInsert = function(array,key){
	array.HeapSize++;
	array[array.HeapSize-1] = Infinity; //Number.Min_VALUE;
	mymodule.GenericHeap.MinHeapDecreaseKey(mymodule.GenericHeap.MyArray, array.HeapSize-1, key);
	
};

mymodule.GenericHeap.Init = function()
{
	mymodule.GenericHeap.MyArray = [18,4,9,14,7,10,3,2,8,1];
	console.log(mymodule.GenericHeap.MyArray);
	mymodule.GenericHeap.BuildMinHeap(mymodule.GenericHeap.MyArray);
	//mymodule.GenericHeap.MyArray.HeapSize = mymodule.GenericHeap.MyArray.length;
}



// mymodule.GenericHeap.Init();
// console.log("Get Minimum element after Heap built.");
// console.log(mymodule.GenericHeap.Minimum(mymodule.GenericHeap.MyArray));

// console.log("After running heap MinHeapIFY at i = 1.");
// mymodule.GenericHeap.MinHeapIFY(mymodule.GenericHeap.MyArray, 1);
// console.log(mymodule.GenericHeap.MyArray);

// console.log("Decrease key at index=9");
// mymodule.GenericHeap.MinHeapDecreaseKey(mymodule.GenericHeap.MyArray, 9, 5);
// console.log(mymodule.GenericHeap.Minimum(mymodule.GenericHeap.MyArray));
// console.log(mymodule.GenericHeap.MyArray);

// console.log("Extrac Min Heap element..");
// console.log(mymodule.GenericHeap.HeapExtraMin(mymodule.GenericHeap.MyArray));

// console.log("Insert key = 5 into Heap");
// mymodule.GenericHeap.MinHeapInsert(mymodule.GenericHeap.MyArray,5);

// console.log("Sorting:"+mymodule.GenericHeap.MyArray);
// mymodule.GenericHeap.HeapSort(mymodule.GenericHeap.MyArray);
// console.log(mymodule.GenericHeap.MyArray);

// mymodule.GenericHeap.MyArray = [16,4,9,14,7,10,3,2,8,1]; //Init again for sorting.
// console.log("Init array again.");
// console.log("Prepare to sort the array: "+mymodule.GenericHeap.MyArray);
// mymodule.GenericHeap.HeapSort(mymodule.GenericHeap.MyArray);
// console.log("After heap sorting..");
// console.log(mymodule.GenericHeap.MyArray);

