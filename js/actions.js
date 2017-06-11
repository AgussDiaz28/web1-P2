$( document ).ready( function() {

	numGrupo =  91;
	url = "https://web-unicen.herokuapp.com/api/thing/group/";

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

		$( "#guardar" ).on( "click", function( event ) {																							// En la pagina de carga de promociones existe el boton Guardar para cargar la tabla
			event.preventDefault();
			let pais = $( "#pais" ).val();
			let ciudad = $( "#ciudad" ).val();
			let precioI = $( "#precioI" ).val();
			let precioP = $( "#precioP" ).val();
			let objeto = {
				"group": numGrupo,
				"thing": {
					"pais": pais,
					"ciudad": ciudad ,
					"precioI": precioI,
					"precioP": precioP,
				}
			}
																																									// Esta bien que el llamado AJax este aca ?
		$.ajax( {
				"url": "https://web-unicen.herokuapp.com/api/thing",
				"method": "POST",
				async: false,																																								// Esto vale ?
				"contentType": "Application/json; charset=utf-8",
				"data": JSON.stringify( objeto ),
				"dataType": "JSON",
				"success": 	traerDatosTabla,
				"error": ErrorLog
			} )
		}
	 )
	};

	function deleteElement(data) {
			console.log(data);

	};

	function deleteRow( row ) {
			let objeto = {
				"_id" : row,
				"group" : numGrupo,
				"thing" : {

				}
			}
			$.ajax({
			"url": url,
			"method": "DELETE",
			"contentType": "Application/json; charset=utf-8",
			"data": JSON.stringify(objeto),
			"dataType": "JSON",
			"success": deleteElement,
			"error": ErrorLog
		});
	};

	function traerDatosTabla() {																										// trae todos los datos cuando carga la pagina de paquetes
		$.ajax( {
			"url": url+numGrupo,
			"method": "GET",
			"dataType": "JSON",
			"success": mostrarDatosTabla,
			"error": ErrorLog
		} );
		// $( ".js-table-add" ).html( "<h4> Cargando... </h4>" );																								// Por que no desaparece despues de cargar ?
	}


	function mostrarDatosTabla( data ) {																															// Funcion que transforma el objeto JSON a HTML
		let html
		for ( let i = 0; i < data.information.length; i++ ) {
			html += "<tr id=' " +data.information[i]._id + "'>"
			html += "<td>" + data.information[i].thing.pais + "</td>" ;
			html += "<td>" + data.information[i].thing.ciudad + "</td>";
			html += "<td>" + data.information[i].thing.precioI + "</td>";
			html += "<td>" + data.information[i].thing.precioP + "</td>";
			html += '<td><span class="glyphicon glyphicon-trash" value=' +data.information[i]._id + '></span></td>';
			html += "</tr>"
		}

		$( ".js-table-add tbody" ).html( html );

		$("span.glyphicon").on("click",function() {
					row = $(this).attr("value");
					deleteRow(row);
					// -------------- Deberia llamarse desde el sucess por que por el asincronismo la fila desaparece del HTML pero no del servicio
					var tr = $(this).closest('tr')
					tr.css("background-color","#FF3700");
					tr.fadeOut(400, function(){
						tr.remove();
					});
					// ........................
		})

	}

	function Guardado(data) {
		for ( let i = 0; i < data.information.length; i++ ) {

	}};

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

	function ErrorLog() {
		//Mostrar mensaje de error al usuario
	}

	$( "#home" ).on( "click", function() {
		loadajax( "home" );
	} );

	$( "#experiencias" ).on( "click", function() {
		loadajax( "experiencias" );
	} );


	$( "#paquetes" ).on( "click", function() {
		loadajax( "paquetes" );
	  traerDatosTabla ();
	} );

	$( "#contacto" ).on( "click", function() {
		loadajax( "contacto" );
	} );


});
