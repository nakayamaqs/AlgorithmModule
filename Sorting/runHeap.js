/*
*
*   This code is for Binary-Heap learning purpose. 
*	Make sure Min Heap or Max Heap files is included!
*	Zhe Zhang
*	Aug 28, 2013
*
*/

mymodule.Heap.RunMinHeap = function(){
	mymodule.Heap.Init();
	console.log("Get Minimum element after Heap built.");
	console.log(mymodule.Heap.Minimum(mymodule.Heap.MyArray));

	console.log("After heap MinHeapIFY at i = 1.");
	mymodule.Heap.MinHeapIFY(mymodule.Heap.MyArray, 1);
	console.log(mymodule.Heap.MyArray);

	console.log("Decrease key at index=9");
	mymodule.Heap.MinHeapDecreaseKey(mymodule.Heap.MyArray, 9, 5);
	console.log(mymodule.Heap.Minimum(mymodule.Heap.MyArray));
	console.log(mymodule.Heap.MyArray);

	console.log("Extrac Min Heap element..");
	console.log(mymodule.Heap.HeapExtraMin(mymodule.Heap.MyArray));

	console.log("Insert key = 5 into Heap");
	mymodule.Heap.MinHeapInsert(mymodule.Heap.MyArray,5);

	console.log("Sorting:"+mymodule.Heap.MyArray);
	mymodule.Heap.HeapSort(mymodule.Heap.MyArray);
	console.log(mymodule.Heap.MyArray);

	mymodule.Heap.MyArray = [16,4,9,14,7,10,3,2,8,1]; //Init again for sorting.
	console.log("Init array again.");
	console.log("Prepare to sort the array: "+mymodule.Heap.MyArray);
	mymodule.Heap.HeapSort(mymodule.Heap.MyArray);
	console.log("After heap sorting..");
	console.log(mymodule.Heap.MyArray);
};

mymodule.Heap.RunMaxHeap = function(){
	mymodule.Heap.Init();
	console.log("Get Maximum element after Heap built.");
	console.log(mymodule.Heap.Maximum(mymodule.Heap.MyArray));

	console.log("After heap MaxHeapIFY at i = 1.");
	mymodule.Heap.MaxHeapIFY(mymodule.Heap.MyArray, 1);
	console.log(mymodule.Heap.MyArray);

	console.log("Increase key at index=8");
	mymodule.Heap.MaxHeapIncreaseKey(mymodule.Heap.MyArray, 8, 25);
	console.log(mymodule.Heap.Maximum(mymodule.Heap.MyArray));
	console.log(mymodule.Heap.MyArray);

	console.log("Extrac Max Heap element..");
	console.log(mymodule.Heap.HeapExtraMax(mymodule.Heap.MyArray));

	console.log("Insert key = 30 into Heap");
	mymodule.Heap.MaxHeapInsert(mymodule.Heap.MyArray,30);

	console.log("Sorting:"+mymodule.Heap.MyArray);
	mymodule.Heap.HeapSort(mymodule.Heap.MyArray);
	console.log(mymodule.Heap.MyArray);

	mymodule.Heap.MyArray = [16,4,9,14,7,10,3,2,8,1]; //Init again for sorting.
	console.log("Sorting array:"+mymodule.Heap.MyArray);
	mymodule.Heap.HeapSort(mymodule.Heap.MyArray);
	console.log("After heap sorting..");
	console.log(mymodule.Heap.MyArray);
};

// mymodule.Heap.RunMaxHeap();
mymodule.Heap.RunMinHeap();