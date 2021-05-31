/* Documentation sample */


let Window_width = window.innerWidth/1.2;
//let fullScreenElementNode = document.querySelector('html');
 let fullScreenElementNode = window.parent.document.querySelector('html');

function loadPage(page) {

	// var img = $('<img />');
	// img.load(function() {
	// 	var container = $('.sample-docs .p'+page);
	// 	img.css({width: container.width(), height: container.height()});
	// 	img.appendTo($('.sample-docs .p'+page));
	// 	container.find('.loader').remove();
	// });

	// img.attr('src', 'pages/' +  (page-2) + '.html');


	// $.ajax({url: './static/pages/' + page + '.html'}).
	// done(function(pageHtml) {
	// 	$('.sample-docs .p' + page).html(pageHtml.replace('samples/steve-jobs/', ''));
	// });
	// $('.loader').remove();


	$.ajax({url: './static/pages/page.html'}).
	done(function(pageHtml) {
		$('.sample-docs .p' + page).html(pageHtml.replace('samples/steve-jobs/', ''));
	});
	$('.loader').remove();
	
}

function addPage(page, book) {

	var id, pages = book.turn('pages');

	var element = $('<div />', {});

	if (book.turn('addPage', element, page)) {
		if (page<8) {
			element.html('<div class="gradient"></div><div class="loader"></div>');
			loadPage(page);
		}
	}
}

function updateTabs() {
	
	var tabs = {7: 'Clases', 12:'Constructor', 14:'Properties', 16:'Methods', 23:'Events'},
		left = [],
		right = [],
		book = $('.sample-docs'),
		actualPage = book.turn('page'),
		view = book.turn('view');

	for (var page in tabs) {
		var isHere = $.inArray(parseInt(page, 10), view)!=-1;

		if (page>actualPage && !isHere)
			right.push('<a href="#page/' + page + '">' + tabs[page] + '</a>');
		else if (isHere) {
			
			if (page%2===0)
				left.push('<a href="#page/' + page + '" class="on">' + tabs[page] + '</a>');
			else
				right.push('<a href="#page/' + page + '" class="on">' + tabs[page] + '</a>');
		} else
			left.push('<a href="#page/' + page + '">' + tabs[page] + '</a>');

	}

	$('.sample-docs .tabs .left').html(left.join(''));
	$('.sample-docs .tabs .right').html(right.join(''));

}


function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}


function getViewNumber(book, page) {
	return parseInt((page || book.turn('page'))/2 + 1, 10);
}


function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {

	var previewWidth = 115,
		previewHeight = 73,
		previewSrc = 'pics/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}


document.querySelector('.magazine__sidebar--item.fullscreen').onclick = () => {
	toggleFullScreen();
}


function toggleFullScreen(){


	if( window.innerHeight == screen.height) {
		//full screen
		fullScreenExit()
	}else{

		if (fullScreenElementNode.requestFullscreen) {
			fullScreenElementNode.requestFullscreen();
		  } else if (fullScreenElementNode.webkitRequestFullscreen) { /* Safari */
			fullScreenElementNode.webkitRequestFullscreen();
		  } else if (fullScreenElementNode.msRequestFullscreen) { /* IE11 */
			fullScreenElementNode.msRequestFullscreen();
		  }
		  document.querySelector('.magazine__sidebar--item.fullscreen img').src = "https://firebasestorage.googleapis.com/v0/b/l4k5hman.appspot.com/o/fullscreen_exit.svg?alt=media&token=42a2c8eb-35f0-4938-94d7-bff5e937ffca"
	}
	
	  document.querySelector('.magazine__sidebar--item.fullscreen').classList.toggle('fullscreenActive')
}


function fullScreenExit() {


if(document.querySelector('.magazine__sidebar--item.fullscreen.fullscreenActive')) {
		let parentDoc = window.parent.document;
		if (parentDoc.exitFullscreen) {
			parentDoc.exitFullscreen();
		} else if (parentDoc.webkitExitFullscreen) { /* Safari */
			parentDoc.webkitExitFullscreen();
		} else if (parentDoc.msExitFullscreen) { /* IE11 */
			parentDoc.msExitFullscreen();
		}

		document.querySelector('.magazine__sidebar--item.fullscreen img').src = "https://firebasestorage.googleapis.com/v0/b/l4k5hman.appspot.com/o/fullscreen.svg?alt=media&token=0d1de0d3-7136-4ff3-b232-a62d486bcb62"

	}	

	

}

function audioMute() {
	
	if(audio.muted) {
		audio.muted= false
		audio2.muted= false
		document.querySelector('.magazine__sidebar--item.audio img').src= "/static/pics/volume.svg"
		bg_music.volume = 0.4;
		bg_music.loop = true;
		bg_music.play();
	}
	else {
		audio.muted= true
		audio2.muted= true
		document.querySelector('.magazine__sidebar--item.audio img').src= "/static/pics/volume_mute.svg"
		bg_music.pause();
	}

}

document.querySelector('.magazine__sidebar--item.info').onclick = () => { 
	document.querySelector('#info__modal').classList.add('visible')
	// window.onclick = (event) => {
    //                 console.log(event)
	// 	if(event.target !== document.querySelector('.modal__container') && event.target !== document.querySelector('.magazine__sidebar--item.info img') ) {
	// 		document.querySelector('#info__modal').classList.remove('visible')
	// 	} 

	// console.log(event.path.includes(document.querySelector('.modal__container')))
	// console.log(event.target)

	// window.onclick = (event) => {
	// 	if(!event.path.includes(document.querySelector('.modal__container') && event.target !== document.querySelector('.magazine__sidebar--item.info img') ) ){
	// 		document.querySelector('#info__modal').classList.remove('visible')
	// 	}
	// }

}

document.querySelector('.modal__close img').onclick = () => { 
	document.querySelector('#info__modal').classList.remove('visible')
}

// function audioUnmute() {
// 	if(document.querySelector('.magazine__sidebar--item.audio.muted')) {
// 		audio.muted= false
// 		document.querySelector('.magazine__sidebar--item.audio.muted').classList.remove('muted')
// 	}	
// }


/*

	change bottom values for new pages

    document.querySelector('.sidebar__item--totalPages').innerHTML  = Math.floor($(".sample-docs").turn("pages")/2)

    pages: 308,

    max: 308,

    if ( key == 38 && inputValue < 308 && +document.querySelector('.sidebar__item--currentPage input').value*2 <= 10) {


  if ( key == 40 && inputValue > 1 && inputValue !== Math.floor($(".sample-docs").turn("pages")/2)+1){

                    document.querySelector('.sidebar__item--currentPage input').oninput = (event) => {
                
                    let inputValue = document.querySelector('.sidebar__item--currentPage input').value;
                    let totalPages = Math.floor($(".sample-docs").turn("pages")/2)
                    if(inputValue > 0 && inputValue < totalPages ) {
                        $(".sample-docs").turn("disable", false);
                        $(".sample-docs").turn("page", 2*inputValue -1)
                    }

                    else if(inputValue > 0 && inputValue == totalPages+1) {
                        $(".sample-docs").turn("page", 2*inputValue)
                    }
                }

*/