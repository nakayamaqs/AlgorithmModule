/*
*
*   This code is for Binary-Heap learning purpose. 
*	Implement Min Heap by copy & paste MaxHeap.js.
*	Zhe Zhang
*	Aug 28, 2013
*
*/
var mymodule = mymodule || {};
mymodule.Heap = {};
mymodule.Heap.MyArray = [];

mymodule.Heap.Parent = function(i){
	//i is Index, so we should convernt to number first.
	return Math.round(i/2) - 1; //calculate partent index for array starts from 0..
};

mymodule.Heap.left = function(i){
	return (i*2) + 1;
};

mymodule.Heap.right = function(i){
	return ((i+1) * 2);
};

//swap two elements in array.
mymodule.Heap.Swap = function(array, x, y){
	var temp = array[x];
	array[x] = array[y];
	array[y] = temp;
};

//Maintains Min Heap's property.
mymodule.Heap.MinHeapIFY = function(array, i){
	
	var smallest = i;
	var l = mymodule.Heap.left(i);
	var r = mymodule.Heap.right(i);

	if(l < array.HeapSize && array[l] < array[i]) //!! l is index, so l should be less than heapsize.
	{
		smallest = l;
	}
	else{
		smallest = i;
	}
	if(r < array.HeapSize && array[r] < array[smallest])
	{
		smallest = r;
	}

	if(smallest != i)
	{
		mymodule.Heap.Swap(array, smallest, i);
		mymodule.Heap.MinHeapIFY(array, smallest); //recursively run MinHeapIFY to maintains Min Heap's property
	}
};

mymodule.Heap.BuildMinHeap = function(array){
	//check if array is 'array'
	array.HeapSize = array.length;
	for (var i = array.HeapSize / 2; i >= 0; i--) { 	//from end of first half to the first element.
		mymodule.Heap.MinHeapIFY(array, i);
	};
};

mymodule.Heap.HeapSort = function(array){
	//to-do: check if array is 'array'
	mymodule.Heap.BuildMinHeap(array);

	for (var i = array.HeapSize - 1; i >= 1; i--) { 	//from the last element to the second.
		mymodule.Heap.Swap(array, i, 0); 				//swap the Min element with the last element.
		array.HeapSize--;
		mymodule.Heap.MinHeapIFY(array, 0); 			//Main heap's property
	};
};

mymodule.Heap.Minimum = function(array){
	return array[0];	
};

mymodule.Heap.HeapExtraMin = function(array){
	if(array.HeapSize >= 1)
	{
		var Min = array[0];
		array[0] = array[array.HeapSize-1];
		array.HeapSize--;
		mymodule.Heap.MinHeapIFY(array, 0); 			//Main heap's property
		return Min;
	}
	else{
		console.log("Error - HeapSize is less than 1.");
	}
};

mymodule.Heap.MinHeapDecreaseKey = function(array, i , key){
	if(array[i] <= key)
	{
		console.log("Error - The element to Decrease is smaller than the key.");
	}
	else
	{
		array[i] = key;
		while(i > 0 && array[mymodule.Heap.Parent(i)] > array[i])
		{
			mymodule.Heap.Swap(array, mymodule.Heap.Parent(i), i);
			i = mymodule.Heap.Parent(i);
		}
	}	
};

mymodule.Heap.MinHeapInsert = function(array,key){
	array.HeapSize++;
	array[array.HeapSize-1] = Infinity; //Number.Min_VALUE;
	mymodule.Heap.MinHeapDecreaseKey(mymodule.Heap.MyArray, array.HeapSize-1, key);
};

mymodule.Heap.Init = function(){
	mymodule.Heap.MyArray = [16,4,9,14,7,10,3,2,8,1];
	console.log(mymodule.Heap.MyArray);
	mymodule.Heap.BuildMinHeap(mymodule.Heap.MyArray);
	//mymodule.Heap.MyArray.HeapSize = mymodule.Heap.MyArray.length;
}



// mymodule.Heap.Init();
// console.log("Get Minimum element after Heap built.");
// console.log(mymodule.Heap.Minimum(mymodule.Heap.MyArray));

// console.log("After heap MinHeapIFY at i = 1.");
// mymodule.Heap.MinHeapIFY(mymodule.Heap.MyArray, 1);
// console.log(mymodule.Heap.MyArray);

// console.log("Decrease key at index=9");
// mymodule.Heap.MinHeapDecreaseKey(mymodule.Heap.MyArray, 9, 5);
// console.log(mymodule.Heap.Minimum(mymodule.Heap.MyArray));
// console.log(mymodule.Heap.MyArray);

// console.log("Extrac Min Heap element..");
// console.log(mymodule.Heap.HeapExtraMin(mymodule.Heap.MyArray));

// console.log("Insert key = 5 into Heap");
// mymodule.Heap.MinHeapInsert(mymodule.Heap.MyArray,5);

// console.log("Sorting:"+mymodule.Heap.MyArray);
// mymodule.Heap.HeapSort(mymodule.Heap.MyArray);
// console.log(mymodule.Heap.MyArray);

// mymodule.Heap.MyArray = [16,4,9,14,7,10,3,2,8,1]; //Init again for sorting.
// console.log("Init array again.");
// console.log("Prepare to sort the array: "+mymodule.Heap.MyArray);
// mymodule.Heap.HeapSort(mymodule.Heap.MyArray);
// console.log("After heap sorting..");
// console.log(mymodule.Heap.MyArray);

