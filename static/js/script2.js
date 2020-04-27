"use strict"

var vetTopAzioni = [];

$(function(){   

    $("#contCaricaImg").hide();



    /****************FUNZIONE PER CARICARAE I POST */
    if( $("#bdProfiloGiocatore").length != 0){
        var prendiPost = inviaRichiesta('/api/prendiPost', 'POST',{id:1});
        prendiPost.done(function(data) {
            var row;
            var rowC = 3;
            var contTA = 0;
            data.forEach(function(post){
                var contPost = $("#aggiungiPostScript");
                if(rowC == 3){
                    rowC == 0;
                    row = $("<div class='row'></div>");
                    contPost.append(row);
                }
                var rowColPost = $('<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"></div>');
                row.append(rowColPost);
                var contPost2= $('<div class="post"></div>');
                if(post["tipo"] == "i"){
                    var videoPost = $('<video class="video-fluid z-depth-1 videoImgPost" muted="muted"></video>');
                }else{
                    var videoPost = $('<video class="video-fluid z-depth-1 videoImgPost" muted="muted"></video>');
                    var videoPSource = $('<source src="'+post["percorso"]+'" type="video/mp4"/>');
                    videoPost.append(videoPSource);
                    contPost2.append(videoPost);                   
                }
                var contDescPost = $('<div class="contDescP"></div>');
                var rowGeneric = $("<div class='row'></div>");
                contDescPost.append(rowGeneric);
                /*<div class="row">
                        <div class="col-lg-2 col-xs-2 col-sm-2"></div>
                        <div class="col-lg-4 col-xs-4 col-sm-4 centro"><i class="fa fa-bolt iconaFul" aria-hidden="true"></i></div>
                        <div class="col-lg-4 col-xs-4 col-sm-4 centro"><i class="fa fa-eye iconaVis" aria-hidden="true"></i><span class="parVis">&nbsp;700</span></div>
                        <div class="col-lg-2 col-xs-2 col-sm-2"></div>
                      </div>*/
                var divLike1 = $('<div class="col-lg-2 col-xs-2 col-sm-2"></div>');
                rowGeneric.append(divLike1);
                var divLike2 = $('<div class="col-lg-4 col-xs-4 col-sm-4 centro"></div>');
                rowGeneric.append(divLike2);
                var iconDivL2 = $('<i class="fa fa-bolt iconaFul" aria-hidden="true"></i>');
                divLike2.append(iconDivL2);
                var divLike3 = $('<div class="col-lg-4 col-xs-4 col-sm-4 centro"></div>');
                rowGeneric.append(divLike3);
                var iconDivL3 = $('<i class="fa fa-eye iconaVis" aria-hidden="true"></i>');
                divLike3.append(iconDivL3);
                var spanDivL3 = $('<span class="parVis">&nbsp;'+post["visual"]+'</span>');
                divLike3.append(spanDivL3);
                rowGeneric.append(divLike1);
                contPost2.append(contDescPost);
                rowColPost.append(contPost2);
                contDescPost.append('<hr class="hrPost">');
                var divContDetP = $('<div class="contDettagliPost"></div>');
                contDescPost.append(divContDetP);
                var rowGeneric2 = $("<div class='row'></div>");
                divContDetP.append(rowGeneric2);
                rowGeneric2.append('<div class="col-xs-4 col-sm-4 col-lg-4"><p class="tipoP"><b>Parita Champions:</b></p></div>');
                rowGeneric2.append('<div class="col-xs-4 col-sm-4 col-lg-4"><p class="dettP">vs Liverpool</p></div>');
                var rowGeneric3 = $("<div class='row'></div>");
                divContDetP.append(rowGeneric3);
                rowGeneric3.append('<div class="col-xs-4 col-sm-4 col-lg-4"><p><b>Data:</b></p></div>');
                rowGeneric3.append('<div class="col-xs-4 col-sm-4 col-lg-4"><p class="dataP">'+post["data"]+'</p></div>');
                rowC++;

                if(post["topA"] == "Y"){
                    $("#videoTop"+(contTA+1)).append('<source src="'+post["percorso"]+'" type="video/mp4" />');
                    $("#videoTop"+(contTA+1)).removeClass("nonCaricato");
                    $("#videoTop"+(contTA+1)).attr("controls","controls");
                    vetTopAzioni.push({id:post["_id"],percorso:post["percorso"]});
                    contTA++;               
                }
            });
            $(".nonCaricato").replaceWith('<img src="immagini/logo.png" class="videoTop">');
            /*$(".nonCaricato").append('<source src="immagini/logo.png" type="video/mp4" />');*/
            var figure = $(".videoTopCont").hover( hoverVideo, hideVideo );
            var figure2 = $(".post").hover( hoverVideo, hideVideo );
            $(".videoImgPost").hover(function(e){
                this.setAttribute("controls", "controls");
            }, function(e){
                this.removeAttribute("controls");
                this.currentTime = 0;
            });
            $(".videoTopCont").hover(function(e){
                this.setAttribute("controls", "controls");
            }, function(e){
                this.setAttribute("controls", "controls");
                this.currentTime = 0;
            });
        });
        prendiPost.fail(function(jqXHR, test_status, str_error) {
            error(jqXHR, test_status, str_error)
        });
    }   
    /******************************************* */


    /****************CARICAMENTO TOP AZIONI */



    /************************************* */


    $(".vociM").hover(function(){
        var voci = $(this).find("span")[1];
        $(voci).removeAttr("hidden");
       // alert("hey");
    }, function(){
        var voci = $(this).find("span")[1];
        $(voci).attr("hidden","hidden");
    });

    $(".videoImgPost").hover(function(e){
        this.setAttribute("controls", "controls");
    }, function(e){
        this.removeAttribute("controls");
        this.currentTime = 0;
    });

    $("#contImmagine").hover(function(e){
        $("#contCaricaImg").show();
    }, function(e){
        this.removeAttribute("controls");
        $("#contCaricaImg").hide();
    });

    $(".iconaFul").on("click",function(){

    });

    $("#croceAggiungiFP").on("click",function(){
        $("#btnFormAggFP").click();
    });
    /**********FUNZIONE PER CAMBIARE LA FOTO PROFILO */
    $("#btnFormAggFP").change(function(e){
        if(confirm("Sei sicuro di voler cambiare la foto profilo?")){
            $("#btnCaricaFP").click();
            alert("Foto caricata correttamente");
        }else{
            
        }
    });
    /******FUNZIONE PER AGGIUNGERE UN POST */
    $("#aggiungiPost").on("click",function(){
        var aggiungiPost = inviaRichiesta('/api/aggiungiPost', 'POST',{idG:1,like:0,percorso:"video/secondoVideo.mp4",data:"20/04/2020"});
        aggiungiPost.done(function(data) {
            alert("Post Caricato");
        });
        aggiungiPost.fail(function(jqXHR, test_status, str_error) {
            error(jqXHR, test_status, str_error)
        });
    });

    /**********Inserimento nelle top azioni */

    $(".btnInsTop").on("click",function(event){
        var posizioneTop;
        for(var i = 1; i < 4; i++)
        {
            if($(this).hasClass("btnInsTop-"+i))
                posizioneTop = i;
        }

        if(posizioneTop <= vetTopAzioni.length)
        {
            var annullaTopOld = inviaRichiesta('/api/annullaTopOld', 'POST',{id: vetTopAzioni[posizioneTop-1]["id"]});
            annullaTopOld.done(function(data) {
                console.log(data);
            });
            annullaTopOld.fail(function(jqXHR, test_status, str_error) {
                error(jqXHR, test_status, str_error)
            });
        }
        var inserisciTop = inviaRichiesta('/api/inserisciTop', 'POST',{id: $(this).attr("idVideo")});
        inserisciTop.done(function(data) {
                console.log(data);
                alert("Video inserito tra le Top Azioni");
        });
        inserisciTop.fail(function(jqXHR, test_status, str_error) {
                error(jqXHR, test_status, str_error)
        });        

    });

    /***************************************/
    
});
var figure = $(".videoTopCont").hover( hoverVideo, hideVideo );
var figure2 = $(".post").hover( hoverVideo, hideVideo );

function hoverVideo(e) {  
    $('video', this).get(0).play(); 
}

function hideVideo(e) {
    $('video', this).get(0).pause(); 
}


function inviaRichiesta(url, method, parameters={}) {
	var contentType;
	if(method.toLowerCase() == "get"){
		contentType= "application/x-www-form-urlencoded; charset=UTF-8";
	}
	else{
		contentType= "application/json; charset=utf-8";
		parameters = JSON.stringify(parameters);
	}
		
    return $.ajax({
        url: url, //default: currentPage
        type: method,
        data: parameters,
        contentType: contentType,
        dataType: "json",
        timeout: 5000,
    });
}
