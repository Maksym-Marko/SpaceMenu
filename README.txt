Настройки плагина:

$( document ).ready( function(){

$( '.menu' ).spaceMenu( { 

duration: 800, // Menu rotation duration 'milliseconds' 
visibleElementsMainMenu: 7, // Number of visible menu items 'integer' 
visibleElementsSubMenu: 5, // Number of visible submenus items 'intege' 
circleFromBehind: false, // Decorative circles 'boolean: true or false' 
livingElements: false, // Light flicker elements 'boolean: true or false' 
liveItemsHover: false, // Flashing items while hovering the cursor 'boolean: true or false' 
menuFixed: true, // Fix the menu on the screen 'boolean: true or false'

// The options below work if the menu is not fixed 
downMenuSpeed: 600, // Menu opening speed 'milliseconds' 
collapseMenu: true, // Go to the next page, slowly close the menu 'boolean: true or false' 
collapseMenuSpeed: 2000 // Menu closing speed 'milliseconds'

} );

} );