// IMPORT IMG
import AT__hero from './img/header_bg.jpg';
if (document.getElementById('AT__hero')) 
	document.getElementById('AT__hero').src = AT__hero;

$(function(){
	if($('.AT__timer').length){
		var endDate = new Date( parseInt($('.AT__timer').attr('data-tstamp')) * 1000 );
		var startDate = new Date();
		// debug 
		// endDate = new Date();
		// endDate.setHours( endDate.getHours() + 4 );
		// endDate.setMinutes( endDate.getMinutes() + 15 );
		// endDate.setSeconds( endDate.getSeconds() + 10 );
		// end debug
		var days,hours,minutes,seconds;
		var delta = Math.abs(endDate - startDate)/1000;// get total seconds between the times
		

		$('.AT__timer .AT__timer__localeDateString').text(endDate.toLocaleString().replace('00:00','00'))
		updateTimer(delta);
		var deltaLoop = setInterval(function(){
			if (delta > 0) {
				delta--;
				updateTimer(delta);
				console.log('updateTimer');
				if (delta <= (15*60)){
					clearInterval(deltaLoop);
					$('.AT__timer__wrapper').attr('data-mode','video');
					$('body,html').animate({
						scrollTop: $('#main').offset().top
					}, 600);
				}
			} else {
				clearInterval(deltaLoop);
				$('.AT__timer__wrapper').attr('data-mode','video');
				$('body,html').animate({
					scrollTop: $('#main').offset().top
				}, 600);
			}
		},1000);

		function updateTimer(delta){
			// calculate (and subtract) whole days
			days = Math.floor(delta / 86400);
			delta -= days * 86400;
			// calculate (and subtract) whole hours
			hours = Math.floor(delta / 3600) % 24;
			delta -= hours * 3600;
			// calculate (and subtract) whole minutes
			minutes = Math.floor(delta / 60) % 60;
			delta -= minutes * 60;
			// what's left is seconds
			seconds = Math.round(delta % 60);  // in theory the modulus is not required
			$('.AT__timer .AT__timer__counter.days').text(String(days).padStart(2, '0'));
			$('.AT__timer .AT__timer__counter.hours').text(String(hours).padStart(2, '0'));
			$('.AT__timer .AT__timer__counter.minutes').text(String(minutes).padStart(2, '0'));
			$('.AT__timer .AT__timer__counter.seconds').text(String(seconds).padStart(2, '0'));
		}
	}

	$('#select_lang').on('change', function(){
		applyTranslations(this.value);
	});

	function applyTranslations(lang){
		$('[data-translate]').not('.AT__timer__counter').each(function(){
			var item = $(this).attr('data-translate');
			$(this).html(translations[lang][item]);
		});
		$('.AT__timer__counter').each(function(){
			var item = $(this).attr('data-translate');
			$(this).attr('data-helper',translations[lang][item]);
		});
	}

	$('#loader').removeClass('active');
});