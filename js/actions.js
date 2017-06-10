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
				"url": "https://web-unicen.herokuapp.com/api/thing/",
				"method": "POST",
				"contentType": "Application/json; charset=utf-8",
				"data": JSON.stringify( objeto ),
				"dataType": "JSON",
				"success": traerDatosTabla,
				"error": ErrorLog
			} )
		}
	 )
	};

	function deleteRow( rowid ) {
		$.ajax({
			"url": "https://web-unicen.herokuapp.com/api/thing/group/" + numGrupo,
			"method": "DELETE",
			"contentType": "Application/json; charset=utf-8",
			"data": JSON.stringify( row ),
			"dataType": "JSON",
			"success": mostrarDatosTabla,
			"error": ErrorLog
		});

	}

	function traerDatosTabla() {																										// trae todos los datos cuando carga la pagina de paquetes
		$.ajax( {
			"url": "https://web-unicen.herokuapp.com/api/thing/group/" + numGrupo,
			"method": "GET",
			"dataType": "JSON",
			"success": mostrarDatosTabla	,
			"error": ErrorLog
		} );
		$( ".js-table-add" ).html( "<h4> Cargando... </h4>" )
	}

	function mostrarDatosTabla( data ) {																															//funcion que transforma el objeto JSON a HTML
		let html
		for ( let i = 0; i < data.information.length; i++ ) {
			html += "<tr id=' " +data.information[i]._id + "'>"
			html += "<td>" + data.information[i].thing.pais + "</td>" ;
			html += "<td>" + data.information[i].thing.ciudad + "</td>";
			html += "<td>" + data.information[i].thing.precioI + "</td>";
			html += "<td>" + data.information[i].thing.precioP + "</td>";
			html += '<td><span class="glyphicon glyphicon-trash" value=' +data.information[i]._id + '></span></td>'; //primero borro del servicio y succes borro la fila
			html += "</tr>"
		}
		$( ".js-table-add tbody" ).html( html );

		$("span.glyphicon").on("click",function() {
					value = $("span.glyphicon").attr("value");
					console.log(value);
					//deleteRow(value);
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
