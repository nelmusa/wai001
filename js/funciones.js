function onOffline() {
	var idioma = localStorage.idioma;
	if (idioma == 'es'){
		var msg001 = 'Ocurrió un error.\nPor favor inténtarlo mas tarde.';
    } else if (idioma == 'pt'){
    	var msg001 = 'Ocorreu um erro.\nPor favor, tente novamente mais tarde.';
    } else {
        var msg001 = 'An error occurred.\nPlease try again later.';
    }
    showAlert(msg001,'Error');
}

function showAlert(message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}

function informacion() {
	var txt =  "Size: " + screen.width + " x " + screen.height + "\n";
	    txt += "Hardware: " + device.model + "\n";
	    txt += "O.System: " + device.platform + " " + device.version + "\n";
	    txt += "App version: " + localStorage.version;
	showAlert(txt,'Information');
}

function cambiar_idioma(idioma)
{
	localStorage.idioma = idioma;
	if (idioma == "es") {
		self.location.href="index.es.html";
	} else if (idioma == "pt") {
		self.location.href="index.pt.html";
	} else {
		self.location.href="index.en.html";
	}
}

function user_ini () {
	var user = localStorage.usuario;

	var tit = document.getElementById('usuario');
	tit.childNodes[0].nodeValue = user;

	new_span();
}

function menu_dina(opcion){
	var idiom = localStorage.idioma;
    menu_ini = ['inde','send','cont','shar'];
    menu_txt = ['index','sendorder','contact','share'];
    if (idiom == 'es'){
        menu_des = ['Menu Principal','Enviar Orden','Contactenos','Compartir'];
    } else if (idiom == 'pt'){
    	menu_des = ['Menu Principal','Enviar Ordem','Contatenos','Compartilhe'];
    } else {
		menu_des = ['Main Menu','Send Order','Contact Us','Share It'];
    }

    var ul = document.createElement('ul');
    ul.setAttribute('id','menu_dina');
    document.getElementById('clear').appendChild(ul);

    menu_ini.forEach(dinamico);
    function dinamico(element, index) {
        if (opcion !== element){
	        var li = document.createElement('li');
	        ul.appendChild(li);
	        var a = document.createElement('a');
	        a.setAttribute('href',"javascript:selector('"+element+"');");
	        var t = document.createTextNode(menu_des[index]);
	        li.appendChild(a);
	        a.appendChild(t);
        }
    }
}

function signout(){
	localStorage.usuario = "";
	self.location.href="index.html";
}

//===================================================================

function new_span(){

	var noti = 0;

	if(noti >= 1){
		var docu = document.getElementById('Noticias');
		var span = document.createElement('span');
	    var tttt = document.createTextNode(noti);
	    span.appendChild(tttt);
		docu.appendChild(span);
	}

	var docs = 0;

	if(docs >= 1){
		var docu = document.getElementById('Documentos');
		var span = document.createElement('span');
	    var tttt = document.createTextNode(docs);
	    span.appendChild(tttt);
		docu.appendChild(span);
	}
}

//===================================================================

function noti_mail(){
	var idioma = localStorage.idioma;
	if (idioma == 'es'){
		var msg001 = [
			 	      'Si tiene alguna sugerencia para mejorar esta aplicación, por favor enviarnos un correo.',
				      'Retroalimentación',
				      'Enviar Correo',
				      'Cancelar'
				     ];
    } else if (idioma == 'pt'){
    	var msg001 = [
    		          'Se você tiver sugestões para melhorar este app, por favor envie-nos um e-mail.',
    		          'Realimentação',
    		          'Enviar E-mail',
    		          'Cancelar'
    		         ];
    } else {
        var msg001 = [
                      'If you have any suggestions to improve this app, please send us an email.',
                      'Feedback',
                      'Send Email',
                      'Cancel'
                     ];
    }

    navigator.notification.confirm(
        msg001[0],     			// message
        noti_mail_f,            // callback
        msg001[1],      		// title
        [msg001[2],msg001[3]]  	// buttonName
    );
}

