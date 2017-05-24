$(document).ready(function(){

    function cargar(result){
      $("#main").html(result);
    }

    function loadajax("page"){
      let result = page.concat(".html");
        $.ajax({
          url: result,
          dataType: "html"
          success: cargar
          }
        $("li").removeClass("active");
        $(page).addClass("active");
    });

    $("#home").on("click",function(){
      loadajax("home");
      /*$.ajax({
              dataType: "html",
              url: "home.html",
              success: cargar
            });
            $("li").removeClass("active");
            $("#home").addClass("active"); */
    });

    $("#experiencias").on("click",function(){
      loadajax("experiencias");
    });

    $("#paquetes").on("click",function(){
      loadajax("paquetes");
    });

    $("#contacto").on("click",function(){
      loadajax("contacto");
    });
});
