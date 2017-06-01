$( document ).ready( function() {

	numGrupo =  91;

	$("li").ready(function (){
		$("#main").html("Cargando")
	});

	"use strict";

	$( "#home" ).ready( function() {
		$.ajax( {
			dataType: "html",
			url: "home.html",
			success: cargar
		} );
		$( "li" ).removeClass( "active" );
		$( "#home" ).addClass( "active" );

	} );

	function cargar( result ) {
		$( "#main" ).html( result );
	};

	function traerDatosTabla() {
		$.ajax( {
			"url": "http://10.10.12.28:5000/api/thing/group/" + numGrupo,
			"method": "GET",
			"dataType": "JSON",
			"success": mostrarDatosTabla,
			"error": ErrorLog
		} );
		$( "..js-table-add" ).html( "<h4> Cargando... </h4>" )
	}

	function mostrarDatosTabla( data ) {
		for ( let i = 0; i < data.information.length; i++ ) {
			html += "<tr>" + "<td>" + data.information[ i ].pais + "</td>" + "<tr>";
			html += "<tr>" + "<td>" + data.information[ i ].ciudad + "</td>" + "<tr>";
			html += "<tr>" + "<td>" + data.information[ i ].precioI + "</td>" + "<tr>";
			html += "<tr>" + "<td>" + data.information[ i ].precioP + "</td>" + "<tr>";
			html += "<tr>"  + "<td><span class=" + "glyphicon glyphicon-trash" + "></span></td>" + "</tr>" ;
		}
		$( ".js-table-add" ).html( html );
	}

	$( "#guardar" ).on( "click", function( event ) {
		event.preventDefault();
		let pais = $( "#pais" ).val();
		let ciudad = $( "#ciudad" ).val();
		let precioI = $( "#precioI" ).val();
		let precioP = $( "#precioP" ).val();
		let objeto = {
			"group": numGrupo,
			"pais": info,
			"ciudad": ciudad ,
			"precioI": precioI,
			"precioP": precioP,
		}
		$.ajax( {
			"url": "http://10.10.12.28:5000/api/thing" + numGrupo,
			"method": "POST",
			"contentType": "Application/json; charset=utf-8",
			"data": JSON.stringify( objeto ),
			"dataType": "JSON",
			"success": Guardado ,
			"error": ErrorLog
		} )
	} )

	function loadajax( pagina ) {
		let result = pagina.concat( ".html" );
		$.ajax( {
			dataType: "html",
			url: result,
			success: cargar
		} );
		$( "li" ).removeClass( "active" );
		$( "#" + pagina ).addClass( "active" );
	};

	$( "#home" ).on( "click", function() {
		loadajax( "home" );
	} );

	$( "#experiencias" ).on( "click", function() {
		loadajax( "experiencias" );
	} );


	$( "#paquetes" ).on( "click", function() {
		loadajax( "paquetes" );
	} );

	$( "#contacto" ).on( "click", function() {
		loadajax( "contacto" );
	} );

	$( "#cargado" ).on( "click", function() {
		loadajax( "cargado" );
	} );

} );
