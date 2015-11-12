(function($){
  "use strict";
	
	
	// on ready function
	jQuery(document).ready(function(e) {
   		var $ = jQuery;
		var $this = $(window);
		var revapi;
		
		
		/* Menu Toggle */
		 $("#menu-toggle, #menu-toggle-2").on("click",function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
		});
		
		/* Scroll */
		$('body').scrollspy({ target: '.navbar-main' });
		
		
		/* Google map */
		function initGmap() {
			gmapIsReady = true;

			// Create an array of styles.
			var styles = [
				{
					stylers: [
						{saturation: -100}
					]
				}, {
					featureType: "road",
					elementType: "geometry",
					stylers: [
						{lightness: 100},
						{visibility: "simplified"}
					]
				}, {
					featureType: "road",
					elementType: "labels",
					stylers: [
						{visibility: "off"}
					]
				}
			];

			// Create a new StyledMapType object, passing it the array of styles,
			// as well as the name to be displayed on the map type control.
			var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

			// Create a map object, and include the MapTypeId to add
			// to the map type control.
			var $latlng = new google.maps.LatLng(52.5075419, 13.4261419),
				$mapOptions = {
					zoom: 13,
					center: $latlng,
					panControl: false,
					zoomControl: true,
					scaleControl: false,
					mapTypeControl: false,
					scrollwheel: false,
					mapTypeControlOptions: {
						mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
					}
				};
			var map = new google.maps.Map(document.getElementById('google-map'), $mapOptions);

			google.maps.event.trigger(map, 'resize');

			//Associate the styled map with the MapTypeId and set it to display.
			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');

			var marker = new google.maps.Marker({
				position: $latlng,
				map: map,
				title: ""
			});
		}
		
		
		/* ==============================================
		Scroll Navigation
		=============================================== */	
		
		$("nav ul li a[href^='#']").on('click', function(e) {

		   // prevent default anchor click behavior
		   e.preventDefault();

		   // animate
		   /*$('html, body').animate({
			   scrollTop: $(this.hash).offset().top()
			 }, 1500, function(){
			 }); */

		});
		$.each($('div.progress-bar'),function(){
			$(this).css('width', $(this).attr('data-aria-valuetransitiongoal')+'%');
		});
		
		/* ==============================================
		Revolution Slider
		=============================================== */
		revapi = jQuery('#slider1').revolution({
			delay:9000,
			startwidth:1170,
			startheight:745,
			hideThumbs:10,
			fullWidth:"on",
			forceFullWidth:"on",
			thumbWidth:100,
			thumbHeight:50,
			thumbAmount:4,
						
			navigationType:"bullet",
				navigationArrows:"solo",

				navigationStyle:"none",


				navigationHAlign:"center",
				navigationVAlign:"bottom",
				navigationHOffset:0,
				navigationVOffset:20,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"bottom",
				soloArrowLeftHOffset:380,
				soloArrowLeftVOffset:42,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"bottom",
				soloArrowRightHOffset:365,
				soloArrowRightVOffset:42,
			
			parallax:"mouse",
			parallaxBgFreeze:"on",
			parallaxLevels:[10,7,4,3,2,5,4,3,2,1]
		});
		
		
		revapi = jQuery('#slider2').revolution({
			delay:9000,
			startwidth:1170,
			startheight:700,
			fullWidth:"on",
			forceFullWidth:"on",
			hideThumbs:200,
			thumbWidth:82,
			thumbHeight:82,
			navigationType:"thumb",

			navigationStyle:"round",
			navigationHAlign:"right",
			navigationVAlign:"bottom",
			navigationHOffset:114,
			navigationVOffset:80,
			soloArrowLeftHalign:"left",
			soloArrowLeftValign:"center",
			soloArrowLeftHOffset:20,
			soloArrowLeftVOffset:20,

			soloArrowRightHalign:"right",
			soloArrowRightValign:"center",
			soloArrowRightHOffset:20,
			soloArrowRightVOffset:20,
			touchenabled:"on",
			onHoverStop:"on",
			thumbAmount:4

		});

		
		
		/* ==============================================
		Owl Carousel 1
		=============================================== */
		$("#owl-demo").owlCarousel({
			items: 1,
			loop:true,
			nav : false, // Show next and prev buttons
			slideSpeed : 300,
			paginationSpeed : 400,
			singleItem:true,
			dots: true,
			responsive: true

			// "singleItem:true" is a shortcut for:
			// items : 1, 
			// itemsDesktop : false,
			// itemsDesktopSmall : false,
			// itemsTablet: false,
			// itemsMobile : false
		});
		
		/* ==============================================
		Owl Carousel 2
		=============================================== */
		$("#owl-demo-2").owlCarousel({
			items: 2,
			navigation : false, // Show next and prev buttons
			navigationText : false,
			slideSpeed : 300,
			pagination : false,
			singleItem:false,
			responsiveClass:true,
			// autoWidth:true,
			responsive:{
				0:{
					items:1,
					nav:true
				},
				600:{
					items:1,
					nav:false,
					center:true,
					dots:true
				},
				1000:{
					items:1,
					nav:false,
					dots: true,
					margin:10,
					autoWidth:true,
					loop:true
				},
				1200:{
					items:1,
					nav:true,
					dots: false,
					margin:10,
					autoWidth:true,
					loop:true
				}
			}

			// itemsDesktop : false,
			// itemsDesktopSmall : false,
			// itemsTablet: false,
			// itemsMobile : false
		});
		
		
		/* ==============================================
		Owl Carousel 3
		=============================================== */
		$("#owl-demo-3").owlCarousel({
			items: 1,
			navigation : false, // Show next and prev buttons
			navigationText : false,
			slideSpeed : 300,
			pagination : true,
			responsive: true,
			singleItem:false
			// itemsDesktop : false,
			// itemsDesktopSmall : false,
			// itemsTablet: false,
			// itemsMobile : false
		});
		
		
		/* ==============================================
		Owl Carousel 4
		=============================================== */
		$("#owl-demo-4, #owl-demo-5").owlCarousel({
			items: 1,
			nav: false,
			pagination: false,
			dots: true,
			slideSpeed : 300,
			responsive: true,
			autowidth:true,
			singleItem:true
			// itemsDesktop : false,
			// itemsDesktopSmall : false,
			// itemsTablet: false,
			// itemsMobile : false
		});
		
		$('.popoverData').popover();
	
		
		
		
		var gridContainer = $('#grid-container'),
        filtersContainer = $('#filters-container'),
        wrap, filtersCallback;
		/*********************************
			init cubeportfolio
		 *********************************/
		gridContainer.cubeportfolio({
			defaultFilter: '*',
			animationType: 'fadeOutTop',
			gapHorizontal: 0,
			gapVertical: 0,
			gridAdjustment: 'responsive',
			mediaQueries: [{
				width: 1600,
				cols: 5
			},{
				width: 1200,
				cols: 3
			}, {
				width: 800,
				cols: 3
			}, {
				width: 500,
				cols: 2
			}, {
				width: 320,
				cols: 1
			}],
			caption: 'zoom',
			displayType: 'lazyLoading',
			displayTypeSpeed: 100,

			// lightbox
			lightboxDelegate: '.cbp-lightbox',
			lightboxGallery: true,
			lightboxTitleSrc: 'data-title',
			lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

			// singlePage popup
			singlePageDelegate: '.cbp-singlePage',
			singlePageDeeplinking: true,
			singlePageStickyNavigation: true,
			singlePageCounter: '<div class="cbp-popup-singlePage-counter">{{current}} of {{total}}</div>',
			singlePageCallback: function(url, element) {
				// to update singlePage content use the following method: this.updateSinglePage(yourContent)
			},

			// singlePageInline
			singlePageInlineDelegate: '.cbp-singlePageInline',
			singlePageInlinePosition: 'above',
			singlePageInlineInFocus: true,
			singlePageInlineCallback: function(url, element) {
				// to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
			}
		});
		
		
		
		
		/*********************************
        add listener for filters
		 *********************************/
		if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
			wrap = filtersContainer.find('.cbp-l-filters-dropdownWrap');

			wrap.on({
				'mouseover.cbp': function() {
					wrap.addClass('cbp-l-filters-dropdownWrap-open');
				},
				'mouseleave.cbp': function() {
					wrap.removeClass('cbp-l-filters-dropdownWrap-open');
				}
			});

			filtersCallback = function(me) {
				wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
				wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
				me.addClass('cbp-filter-item-active');
				wrap.trigger('mouseleave.cbp');
			};
		} else {
			filtersCallback = function(me) {
				me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
			};
		}

		filtersContainer.on('click.cbp', '.cbp-filter-item', function() {
			var me = $(this);

			if (me.hasClass('cbp-filter-item-active')) {
				return;
			}

			// get cubeportfolio data and check if is still animating (reposition) the items.
			if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {
				filtersCallback.call(null, me);
			}

			// filter the items
			gridContainer.cubeportfolio('filter', me.data('filter'), function() {});
		});


		/*********************************
			activate counter for filters
		 *********************************/
		gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'), function() {
			// read from url and change filter active
			var match = /#cbpf=(.*?)([#|?&]|$)/gi.exec(location.href),
				item;
			if (match !== null) {
				item = filtersContainer.find('.cbp-filter-item').filter('[data-filter="' + match[1] + '"]');
				if (item.length) {
					filtersCallback.call(null, item);
				}
			}
		});
		
		
		/*********************************
        add load more functionality
		 *********************************/
		var loadMoreObject = Object.create({
			init: function() {
				var t = this;

				// the job inactive
				t.isActive = false;

				t.numberOfClicks = 0;

				// cache link selector
				t.loadMore = $('.cbp-l-loadMore-text-link');

				// cache window selector
				t.window = $(window);

				// add events for scroll
				t.addEvents();

				// trigger method on init
				t.getNewItems();

				return t;
			},

			addEvents: function() {
				var t = this;

				t.window.on("scroll.loadMoreObject", function() {
					// get new items on scroll
					t.getNewItems();
				});
			},

			getNewItems: function() {
				var t = this,
					topLoadMore, topWindow;

				if (t.isActive || t.loadMore.hasClass('cbp-l-loadMore-text-stop')) {
					return;
				}

			    //topLoadMore = t.loadMore.offset().top;
				//topWindow = t.window.scrollTop() + t.window.height();

				if (topLoadMore > topWindow) {
					return;
				}

				// this job is now busy
				t.isActive = true;

				// increment number of clicks
				t.numberOfClicks++;

				// perform ajax request
				$.ajax({
						url: t.loadMore.attr('data-href'),
						type: 'GET',
						dataType: 'HTML',
						cache: true
					}).done(function(result) {
						var items, itemsNext;

						// find current container
						items = $(result).filter(function() {
							return $(this).is('div' + '.cbp-loadMore-block' + t.numberOfClicks);
						});

						gridContainer.cubeportfolio('appendItems', items.html(),
							function() {
								// check if we have more works
								itemsNext = $(result).filter(function() {
									return $(this).is('div' + '.cbp-loadMore-block' + (t.numberOfClicks + 1));
								});

								if (itemsNext.length === 0) {

									t.loadMore.text('NO MORE ENTRIES');
									t.loadMore.addClass('cbp-l-loadMore-text-stop');

									t.window.off("scroll.loadMoreObject");

								} else {
									// make the job inactive
									t.isActive = false;

									topLoadMore = t.loadMore.offset().top;
									topWindow = t.window.scrollTop() + t.window.height();

									if (topLoadMore <= topWindow) {
										t.getNewItems();
									}
								}

							});

					}).fail(function() {
						// make the job inactive
						t.isActive = false;
					});
			}
		}).init();
		
		
		$('.counter').counterUp({
			delay: 10,
			time: 4000
		});
		
		
		// when the height of grid is changed
		gridContainer.on('filterComplete.cbp', function() {
			loadMoreObject.window.trigger('scroll.loadMoreObject');
		});
		
		
		/* ==============================================
		Parallax
		=============================================== */
		$('.parallax').parallax("50%", 0.6);
		$('.parallax2').parallax("50%", -0.7);
		
		
		// Portfolio
		$('.bxslider').bxSlider({
			controls: true,
			pager: false,
			captions: true,
			responsive: true
		});
		
		$('.bxslider2').bxSlider({
			controls: true,
			pager: false,
			captions: true,
			responsive: true
		});
		
		
		// Navbar Search // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        var $searchform = $(".ct-navbar-search");
        $('.ct-js-navSearch').on('click', function(e){
            e.preventDefault();

            $searchform.fadeToggle(250, function () {
                if (($searchform).is(":visible")) {$searchform.find("[type=text]").focus();}
            });
            return false;
        });
		
		
		// Navbar Search ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		if(!$('.ct-js-navSearch').is(e.target)){
            if (!$searchform.is(e.target) && $searchform.has(e.target).length === 0){
                $searchform.hide();
                $('.ct-js-navSearch').removeClass('is-active');
            }
        }
		
		
	
	});
	
})(); 	

jQuery().UItoTop({ easingType: 'easeOutQuart' });
