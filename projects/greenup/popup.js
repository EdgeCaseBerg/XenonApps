goog.provide( 'nm.ui.InlinePopup' ); //namespace

goog.require( 'goog.events' );
goog.require( 'goog.ui.Dialog' );
goog.require( 'goog.dom.DomHelper' );
goog.require( 'goog.net.ImageLoader' );

console.log("popup.js executed");

// constructor – takes no arguments
nm.ui.InlinePopup = function(){ 
	// init objects
	this.dia = new goog.ui.Dialog( 'inlinepopup' , true );
	this.loader = new goog.net.ImageLoader();
	this.domh = new goog.dom.DomHelper();

	// setup objects
	this.dia.setVisible( false );
	this.dia.setBackgroundElementOpacity( 0.9 );
	this.dia.getButtonElement().parentNode.removeChild( this.dia.getButtonElement() );
	this.dia.getTitleCloseElement().innerHTML = 'X';

	// event listeners
	goog.events.listen( this.dia.getBackgroundElement() ,  goog.events.EventType.CLICK , this.closePopup , false , this );
	goog.events.listen( this.loader , goog.events.EventType.LOAD , this.imageLoaded , false , this );
};

// TODO: GET HEADER AND FOOTER AND MAKE THEM INVISIBLE WHEN THE POPUP IS ON, AND MAKE THEN VISIBLE WHEN THE POPUP IS OFF
// ALSO, CATCH ARROW CLICKS AND SCROLL THROUGH THE IMAGES


// open popup – takes a click event as an argument
nm.ui.InlinePopup.prototype.goPopup = function( e ){
	// dont follow the link
	e.preventDefault();// add link href as image to load
	this.loader.addImage( 'previewimg' , e.currentTarget.href );
	this.loader.start();

	// hide header and footer
	goog.dom.getElement('header').style.display = 'none';
	goog.dom.getElement('footer').style.display = 'none';

	// set title
	if( e.currentTarget.title )
		this.dia.setTitle( e.currentTarget.title ); // use title if the anchor has one
	else
		this.dia.setTitle( e.currentTarget.href ); // otherwise show href as title
};


// close popup – takes a click event as an argument
nm.ui.InlinePopup.prototype.closePopup = function( e ){ 
	this.dia.setVisible( false );

	// show header and footer
	goog.dom.getElement('header').style.display = 'block';
	goog.dom.getElement('footer').style.display = 'block';
};


// image loaded – takes a load event as an argument
nm.ui.InlinePopup.prototype.imageLoaded = function( e ){ 
	// set width, then content , then show it
	this.dia.getDialogElement().style.width = ( e.target.width + 30 ) + 'px';
	this.dia.setContent( '<img src="' + e.target.src + '" width="' + e.target.width + '" height="' + e.target.height + '" />' );
	// show it
	this.dia.setVisible( true );
};


// bind to class – adds a listener to any links with the specified class ‘c’
nm.ui.InlinePopup.prototype.bindToClass = function( c ){ 
	var es = this.domh.getElementsByTagNameAndClass( '*' , c );
	// listen for CLICK Event on every object in the NodeList
	for( i in es ) if( typeof es[ i ] == 'object' )
	goog.events.listen( es[ i ] , goog.events.EventType.CLICK , this.goPopup , false , this );
};

