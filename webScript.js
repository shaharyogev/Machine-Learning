
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

//22.2.2019 11:30 am
// I worked on the task for few minutes on the train form Rehovot to Tel-Aviv for the past two mornings. 
// on friday the connection to the website got blocked as we talked on the email. 
// I extract some code form unclosed tab. I hope you will consider the circumstances. 



//Under “Ad Type” choose “Popup”

popupSelector = () =>{
	let popup = document.getElementById("adType_2");
	popup.parentElement.parentElement.getElementsByClassName("check-block__link-item")[0].firstElementChild.click();
}

