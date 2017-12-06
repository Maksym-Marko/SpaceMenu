var bgs = [
	'bg_1.jpg',
	'bg_2.jpg',
	'bg_3.jpg',
	'bg_4.jpg',
	'bg_5.jpg',
	'bg_6.jpg',
	'bg_7.jpg',
	'bg_8.jpg',
	'bg_9.jpg',
	'bg_10.jpg'
];

$( document ).ready( function(){
	var lengthBg = bgs.length;
	var backgroundI = bgs[RandomNumber( 0, lengthBg-1 )];
	$( 'body' ).css( 'background-image', 'url(./assets/img/' + backgroundI + ')' );
} );

function RandomNumber( from, to ){
	return Math.floor( ( Math.random() * ( to - from + 1 ) ) + from );
}