function noti_mail_f (buttonIndex) {
    if(buttonIndex == 1){
		var idioma = localStorage.idioma;

		if (idioma == 'es'){
			var msg002 = [
					      'Retroalimentación',
					      'Por favor inserte su comentario aquí...'
					     ];
	    } else if (idioma == 'pt'){
	    	var msg002 = [
	    		          'Realimentação',
	    		          'Por favor insira o seu comentário aqui...'
	    		         ];
	    } else {
	        var msg002 = [
	                      'Feedback',
	                      'Please insert your comment here...'
	                     ];
	    }

	    msg002[1] += "\n";
	    msg002[1] += "\n";
	    msg002[1] += "\n";
	    msg002[1] += "\n";
	    msg002[1] += "\n";
	    msg002[1] += "_________________________\n";
	    msg002[1] += "Hardware: " + device.model + "\n";
	    msg002[1] += "Operating System: " + device.platform + " " + device.version + "\n";
	    msg002[1] += "App version: " + localStorage.version;

	  	// 'Device Cordova: ' + device.cordova + '<br />' + 
	  	// 'Device UUID: '    + device.uuid    + '<br />' + 

	    var link = "mailto:info@wai-news.com?"
	             + "cc=" + localStorage.email
	             + "&subject=" + encodeURI(msg002[0])
	             + "&body=" + encodeURI(msg002[1]);
	    window.location.href = link;
	}
} 

//===================================================================

function closeApp(){
	var idioma = localStorage.idioma;
	if (idioma == 'es'){
		var msg001 = [
				      '¿Quiere cerrar la aplicación?',
			 	      'Cerrar aplicación',
				      'Sí',
				      'Cancelar'
				     ];
    } else if (idioma == 'pt'){
    	var msg001 = [
    		          'Você quer fechar o aplicativo?',
    		          'Fechar a aplicação',
    		          'Sim',
    		          'Cancelar'
    		         ];
    } else {
        var msg001 = [
                      'Do you want to close the application?',
                      'Close application',
                      'Yes',
                      'Cancel'
                     ];
    }

	navigator.notification.confirm(
        msg001[0],  			// message
        exitFromApp,            // callback to invoke with index of button pressed
        msg001[1],            	// title
        [msg001[2],msg001[3]]  	// buttonLabels
    );
}

function exitFromApp(buttonIndex){
	if (buttonIndex==1){
       navigator.app.exitApp();
    }
}

//===================================================================

function checkConnection() {
    var estado = "si";
	var networkState = navigator.connection.type;
	if(networkState==Connection.NONE){
		estado = "no";
	}else if(networkState==Connection.UNKNOWN){
		estado = "no";
	}
	return(estado);
}

//===================================================================

