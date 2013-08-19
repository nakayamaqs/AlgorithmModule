var mymodule = mymodule || {};

mymodule.factorial = function factorial (inputNumber){
	if (isNaN(parseInt(inputNumber))) {
		//log;
		return;
	}

	var number = parseInt(inputNumber);
	//validation
	if(inputNumber<=1) {
		return 1;
	}
	else{
	 	return number * factorial(number-1);
	}
};

mymodule.factorial(8);
mymodule.factorial("c");

//add my cooment.