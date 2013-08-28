/*
*
*   This code is for Binary-Heap learning purpose.
*	Zhe Zhang
*	Aug 22, 2013
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
mymodule.Heap.Swap = function(array, x, y)
{
	var temp = array[x];
	array[x] = array[y];
	array[y] = temp;
}

//Maintains Max Heap's property.
mymodule.Heap.MaxHeapIFY = function(array, i){
	
	var largest = i;
	var l = mymodule.Heap.left(i);
	var r = mymodule.Heap.right(i);

	if(l < array.HeapSize && array[l] > array[i]) //!! l is index, so l should be less than heapsize.
	{
		largest = l;
	}
	else{
		largest = i;
	}
	if(r < array.HeapSize && array[r] > array[largest])
	{
		largest = r;
	}

	if(largest != i)
	{
		mymodule.Heap.Swap(array, largest, i);
		mymodule.Heap.MaxHeapIFY(array, largest); //recursively run MaxHeapIFY to maintains Max Heap's property
	}
};

mymodule.Heap.BuildMaxHeap = function(array){
	//check if array is 'array'
	array.HeapSize = array.length;
	for (var i = array.HeapSize / 2; i >= 0; i--) { //first end of first half to the first element.
		mymodule.Heap.MaxHeapIFY(array, i);
	};
};

mymodule.Heap.HeapSort = function(array){
	//check if array is 'array'
	mymodule.Heap.BuildMaxHeap(array);

	for (var i = array.HeapSize - 1; i >= 1; i--) { //from the last element to the second.
		mymodule.Heap.Swap(array, i, 0); //swap the Max element with the last element.
		array.HeapSize--;
		mymodule.Heap.MaxHeapIFY(array, 0); //Main heap's property
	};
};

mymodule.Heap.Maximum = function(array){
	return array[0];	
};

mymodule.Heap.HeapExtraMax = function(array){
	
	if(array.HeapSize >= 1)
	{
		var max = array[0];
		array[0] = array[array.HeapSize-1];
		mymodule.Heap.MaxHeapIFY(array, 0); //Main heap's property
		array.HeapSize--;
		return max;
	}
	else{
		console.log("Error - HeapSize is less than 1.");
	}
	
};

mymodule.Heap.MaxHeapIncreaseKey = function(array, i , key){
	if(array[i] >= key)
	{
		console.log("Error - The element to Increase is larger than the key.");
	}
	else
	{
		array[i] = key;
		while(i > 0 && array[mymodule.Heap.Parent(i)] < array[i])
		{
			mymodule.Heap.Swap(array, mymodule.Heap.Parent(i), i);
			i = mymodule.Heap.Parent(i);
		}
	}	
};

mymodule.Heap.MaxHeapInsert = function(array,key){
	array.HeapSize++;
	array[array.HeapSize-1] = 0- Number.MAX_VALUE;
	mymodule.Heap.MaxHeapIncreaseKey(mymodule.Heap.MyArray, array.HeapSize-1, key);
	
};

mymodule.Heap.Init = function()
{
	mymodule.Heap.MyArray = [16,4,9,14,7,10,3,2,8,1];
	console.log(mymodule.Heap.MyArray);
	mymodule.Heap.BuildMaxHeap(mymodule.Heap.MyArray);
	//mymodule.Heap.MyArray.HeapSize = mymodule.Heap.MyArray.length;
}



// mymodule.Heap.Init();
// console.log("Get Maximum element after Heap built.");
// console.log(mymodule.Heap.Maximum(mymodule.Heap.MyArray));

// console.log("After heap MaxHeapIFY at i = 1.");
// mymodule.Heap.MaxHeapIFY(mymodule.Heap.MyArray, 1);
// console.log(mymodule.Heap.MyArray);

// console.log("Increase key at index=8");
// mymodule.Heap.MaxHeapIncreaseKey(mymodule.Heap.MyArray, 8, 25);
// console.log(mymodule.Heap.Maximum(mymodule.Heap.MyArray));
// console.log(mymodule.Heap.MyArray);

// console.log("Extrac Max Heap element..");
// console.log(mymodule.Heap.HeapExtraMax(mymodule.Heap.MyArray));

// console.log("Insert key = 30 into Heap");
// mymodule.Heap.MaxHeapInsert(mymodule.Heap.MyArray,30);

// console.log("Sorting:"+mymodule.Heap.MyArray);
// mymodule.Heap.HeapSort(mymodule.Heap.MyArray);
// console.log(mymodule.Heap.MyArray);

// mymodule.Heap.MyArray = [16,4,9,14,7,10,3,2,8,1]; //Init again for sorting.
// console.log("Sorting array:"+mymodule.Heap.MyArray);
// mymodule.Heap.HeapSort(mymodule.Heap.MyArray);
// console.log("After heap sorting..");
// console.log(mymodule.Heap.MyArray);

