
// Under date range choose from Feb 1st till now


dateRangeSelector = (period) =>{
	//select the ranges element
	window.location.search = "";
	const datePop = document.getElementsByClassName('filter-date');
	datePop[0].click();
	const ranges = document.getElementsByClassName("ranges");
	ranges[0].firstChild.querySelector('li[data-range-key="'+period+'"]').click();

	return true;
}


//Change “Days running” to 30  

daysRunningSelector = (period) =>{
	//This is not the best solution. This will cat the flow. 
	let daysSearch = window.location.search;
	window.location.search = daysSearch + "&days=1-" + period + "&";

	return true;
}


//Under “Ad Type” choose “Popup”

popupSelector = () =>{

	let popupDiv = document.getElementById("adType_2");
	if (!popupDiv.getAttribute("checked")) {
		popupDiv.click();
	}
	
	return true;
}

//Open each one of the results you get on the right-hand side.
//When opened, under“ Offer & Tracking” there’ s a“ Show More” button that displays a“ Landing
//Page Details” dialog that looks like this:

getPageUrl = () =>{
	searchResultsGrid = document.getElementsByClassName('ng-isolate-scope')[0];
		let scrollResults = ()=> {
			searchResultsGrid.scrollIntoView();
		}
		let scrollInterval = setInterval(scrollResults ,10);
		if (searchResultsGrid.scrollIntoView()) {
			scrollInterval = clearInterval;
		}
	

	let items = document.getElementsByClassName("inner has-favourite");
	let urlList = [];

	//collect the urls links to array
	for (let i = 0; i < items.length; i++) {
		urlList.push(items[i].firstElementChild.href);
	};

	let redirectChainUrlsList = [];

	for (let i = 0; i < urlList.length; i++) {
		//console.log(i)
		//window.open(urlList[i]) //open the url in the same window if the website prevent iframe from loading
		//in the new tab run the same script

		let fr = document.createElement("iframe");
		fr.setAttribute("src", urlList[i]);
		fr.setAttribute("name", urlList[i]);
		fr.style.width = "640px";
		fr.style.height = "480px";
		document.body.appendChild(fr).click();

		//pseudo code - can't test if its working, I didn't open any links from the search results its all based on assumptions
		//let showMore = document.getElementsByClassName('btn-danger');
		//showMore[0].click();


		let redirectChainUrls = fr.getElementsByClassName("redirect-chain__item");

		//collect the urls links to array
		for (let i = 0; i < redirectChainUrls.length; i++) {
			redirectChainUrlsList.push(redirectChainUrls[i].firstElementChild.href);

			//let temp = redirectChainUrls[i].firstElementChild;
			//redirectChainUrlsList.push += temp.href;
		};
		document.body.removeChild(fr);
		console.log(redirectChainUrlsList)

	}
 return (redirectChainUrlsList);
}

//async functions call to keep everything in the right order.

startScript = async ()=> {
try{
	const date = await dateRangeSelector('This Month');
	const days = await daysRunningSelector(30);
	const popup = await popupSelector();
	let urlListJson  = await getPageUrl();

	return urlListJson;
	
}catch(err){
		console.trace(err);
}
}

//start the script if the page is fully loaded for auto script injection Scraper. 

window.onload = () => {
	startScript();
}


// start the script with the Scraper Skeleton extension.
/*
(function () {
	startScript();
})();
*/