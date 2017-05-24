$(document).ready(function(){

    function cargar(result){
      $("#main").html(result);
    }

    $("#contacto").click(function(){
          $.ajax({
                  dataType: "html",
                  url: "contact.html",
                  success: cargar
                });
          $("li").removeClass("active");
          $("#contacto").addClass("active");
        });


    $("#home").click(function(){
      $.ajax({
              dataType: "html",
              url: "home.html",
              success: cargar
            });
            $("li").removeClass("active");
            $("#home").addClass("active");
    });

    $("#experiencias").click(function(){
      $.ajax({
              dataType: "html",
              url: "experiencias.html",
              success: cargar
            });
            $("li").removeClass("active");
            $("#experiencias").addClass("active");
    });

    $("#paquetes").click(function(){
      $.ajax({
              dataType: "html",
              url: "paquetes.html",
              success: cargar
            });
            $("li").removeClass("active");
            $("#paquetes").addClass("active");

    });


});
