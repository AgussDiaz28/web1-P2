$( document ).ready( function() {

	function cargar( result ) {
		$( "#main" ).html( result );
	};

	$( "#home" ).ready( function() {
		$.ajax( {
			dataType: "html",
			url: "home.html",
			success: cargar
		} );
		//$( "li" ).removeClass( "active" );
		//$( "#home" ).addClass( "active" );

	} );

	function loadajax( pagina ) {
		let result = pagina.concat( ".html" );
		console.log( result );
		$.ajax( {
			dataType: "html",
			url: result,
			success: cargar
		} );
		$( "li" ).removeClass( "active" );
		$( pagina ).addClass( "active" );
	};

	$( "#home" ).on( "click", function() {
		loadajax( "home" );
		/*$.ajax( {
			dataType: "html",
			url: "home.html",
			success: cargar
		} );
		$( "li" ).removeClass( "active" );
		$( "#home" ).addClass( "active" );*/
	} );

	$( "#experiencias" ).on( "click", function() {
		loadajax( "experiencias" );
	} );


	$( "#paquetes" ).on( "click", function() {
		loadajax( "paquetes" );
	} );

	$( "#contacto" ).on( "click", function() {
		loadajax( "contact" );
	} );
} );