function selector(rutina){
	var idioma = localStorage.idioma;

	if(checkConnection()=="no"){
		onOffline();
	}else if(idioma == 'en'){
		if(rutina=='inde'){
			self.location.href="index.en.html";
    	}else if(rutina=="inic"){
			self.location.href="inicio.en.html";
		}else if(rutina=="news"){
			var ref = window.open('http://www.wai-news.com/news-en.html', '_blank', 'EnableViewPortScale=yes, location=no, menubar=no, status=no, titlebar=no, toolbar=no');
			ref.addEventListener("loaderror", onOffline, false);
		}else if(rutina=="web"){
        	var ref = window.open('http://www.wai-news.com', '_blank','location=yes');
		    ref.addEventListener("loaderror", onOffline, false);
    	}else if(rutina=="docu"){
        	var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=category&layout=blog&id=89&Itemid=2121', '_blank', 'EnableViewPortScale=yes, location=no, menubar=no, status=no, titlebar=no, toolbar=no');
	     	ref.addEventListener("loaderror", onOffline, false);
    	}else if(rutina=="send"){
			self.location.href="sendorder.en.html";
    	}else if(rutina=="cont"){
			self.location.href="contact.en.html";
    	}else if(rutina=="shar"){
			self.location.href="share.en.html";
    	}else if(rutina=="newp"){
	        var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=category&layout=blog&id=88&Itemid=435', '_blank', 'EnableViewPortScale=yes');
		    ref.addEventListener("loaderror", onOffline, false);	
    	}else if(rutina=="pri"){
	        var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=article&id=190&Itemid=435', '_blank', 'EnableViewPortScale=yes');
		    ref.addEventListener("loaderror", onOffline, false);	
    	}else if(rutina=="regi"){
			self.location.href="registro.en.html";
		}
    }else if(idioma == 'es'){
		if(rutina=='inde'){
			self.location.href="index.es.html";
    	}else if(rutina=="inic"){
			self.location.href="inicio.es.html";
		}else if(rutina=="news"){
			var ref = window.open('http://www.wai-news.com/news-en.html', '_blank', 'EnableViewPortScale=yes, location=no, menubar=no, status=no, titlebar=no, toolbar=no');
			ref.addEventListener("loaderror", onOffline, false);
		}else if(rutina=="web"){
        	var ref = window.open('http://www.wai-news.com', '_blank','location=yes');
		    ref.addEventListener("loaderror", onOffline, false);
    	}else if(rutina=="docu"){
        	var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=category&layout=blog&id=89&Itemid=2121', '_blank', 'EnableViewPortScale=yes, location=no, menubar=no, status=no, titlebar=no, toolbar=no');
	     	ref.addEventListener("loaderror", onOffline, false);
    	}else if(rutina=="send"){
			self.location.href="sendorder.es.html";
    	}else if(rutina=="cont"){
			self.location.href="contact.es.html";
    	}else if(rutina=="shar"){
			self.location.href="share.es.html";
    	}else if(rutina=="newp"){
	        var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=category&layout=blog&id=88&Itemid=435', '_blank', 'EnableViewPortScale=yes');
		    ref.addEventListener("loaderror", onOffline, false);	
    	}else if(rutina=="pri"){
	        var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=article&id=190&Itemid=435', '_blank', 'EnableViewPortScale=yes');
		    ref.addEventListener("loaderror", onOffline, false);	
    	}else if(rutina=="regi"){
			self.location.href="registro.es.html";
		}
    }else if(idioma == 'pt'){
		if(rutina=='inde'){
			self.location.href="index.pt.html";
    	}else if(rutina=="inic"){
			self.location.href="inicio.pt.html";
		}else if(rutina=="news"){
			var ref = window.open('http://www.wai-news.com/news-en.html', '_blank', 'EnableViewPortScale=yes, location=no, menubar=no, status=no, titlebar=no, toolbar=no');
			ref.addEventListener("loaderror", onOffline, false);
		}else if(rutina=="web"){
        	var ref = window.open('http://www.wai-news.com', '_blank','location=yes');
		    ref.addEventListener("loaderror", onOffline, false);
    	}else if(rutina=="docu"){
        	var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=category&layout=blog&id=89&Itemid=2121', '_blank', 'EnableViewPortScale=yes, location=no, menubar=no, status=no, titlebar=no, toolbar=no');
	     	ref.addEventListener("loaderror", onOffline, false);
    	}else if(rutina=="send"){
			self.location.href="sendorder.pt.html";
    	}else if(rutina=="cont"){
			self.location.href="contact.pt.html";
    	}else if(rutina=="shar"){
			self.location.href="share.pt.html";
    	}else if(rutina=="newp"){
	        var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=category&layout=blog&id=88&Itemid=435', '_blank', 'EnableViewPortScale=yes');
		    ref.addEventListener("loaderror", onOffline, false);	
    	}else if(rutina=="pri"){
	        var ref = window.open('http://www.wai-news.com/index.php?option=com_content&view=article&id=190&Itemid=435', '_blank', 'EnableViewPortScale=yes');
		    ref.addEventListener("loaderror", onOffline, false);	
    	}else if(rutina=="regi"){
			self.location.href="registro.pt.html";
		}
    }
}
