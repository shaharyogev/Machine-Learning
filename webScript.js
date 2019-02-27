// Under date range choose from Feb 1st till now


d dateRangeSelector = (period) => {
	//select the ranges element
	const datePop = document.getElementsByClassName('filter-date');
	datePop[0].click();
	const ranges = document.getElementsByClassName("ranges");
	ranges[0].firstChild.querySelector('li[data-range-key="' + period + '"]').click();


	console.log("dateRangeSelector");
	return true;


}

daysRunningSelector = (period) => {

	//first solution - just need one more thing that i miss.
	let keyboardEvent = document.createEvent("KeyboardEvent");
	let initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";
	let sliderN2 = document.getElementsByClassName('ui-slider-handle ui-corner-all ui-state-default')[1];
	let uiSlider = window.angular.element(document.getElementsByClassName('ui-slider-range')[0].parentElement).scope(); //the script injection run in to problem with window.angular

	console.log(sliderN2)
	console.log(uiSlider)

	//seting the class for the right slider
	sliderN2.classList.add("ui-state-hover")
	sliderN2.classList.add("ui-state-focus")
	sliderN2.classList.add("ui-state-active")

	//entering the element scope and setting the values
	uiSlider.ctrl.slider.value[0] = 1;
	uiSlider.ctrl.slider.value[1] = period;
	uiSlider.ctrl.from = 1;
	uiSlider.ctrl.to = period;
	uiSlider.ctrl.max = period;
	uiSlider.ctrl.slider.to = period;
	uiSlider.ctrl.slider.from = 1;
	uiSlider.ctrl.slider.prevValue.from = 1;
	uiSlider.ctrl.slider.prevValue.to = period;

	//trying to make the slider move for the values to post 

	//https: //stackoverflow.com/questions/596481/is-it-possible-to-simulate-key-press-events-programmatically
	keyboardEvent[initMethod](
		"keydown", // event type : keydown, keyup, keypress
		true, // bubbles
		true, // cancelable
		window, // viewArg: should be window
		false, // ctrlKeyArg
		false, // altKeyArg
		false, // shiftKeyArg
		false, // metaKeyArg
		37, // keyCodeArg : unsigned long the virtual key code, else 0
		0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
	);

	sliderN2.click();
	sliderN2.dispatchEvent(keyboardEvent);



	//second solution that works perfect but refresh the page so ist better for nodejs scraping 
	//let daysSearch = window.location.search;
	//window.location.search = daysSearch + "&days=1-" + period + "&";

	return true;
}

popupSelector = () => {

	let popupDiv = document.getElementById("adType_2");
	if (!popupDiv.getAttribute("checked")) {
		popupDiv.click();
	}

	return true;
}



getPageUrl = () => {
	setTimeout(() => {
		//starting to collect the urls class
		let items = document.getElementsByClassName("inner has-favourite");
		let urlList = [];

		//collect the urls links to array
		for (let i = 0; i < items.length; i++) {
			urlList.push(items[i].firstElementChild.href);
		};

		let redirectChainUrlsList = [];

		for (let i = 0; i < urlList.length; i++) {
			//clear the previous iframe
			if (document.getElementById("iframeId")) {
				document.body.removeChild(document.getElementById("iframeId"));
			}
			//creat new iframe
			let fr = document.createElement("iframe");
			fr.setAttribute("src", urlList[i]);
			console.log(urlList[i])
			fr.setAttribute("id", "iframeId");
			fr.style.width = "1200px";
			fr.style.height = "800px";
			document.body.appendChild(fr)

			let iframeId = document.getElementById("iframeId");
			let iframeDocument;
			let redirectChainUrls


			//wait for the iframe to load
			iframeId.contentWindow.onload = () => {
				console.log("iframe created")
				const iframeUrls = async () => {
					//get iframe document content
					iframeDocument = iframeId.contentDocument

					//open the links dialog
					let showMore = iframeDocument.getElementsByClassName("btn-danger");
					showMore[0].click();

					setTimeout(() => {
						//search for the Urls 
						redirectChainUrls = iframeDocument.getElementsByClassName("redirect-chain__item ng-scope");

						//collect the urls links to array
						for (let i = 0; i < redirectChainUrls.length; i++) {
							redirectChainUrlsList.push(redirectChainUrls[i].outerText);
							//console.log(redirectChainUrlsList)
						};

					}, 1000);
				}
				iframeUrls();

			};
		}
	}, 3000);

	//keep on scrolling
	searchResultsGrid = document.getElementsByClassName('ng-isolate-scope')[0];
	let scrollResults = () => {
		searchResultsGrid.scrollIntoView();
		items = document.getElementsByClassName("inner has-favourite");
	}

	//scroll interval
	let scrollInterval = setInterval(scrollResults, 3000);
	if (searchResultsGrid.scrollIntoView()) {
		scrollInterval = clearInterval;
		return (redirectChainUrlsList);

	}

}

startScript = async () => {
	try {
		const date = await dateRangeSelector('This Month');
		//const days = await daysRunningSelector(30);
		const popup = await popupSelector();
		let urlListJson = await getPageUrl();

		return urlListJson; //can send it to a server or creat a file with nodejs or python 

	} catch (err) {
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
