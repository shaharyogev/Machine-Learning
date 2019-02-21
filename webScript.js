
// Under date range choose from Feb 1st till now


dateRangeSelector =(period) =>{
	//select the ranges element
	const ranges = document.getElementsByClassName("ranges");

	//clear the current class
	let clearClass = ranges[0].firstChild.querySelectorAll('li[data-range-key]');
	clearClass.forEach(i => {
		i.classList.remove("active");
	});

	//add the active class to the wanted range
	let liList = ranges[0].firstChild.querySelector('li[data-range-key="'+period+'"]');
	liList.classList.add("active");


	return liList;
}

dateRangeSelector('This Month');




//Change “Days running” to 30  

daysRunningSelector =(period) =>{
	//select the "days-to pull-right"
	const daysTo = document.getElementsByClassName("days-to pull-right");

	//insert the value
	daysTo[0].innerText = period;

	return daysTo;
}
daysRunningSelector(30);


//Under “Ad Type” choose “Popup”
