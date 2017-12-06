(function ( $ ) {
 
    $.defaultSett = {
    	visibleElementsMainMenu: 6,
    	visibleElementsSubMenu: 4,
		duration: 200,		
		circleFromBehind: true,
		menuFixed: false,
		livingElements: true,
		liveItemsHover: true,
		downMenuSpeed: 600,
		collapseMenu: true,
		collapseMenuSpeed: 2000
	};

	$.fn.spaceMenu = function( params ){
		var settings = $.extend( {}, $.defaultSett, params );
		SpaceMenuPerform( this, settings );
	};

	function SpaceMenuPerform( root, settings ){

		var mainSettings = {
			menuMainItemIdBegin: 1,
			visibleCount: settings.visibleElementsMainMenu + 1,
			radius: 200,
			correctRadius: 50,
			correctPosition: 0,
			MATH_PI: Math.PI * 2,

			// submenu
			subCorrectPosition: 0,
			visibleSubCount: settings.visibleElementsSubMenu + 1,
			radiusSubItem: 150,
			correctRadiusSubItem: 55,

			// system
			keyMotion: true
		};

		// Initialization
		var initialization = {

			// get width window
			getWidthWindow: function(){
				var wW = widthWindow();
				if( wW <= 500 ){
					mainSettings.radius = 150;
					mainSettings.radiusSubItem = 130;
				}
			},

			// add class
			addClassForMenu: function(){
				root.addClass( 'mx-navigation' );
			},

			// button open menu
			createButtonOpenMenu: function(){
				if( settings.menuFixed === false ){
					root.before( '<button id="mxOpenMenu"><span></span><span></span><span></span></button>' );
				}				
			},

			// create wrap
			createWrapForMenu: function(){
				root.wrap( '<div class="mx-navigation_wrap"></div>' );
			},

			// set position for items
			createMenu: function(){

				var _this = this;

				// set coordinates and add class
				root.children( 'li' ).each( function(){

					// create main menu
					mainSettings.correctPosition = $( this ).width();

					$( this ).attr( 'id', mainSettings.menuMainItemIdBegin );

					$( this ).attr( 'data-angle', mainSettings.menuMainItemIdBegin );

					if( mainSettings.menuMainItemIdBegin <= mainSettings.visibleCount ){

						$( this ).addClass( 'mx-visible' );
						
					}

					var coordinates = setCoordinates( mainSettings.menuMainItemIdBegin );

					$( this ).css( { left: coordinates.left - (mainSettings.correctPosition / 2) +'px', top: coordinates.top - (mainSettings.correctPosition / 2) +'px' } );

					mainSettings.menuMainItemIdBegin++;

				} );

				var countChildren = root.children( 'li' ).length;

				if( countChildren > mainSettings.visibleCount ){
					// add nav
					_this.addButtonsNav( root );
				}

				// create sub menu
				root.find( 'li' ).each( function(){
					//console.log($(this));
					var isChildrenUl = $( this ).children( 'ul' ).length;

					if( isChildrenUl > 0 ){
						_this.createSubMenu( $( this ) );						
					}

				} );

			},

			createSubMenu: function( element ){

				element.children( 'a' ).addClass( 'mx-is_sub_menu_link' );

				element.append( '<span class="mx-is_a_child"></span>' );

				element.children( 'ul' ).addClass( 'mx-sub_navigation' );							

				element.children( 'a' ).attr( 'onclick', 'return false' );

				var menuSubItemIdBegin = 1;

				element.children( 'ul' ).children( 'li' ).each( function(){					

					mainSettings.subCorrectPosition = $( this ).width();

					$( this ).attr( 'data-angle', menuSubItemIdBegin );

					if( menuSubItemIdBegin <= mainSettings.visibleSubCount ){

						$( this ).addClass( 'mx-visible' );
						
					}

					var coordinates = setCoordinatesSubItems( menuSubItemIdBegin );

					$( this ).css( { left: coordinates.left - (mainSettings.subCorrectPosition / 2) +'px', top: coordinates.top - (mainSettings.subCorrectPosition / 2) +'px' } );

					menuSubItemIdBegin++

				} );

				// add nav
				var countChildren = element.children( 'ul' ).children( 'li' ).length;

				if( countChildren > mainSettings.visibleSubCount ){
					
					this.addButtonsNav( element.children( 'ul' ) );
				}	
				

			},

			addButtonsNav: function( element ){
				element.append( '<div class="buttonsNavWrap"></div>' );
				element.children( '.buttonsNavWrap' ).append( '<button class="nextSpace">Next</button>' );
				element.children( '.buttonsNavWrap' ).append( '<button class="prevSpace">Prev</button>' );
			},

			// fixed menu
			fixedMenu: function(){
				$( '.mx-navigation_wrap' ).css( 'top', '0px' );
			},

			// add options
			addOptions: function(){

				// set new "top" for menu
				if( settings.menuFixed === false ){
					root.css( 'top', '-2000px' );
				}

				// add closure button
				if( settings.menuFixed === false ){
					root.before( '<span class="mx-close"></span>' );
				} else{
					this.fixedMenu();
				}

				// add back circle
				if( settings.circleFromBehind === true ){
					root.before( '<span class="mx-back_circle1"></span>' );
					root.before( '<span class="mx-back_circle2"></span>' );
				}

				// live items
				if( settings.livingElements === true ){
					root.find( 'li' ).addClass( 'mx-animation_flicker' );
				}

				// live items hover
				if( settings.liveItemsHover === true ){
					root.find( 'li' ).addClass( 'mx-live_items_hover' );
				}

			},

			init: function(){
				this.getWidthWindow();
				this.addClassForMenu();
				this.createButtonOpenMenu();
				this.createWrapForMenu();
				this.createMenu();
				this.addOptions();
			}
		}

		initialization.init();

		// Interaction
		var interaction = {

			// get width window
			getWidthWindow: function(){
				$( window ).resize( function(){

					var wW = widthWindow();

					mainSettings.correctPosition = root.children( 'li' ).width();

					if( wW <= 500 ){
						mainSettings.radius = 150;
						mainSettings.radiusSubItem = 130;

						root.children( 'li' ).each( function(){

							var dataAngle = $( this ).attr( 'data-angle' );
							dataAngle = parseInt( dataAngle );

							var coordinates = setCoordinates( dataAngle );

							$( this ).css( { left: coordinates.left - (mainSettings.correctPosition / 2) +'px', top: coordinates.top - (mainSettings.correctPosition / 2) +'px' }, settings.duration );

						} );

						root.find( 'ul' ).children( 'li' ).each( function(){

							var dataAngle = $( this ).attr( 'data-angle' );
							dataAngle = parseInt( dataAngle );

							var coordinates = setCoordinatesSubItems( dataAngle );

							$( this ).css( { left: coordinates.left - (mainSettings.subCorrectPosition / 2) +'px', top: coordinates.top - (mainSettings.subCorrectPosition / 2) +'px' }, settings.duration );

						} );						

					} else{

						mainSettings.radius = 200;
						mainSettings.radiusSubItem = 150;

						root.children( 'li' ).each( function(){

							var dataAngle = $( this ).attr( 'data-angle' );
							dataAngle = parseInt( dataAngle );

							var coordinates = setCoordinates( dataAngle );

							$( this ).css( { left: coordinates.left - (mainSettings.correctPosition / 2) +'px', top: coordinates.top - (mainSettings.correctPosition / 2) +'px' }, settings.duration );

						} );

						root.find( 'ul' ).children( 'li' ).each( function(){

							var dataAngle = $( this ).attr( 'data-angle' );
							dataAngle = parseInt( dataAngle );

							var coordinates = setCoordinatesSubItems( dataAngle );

							$( this ).css( { left: coordinates.left - (mainSettings.subCorrectPosition / 2) +'px', top: coordinates.top - (mainSettings.subCorrectPosition / 2) +'px' }, settings.duration );

						} );

					}

				} );				
			},

			// step next
			runNext: function(){

				$( '.nextSpace' ).on( 'click', function(){

					if( mainSettings.keyMotion === true ){

						mainSettings.keyMotion = false;

						var countItems = $( this ).parent().parent().children( 'li' ).length;
						
						$( this ).parent().parent().children( 'li' ).each( function(){

							var dataAngle = $( this ).attr( 'data-angle' );

							dataAngle++;

							if( dataAngle > countItems ){
								dataAngle = 1;
							}

							$( this ).attr( 'data-angle', dataAngle );

							var dataAngleNext = $( this ).attr( 'data-angle' );

							if( !$( this ).parent().hasClass( 'mx-sub_navigation' ) ){
								motionItemsNext( dataAngle, $( this ), dataAngleNext );
							} else{
								motionItemsNext( dataAngle, $( this ), dataAngleNext, true );
							}

						} );
					}

				} );
			},

			// step prev
			runPrev: function(){

				$( '.prevSpace' ).on( 'click', function(){

					if( mainSettings.keyMotion === true ){

						mainSettings.keyMotion = false;

						var countItems = $( this ).parent().parent().children( 'li' ).length;					
						
						$( this ).parent().parent().children( 'li' ).each( function(){

							var dataAngle = $( this ).attr( 'data-angle' );

							dataAngle--;

							if( dataAngle < 1 ){
								dataAngle = countItems;
							}

							$( this ).attr( 'data-angle', dataAngle );

							var dataAnglePrev = $( this ).attr( 'data-angle' );

							if( !$( this ).parent().hasClass( 'mx-sub_navigation' ) ){
								motionItemsPrev( dataAngle, $( this ), dataAnglePrev );
							} else{
								motionItemsPrev( dataAngle, $( this ), dataAnglePrev, true );
							}
							
						} );
					}

				} );
			},

			// open sub menu
			openSubMenu: function(){

				$( '.mx-is_sub_menu_link' ).on( 'click', function(){

					if( $( this ).next( 'ul' ).hasClass( 'mx-sub_navigation_visible' ) ){

						$( this ).next( 'ul' ).removeClass( 'mx-sub_navigation_visible' );
						$( this ).next( 'ul' ).find( 'ul' ).removeClass( 'mx-sub_navigation_visible' );

					} else{
						$( this ).parent().parent().find( 'li' ).find( 'ul' ).removeClass( 'mx-sub_navigation_visible' );
						$( this ).next( 'ul' ).addClass( 'mx-sub_navigation_visible' );
					}
					
				} );
			},

			closedAllSubMenuClickOutside: function(){
				$( window ).on( 'click', function(e){
					closedAllSubMenu( root, e );
				} );				
			},

			// open the menu
			openMenu: function(){
				$( '#mxOpenMenu' ).on( 'click', function(){
					$( '.mx-navigation_wrap' ).animate( { top: '0px' }, settings.downMenuSpeed );
					$( 'ul.mx-navigation' ).animate( { top: '50%' }, settings.downMenuSpeed * 1.2 );

					$( '#mxOpenMenu' ).css( 'top', '-100px' );
				} );				
			},

			// close the menu
			closeMenu: function(){
				$( '.mx-close' ).on( 'click', function(){
					$( '.mx-navigation_wrap' ).animate( { top: '-2000px' }, settings.downMenuSpeed * 2 );
					$( 'ul.mx-navigation' ).animate( { top: '-2000px' }, settings.downMenuSpeed * 1.5 );

					$( '#mxOpenMenu' ).animate( { top: '50px' }, settings.downMenuSpeed / 2 );
				} );
			},

			// collapse the menu
			collapseMenu: function(){

				$( '.mx-close' ).animate( { opacity: 0 }, settings.collapseMenuSpeed );
				$( '.mx-navigation' ).animate( { top: -2000 }, settings.collapseMenuSpeed / 1.5 );
				$( '.mx-back_circle1' ).animate( { top: -1500 }, settings.collapseMenuSpeed * 1.5 );
				$( '.mx-back_circle2' ).animate( { top: -1000 }, settings.collapseMenuSpeed * 1.5 );
				$( '.mx-sub_navigation .mx-sub_navigation' ).animate( { top: -1000 }, settings.collapseMenuSpeed * 1.9 );
				$( '.mx-sub_navigation' ).animate( { top: -1000 }, settings.collapseMenuSpeed * 1.5 );
				
			},

			// window location
			linkLocation: function(){

				var _this = this;

				if( settings.collapseMenu === true ){

					root.find( 'a' ).on( 'click', function( e ){
						if( !$( this ).hasClass( 'mx-is_sub_menu_link' ) ){
							var linkHref = $( this ).attr( 'href' );
							
							_this.collapseMenu();

							setTimeout( function(){
								window.location.href = linkHref;
							},settings.collapseMenuSpeed );

						}

						e.preventDefault();
					} );

				}

				
			},

			run: function(){
				
				this.getWidthWindow();
				this.runNext();
				this.runPrev();				
				this.openSubMenu();
				this.closedAllSubMenuClickOutside();
				this.openMenu();
				this.closeMenu();
				this.linkLocation();
				
			}

		};

		interaction.run();

		// Execution

		// width window
		function widthWindow(){
			return $( window ).innerWidth();
		}

		// coordinates default
		function setCoordinates( item ){
			var x = mainSettings.radius + (mainSettings.radius - mainSettings.correctRadius) * Math.cos( mainSettings.MATH_PI * (-item+1) / mainSettings.visibleCount );
			var y = mainSettings.radius + (mainSettings.radius - mainSettings.correctRadius) * Math.sin( mainSettings.MATH_PI * (-item+1) / mainSettings.visibleCount );

			return{
				left: x,
				top: y
			}
		}

		// coordinates for sub items
		function setCoordinatesSubItems( item ){
			var x = mainSettings.radiusSubItem + (mainSettings.radiusSubItem - mainSettings.correctRadiusSubItem) * Math.cos( mainSettings.MATH_PI * (-item+1) / mainSettings.visibleSubCount );
			var y = mainSettings.radiusSubItem + (mainSettings.radiusSubItem - mainSettings.correctRadiusSubItem) * Math.sin( mainSettings.MATH_PI * (-item+1) / mainSettings.visibleSubCount );

			return{
				left: x,
				top: y
			}
		}

		// motion next
		function motionItemsNext( dataAngle, element, dataAngleNext, itsSubItems ){

			if( itsSubItems !== true ){

				var coordinates = setCoordinates( dataAngle );

				element.animate( { left: coordinates.left - (mainSettings.correctPosition / 2) +'px', top: coordinates.top - (mainSettings.correctPosition / 2) +'px' }, settings.duration );

				setTimeout( function(){

					element.removeClass( 'mx-visible' );

					if( dataAngleNext > 0 && dataAngleNext <= mainSettings.visibleCount ){
						element.addClass( 'mx-visible' );
					}

				}, settings.duration );

			} else{

				var coordinates = setCoordinatesSubItems( dataAngle );

				element.animate( { left: coordinates.left - (mainSettings.subCorrectPosition / 2) +'px', top: coordinates.top - (mainSettings.subCorrectPosition / 2) +'px' }, settings.duration );

				setTimeout( function(){

					element.removeClass( 'mx-visible' );

					if( dataAngleNext > 0 && dataAngleNext <= mainSettings.visibleSubCount ){
						element.addClass( 'mx-visible' );
					}

				}, settings.duration );

			}

			// closed all sub menu
			element.find( 'ul' ).removeClass( 'mx-sub_navigation_visible' );

			setTimeout( function(){
				mainSettings.keyMotion = true;
			}, settings.duration );
			
		}

		// motion prev
		function motionItemsPrev( dataAngle, element, dataAnglePrev, itsSubItems ){

			if( itsSubItems !== true ){

				element.removeClass( 'mx-visible' );

				if( dataAnglePrev > 0 && dataAnglePrev <= mainSettings.visibleCount ){
					element.addClass( 'mx-visible' );
				}					

				var coordinates = setCoordinates( dataAngle );

				element.animate( { left: coordinates.left - (mainSettings.correctPosition / 2) +'px', top: coordinates.top - (mainSettings.correctPosition / 2) +'px' }, settings.duration );

			} else{

				element.removeClass( 'mx-visible' );

				if( dataAnglePrev > 0 && dataAnglePrev <= mainSettings.visibleSubCount ){
					element.addClass( 'mx-visible' );
				}					

				var coordinates = setCoordinatesSubItems( dataAngle );

				element.animate( { left: coordinates.left - (mainSettings.subCorrectPosition / 2) +'px', top: coordinates.top - (mainSettings.subCorrectPosition / 2) +'px' }, settings.duration );
		
			}

			// closed all sub menu
			element.find( 'ul' ).removeClass( 'mx-sub_navigation_visible' );

			setTimeout( function(){
				mainSettings.keyMotion = true;
			}, settings.duration );
		}

		// closed all sub menu
		function closedAllSubMenu( root, e ){
			if( !root.is( e.target ) && root.has( e.target).length === 0 ){
				root.find( 'ul' ).removeClass( 'mx-sub_navigation_visible' );
			}
		}

	}
 
}( jQuery ));