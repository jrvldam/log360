define(function() {
	$( '#my-form' )
  .submit( function( e ) {
    $.ajax( {
      url: 'http://host.com/action/',
      type: 'POST',
      data: new FormData( this ),
      processData: false,
      contentType: false
    } );
    e.preventDefault();
  } );
});