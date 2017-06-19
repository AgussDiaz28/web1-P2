$( document ).ready( function() {

	numGrupo =  91;
	url = "https://web-unicen.herokuapp.com/api/thing/group/";

	$("li").ready(function (){
		$("#main").html("Cargando")
	});

	"use strict";

	deleteRow("59483389154df5040060cb72");

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
				subirTabla(objeto);
		});

		$("#CPromo").on('click',function () {
			llenarTabla();
		});

	};

	function subirTabla(ObjJSON) {
				$.ajax( {
						"url": "https://web-unicen.herokuapp.com/api/thing",
						"method": "POST",																																							// Esto vale ?
						"contentType": "Application/json; charset=utf-8",
						"data": JSON.stringify( ObjJSON ),
						"dataType": "JSON",
						"success": 	traerDatosTabla,
						"error": ErrorLog
					} );
	};

	function deleteRow( row ) {
			$.ajax({
			"url": 'https://web-unicen.herokuapp.com/api/thing/'+row,
			"method": "DELETE",
			"contentType": "Application/json; charset=utf-8",
			"dataType": "JSON",
			"success": deleteElement,
			"error": ErrorLog
		});
	};

	function editRow( row ) {
				$.ajax({
				"url": 'https://web-unicen.herokuapp.com/api/thing/' + row,
				"method": "GET",
				"contentType": "Application/json; charset=utf-8",
				"dataType": "JSON",
				"success": editJSON,
				"error": ErrorLog
			});
	}

	function editedRow( ObjJSON ) {
		$.ajax( {
				"url": "https://web-unicen.herokuapp.com/api/thing/" + row,
				"method": "PUT",
				"contentType": "Application/json; charset=utf-8",
				"data": JSON.stringify( ObjJSON ),
				"dataType": "JSON",
				"success": 	traerDatosTabla,
				"error": ErrorLog
			} );
	}

	function editJSON( data ) {

	  $( "#pais" ).val(data.information.thing.pais );
		$( "#ciudad" ).val(data.information.thing.ciudad  );
		$( "#precioI" ).val(data.information.thing.precioI  );
		$( "#precioP" ).val(data.information.thing.precioP );

		$("#editar").on("click",function () {
			let obJSON = {
										"group": numGrupo,
										"thing": {
															"pais":  $( "#pais" ).val(),
															"ciudad": 	$( "#ciudad" ).val(),
															"precioI": $( "#precioI" ).val(),
															"precioP": 		$( "#precioP" ).val(),
														}
									}

		editedRow(obJSON);

	})
	}

	function deleteElement() {

	};

	function traerDatosTabla() {																										// trae todos los datos cuando carga la pagina de paquetes
		$.ajax( {
			"url": url+numGrupo,
			"method": "GET",
			"dataType": "JSON",
			"success": mostrarDatosTabla,
			"error": ErrorLog
		} );
		 $( ".js-table-edit" ).html( "<h4> Cargando... </h4>" );																								// Por que no desaparece despues de cargar ?
	};

	function mostrarDatosTabla( data ) {																													// Funcion que transforma el objeto JSON a HTML
		let html
		for ( let i = 0; i < data.information.length; i++ ) {
			html += "<tr id=' " +data.information[i]._id + "'>"
			html += "<td>" + data.information[i].thing.pais + "</td>" ;
			html += "<td>" + data.information[i].thing.ciudad + "</td>";
			html += "<td>" + data.information[i].thing.precioI + "</td>";
			html += "<td>" + data.information[i].thing.precioP + "</td>";
			html += '<td><span class="glyphicon glyphicon-trash" value=' +data.information[i]._id + '></span></td>';
			html += '<td><span class="glyphicon glyphicon-edit" value=' +data.information[i]._id + '></span></td>';
			html += "</tr>"
		}

		$( ".js-table-add tbody" ).html( html );

		$("span.glyphicon-trash").on("click",function() {
					row = $(this).attr("value");
					deleteRow(row);
					// -------------- Deberia llamarse desde el sucess por que por el asincronismo la fila desaparece del HTML pero no del servicio
					var tr = $(this).closest('tr')
					tr.css("background-color","#FF3700");
					tr.fadeOut(400, function(){
					tr.remove();
					});
					// ........................
		});

		$("span.glyphicon-edit").on("click",function() {
			row = $(this).attr("value");
			$("#guardar").attr("id","editar")
			$( ".guardar" ).html("Editar Columna");
			editRow(row);
		});

	};

	function partialRender( pagina ) {
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
		alert("Hubo un errro de Ajax")
	}

	function llenarTabla() {
		let objeto1 = {
			"group": numGrupo,
			"thing": {
				"pais": "Canada",
				"ciudad": "Toronto " ,
				"precioI": "21000",
				"precioP": "18000",
			}
		};

		let objeto2 = {
			"group": numGrupo,
			"thing": {
				"pais": "Estados Unidos",
				"ciudad": "Las Vegas" ,
				"precioI": "21000",
				"precioP": "18000",
			}
		};

		let objeto3 = {
			"group": numGrupo,
			"thing": {
				"pais": "Estados Unidos",
				"ciudad": "New York" ,
				"precioI": "18000",
				"precioP": "15000",
			}
		};

		subirTabla(objeto1);
		subirTabla(objeto2);
		subirTabla(objeto3);

	};

	$( "#home" ).on( "click", function() {
		partialRender( "home" );
	} );

	$( "#experiencias" ).on( "click", function() {
		partialRender( "experiencias" );
	} );


	$( "#paquetes" ).on( "click", function() {
		partialRender( "paquetes" );
	  traerDatosTabla ();
	} );

	$( "#contacto" ).on( "click", function() {
		partialRender( "contacto" );
	} );


});
