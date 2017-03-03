/*
	MODOS_DE_JUEGO
	TRUCOS
	CAMBIOS_DE_FONDO
	AÑADIR_OTRAS_DOS_TECLAS_PARA_MOVER_BARRA
	BOTONES_DE_MOVIMIENTO_PARA_DISPOSITIVOS_TACTILES
	COOKIES
*/
window.onload=function(){

	anchoPantalla=600; /*Por favor que sea siempre par!!*/ /*Minimo=300*/
	altoPantalla=500;	 /*Minimo=400*/

	anchuraPelota=25;
	alturaPelota=24;

	anchoBarra=70; /*Divisible entre 5 por favor*/
	altoBarra=15;

	maxXBarra=(anchoPantalla-anchoBarra-5);
	minXBarra=5;

	posXPelotaOriginal=(anchoPantalla/2) - (anchuraPelota/2);
	posYPelotaOriginal=(altoPantalla-33-alturaPelota); /**/

	maxXPelota=anchoPantalla-anchuraPelota;
	minXPelota=0;

	maxYPelota=altoPantalla-30-alturaPelota;
	minYPelota=0;

	posXOriginalBarra=((anchoPantalla/2)-(anchoBarra/2)-5);

	pre=0;
	a=0;
	p=0;
	s=0;
	bonus=1;
	level=0;
	ptos=0;
	num_vidas=3;
	numLadrillos=80;
	destroyed=0;

	ladrillito=new Array();
	resistencia=new Array();
	resistenciaBackUp=new Array();

	divPantalla=document.getElementById("pantalla");
	divPantalla.style.width=anchoPantalla+"px";
	divPantalla.style.height=altoPantalla+"px";

	life=document.getElementById("vidas");
	life.style.top=5+"px";
	life.style.left=(anchoPantalla-50)+"px";

	patilloid=document.getElementById("logo");
	patilloid.style.width=(anchoPantalla-50)+"px";
	patilloid.style.top=0+"px";
	patilloid.style.left=0+"px";

	gameOverLogo=document.getElementById("gameOverImg");
	gameOverLogo.style.width=anchoPantalla+"px";
	gameOverLogo.style.height=altoPantalla+"px";
	gameOverLogo.style.top=0+"px";
	gameOverLogo.style.left=0+"px";

	divBotones=document.getElementById("botones");
	divBotones.style.top=(altoPantalla+50)+"px";

	facil=document.getElementById("seleccion_dificultad_facil");

	media=document.getElementById("seleccion_dificultad_media");

	dificil=document.getElementById("seleccion_dificultad_dificil");

	xVidas=document.getElementById("nVidas");

	n=document.getElementById("num_nivel");

	divScore=document.getElementById("num_puntos");

	bot_ins=document.getElementById("boton_instrucciones");
	bot_start=document.getElementById("boton_restart");
	bot_stop=document.getElementById("boton_stop");
	bot_pause=document.getElementById("boton_pause");

	divInformacion=document.getElementById("informacion");
	divInformacion.style.left=(anchoPantalla+180)+"px";

	divInstrucciones=document.getElementById("instrucciones");
	divInstrucciones.style.left=(anchoPantalla+180)+"px";
	divInstrucciones.style.top=((altoPantalla/2) + 45)+"px";

	pelota=document.getElementById("ball");
	pelota.style.width=anchuraPelota+"px";
	pelota.style.height=alturaPelota+"px";

	barra=document.getElementById("barraArka");
	barra.style.width=anchoBarra+"px";
	barra.style.height=altoBarra+"px";

	ban=document.createElement("img");
	ban.src="static/images/bonusStage.png";

	document.onkeydown=manejaEventos;
	document.onmousemove = moverRaton;

	colocaObjetos();

	boton("boton_stop",true);
	boton("boton_pause",true);

	pintaBotones();

	Nifty("div#puntuacion","small");
	Nifty("div#score","small");
	Nifty("div#nivel","small");
	Nifty("div#aux_nivel","small");
	Nifty("div#instrucciones","small");
	Nifty("div#aux_instrucciones","small");
}

function jugar(){

	borraNivel();

	pintarNivel();

	if(facil.checked==true){

		inter=setInterval("muevePelota()", 15 );
	}
	else if(media.checked==true){

		inter=setInterval("muevePelota()", 10 );
	}
	else{

		inter=setInterval("muevePelota()", 5 );
	}
}

function asignaPuntos(){

	if(facil.checked==true){

		ptos+=100;
	}
	else if(media.checked==true){

		ptos+=200;
	}
	else{

		ptos+=300;
	}

	pintaPuntos();
}

function pintaPuntos(){

	borraPuntos();

	divScore.appendChild(document.createTextNode(ptos));
}

function borraPuntos(){

	while(divScore.hasChildNodes()){

		divScore.removeChild(divScore.lastChild);
	}
}

function pintaLadrillos(){

	if(level==0){

  		for (i=0;i<numLadrillos;i++){

   		ladrillito[i]=document.createElement("img");
   		divPantalla.appendChild(ladrillito[i]);

   		ladrillito[i].src="static/images/orangeBrick.jpg";
   		resistencia[i]=1;
		resistenciaBackUp[i]=resistencia[i];

   		ladrillito[i].style.width=parseInt(anchoPantalla/15)+"px";
   		ladrillito[i].style.height=parseInt((altoPantalla*(0.3))/8)+"px";

   		ladrillito[i].style.position="absolute";

   		ladrillito.id="ladrillo"+i;

   		ladrillito[i].style.top=parseInt(parseInt(ladrillito[i].style.height)*(parseInt(i/10))+parseInt(3*parseInt(ladrillito[i].style.height)))+"px";
   		ladrillito[i].style.left=(parseInt((anchoPantalla/15)*(i%10))+parseInt(2.5*parseInt(ladrillito[i].style.width)))+"px";

   		ladrillito[i].style.visibility="visible";
   	}

   	pelota.src="static/images/sun_25x26.gif";
   }

   if(level==1){

  		for (i=0;i<numLadrillos;i++){

   		ladrillito[i]=document.createElement("img");

   		if(i%10==0 || ((i+1)%10==0) || (i+1)>=((numLadrillos/10)-1)*(numLadrillos/(numLadrillos/10))){

   			ladrillito[i].src="static/images/magentaBrick.jpg";
   			resistencia[i]=2;
			resistenciaBackUp[i]=resistencia[i];
   		}
   		else{

				ladrillito[i].src="static/images/orangeBrick.jpg";
				resistencia[i]=1;
				resistenciaBackUp[i]=resistencia[i];
   		}

   		divPantalla.appendChild(ladrillito[i]);

   		ladrillito[i].style.width=parseInt(anchoPantalla/15)+"px";
   		ladrillito[i].style.height=parseInt((altoPantalla*(0.3))/8)+"px";

   		ladrillito[i].style.position="absolute";

   		ladrillito.id="ladrillo"+i;

   		ladrillito[i].style.top=parseInt(parseInt(ladrillito[i].style.height)*(parseInt(i/10))+parseInt(3*parseInt(ladrillito[i].style.height)))+"px";
   		ladrillito[i].style.left=(parseInt((anchoPantalla/15)*(i%10))+parseInt(2.5*parseInt(ladrillito[i].style.width)))+"px";

   		ladrillito[i].style.visibility="visible";
   	}


    pelota.src="static/images/tierra_25x24.gif";
   }

   if(level==2){

  		for (i=0;i<numLadrillos;i++){

   		ladrillito[i]=document.createElement("img");

   		if((i%10==0 || ((i+1)%10==0)) && (i!=0 && i!=9 && i!=(numLadrillos-1) && i!=(numLadrillos-10))){

   			ladrillito[i].src="static/images/magentaBrick.jpg";
   			resistencia[i]=2;
			resistenciaBackUp[i]=resistencia[i];
   		}
   		else if((i+1)>=((numLadrillos/10)-1)*(numLadrillos/(numLadrillos/10)) || (i>=0 && i<10)){

				ladrillito[i].src="static/images/redBrick.jpg";
   			resistencia[i]=3;
			resistenciaBackUp[i]=resistencia[i];
   		}
   		else{

				ladrillito[i].src="static/images/orangeBrick.jpg";
				resistencia[i]=1;
				resistenciaBackUp[i]=resistencia[i];
   		}


   		divPantalla.appendChild(ladrillito[i]);

   		ladrillito[i].style.width=parseInt(anchoPantalla/15)+"px";
   		ladrillito[i].style.height=parseInt((altoPantalla*(0.3))/8)+"px";

   		ladrillito[i].style.position="absolute";

   		ladrillito.id="ladrillo"+i;

   		ladrillito[i].style.top=parseInt(parseInt(ladrillito[i].style.height)*(parseInt(i/10))+parseInt(3*parseInt(ladrillito[i].style.height)))+"px";
   		ladrillito[i].style.left=(parseInt((anchoPantalla/15)*(i%10))+parseInt(2.5*parseInt(ladrillito[i].style.width)))+"px";

   		ladrillito[i].style.visibility="visible";
   	}

   	pelota.src="static/images/sun_25x26.gif";
   }

   if(level==3){

		if(bonus==1){
			bonusBanner();
		}
		else{

			pintaBonusStage();
   	}
   }
}

function bonusBanner(){

	bonus=0;

	divPantalla.style.backgroundImage="url('../images/blackBackground.jpg')";

	ban.style.position="absolute";
	ban.style.width=parseInt(anchoPantalla-50)+"px";
	ban.style.top=0+"px";
	ban.style.left=((anchoPantalla-parseInt(ban.style.width))/2)+"px";
	ban.style.visibility="visible";

	divPantalla.appendChild(ban);

	var t=setTimeout("pintaLadrillos();",2000);
}

function pintaBonusStage(){

	ban.style.visibility="hidden";

	divPantalla.style.backgroundImage="url('../images/blackBackground.png')";

	for (i=0;i<numLadrillos;i++){

		ladrillito[i]=document.createElement("img");
		divPantalla.appendChild(ladrillito[i]);

		ladrillito[i].src="static/images/orangeBrick.jpg";
		resistencia[i]=1;
		resistenciaBackUp[i]=resistencia[i];

		ladrillito[i].style.width=parseInt(anchoPantalla/15)+"px";
		ladrillito[i].style.height=parseInt((altoPantalla*(0.3))/8)+"px";

		ladrillito[i].style.position="absolute";

		ladrillito.id="ladrillo"+i;

		ladrillito[i].style.top=parseInt(parseInt(ladrillito[i].style.height)*(parseInt(i/10))+parseInt(3*parseInt(ladrillito[i].style.height)))+"px";
		ladrillito[i].style.left=(parseInt((anchoPantalla/15)*(i%10))+parseInt(2.5*parseInt(ladrillito[i].style.width)))+"px";

		ladrillito[i].style.visibility="visible";
	}
}

function compruebaReboteLadrillos(){

	for (i=0;i<numLadrillos;i++){

		if(((ladrillito[i].style.visibility=="visible") && /*rebote esquina inferior derecha*/
			(pos_abcisas<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			((pos_abcisas+anchuraPelota)>=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			(pos_ordenadas)>=parseInt(ladrillito[i].style.top) &&
			/*(pos_ordenadas+(alturaPelota/2))<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height)) &&*/
			/*(((pos_abcisas)<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) && */
			((pos_abcisas+(anchuraPelota/2))>=(parseInt(ladrillito[i].style.left))) &&
			(pos_ordenadas)<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height) &&
			(pos_ordenadas+(alturaPelota/2))>=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height))
		){

			if(sentido_abcisas<0 && sentido_ordenadas<0){

				sentido_abcisas*=-1;
				sentido_ordenadas*=-1;
			}
			else if(sentido_abcisas<0 && sentido_ordenadas>0){

				sentido_abcisas*=-1;
			}
			else if(sentido_abcisas>0 && sentido_ordenadas<0){

				sentido_ordenadas*=-1;
			}

			resistencia[i]-=1;

			if(resistencia[i]==0){

				ladrillito[i].style.visibility="hidden";
				destroyed+=1;
			}

			pos_abcisas+=3;
			pos_ordenadas+=3;

			asignaPuntos();

			break;
		}

		else if(((ladrillito[i].style.visibility=="visible") && /*rebote esquina superior derecha*/
			/*(pos_abcisas<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) && */
			((pos_abcisas+anchuraPelota)>=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			(pos_ordenadas)>=parseInt(ladrillito[i].style.top) &&
			(pos_ordenadas+(alturaPelota))<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height)) &&
			(/*((pos_abcisas+(anchuraPelota/2))<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) && */
			((pos_abcisas)>=(parseInt(ladrillito[i].style.left))) &&
			/*(pos_ordenadas)<=parseInt(ladrillito[i].style.top) &&  */
			(pos_ordenadas+(alturaPelota))>=parseInt(ladrillito[i].style.top))

		){

			if(sentido_abcisas<0 && sentido_ordenadas<0){

				sentido_abcisas*=-1;
			}
			else if(sentido_abcisas<0 && sentido_ordenadas>0){

				sentido_abcisas*=-1;
				sentido_ordenadas*=-1;
			}
			else if(sentido_abcisas>0 && sentido_ordenadas>0){

				sentido_ordenadas*=-1;
			}

			resistencia[i]-=1;

			if(resistencia[i]==0){

				ladrillito[i].style.visibility="hidden";
				destroyed+=1;
			}

			pos_abcisas+=3;
			pos_ordenadas-=3;

			asignaPuntos();

			break;
		}

		else if(
			((ladrillito[i].style.visibility=="visible") && /*rebote esquina inferior izquierda*/
			 (pos_abcisas)<=(parseInt(ladrillito[i].style.left)) &&
			 ((pos_abcisas+anchuraPelota)>=(parseInt(ladrillito[i].style.left))) &&
			 (pos_ordenadas)>=parseInt(ladrillito[i].style.top) &&
			 (pos_ordenadas+(alturaPelota))<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height)) &&
			(((pos_abcisas+(anchuraPelota))<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			/*((pos_abcisas+(anchuraPelota/2))>=(parseInt(ladrillito[i].style.left))) && */
			 ((pos_ordenadas)<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height))
			/*(pos_ordenadas+(alturaPelota/2))>=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height) */
			)
		){
			if(sentido_abcisas>0 && sentido_ordenadas<0){

				sentido_abcisas*=-1;
				sentido_ordenadas*=-1;
			}
			else if(sentido_abcisas>0 && sentido_ordenadas>0){

				sentido_abcisas*=-1;
			}
			else if(sentido_abcisas<0 && sentido_ordenadas<0){

				sentido_ordenadas*=-1;
			}

			resistencia[i]-=1;

			if(resistencia[i]==0){

				ladrillito[i].style.visibility="hidden";
				destroyed+=1;
			}

			pos_abcisas-=3;
			pos_ordenadas+=3;

			asignaPuntos();

			break;
		}

		else if(((ladrillito[i].style.visibility=="visible") && /*rebote esquina superior izquierda*/
			(pos_abcisas<=(parseInt(ladrillito[i].style.left))) &&
			((pos_abcisas+anchuraPelota)>=(parseInt(ladrillito[i].style.left))) &&
			/*(pos_ordenadas)>=parseInt(ladrillito[i].style.top) &&  */
			(pos_ordenadas+(alturaPelota))<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height)) &&
			(((pos_abcisas+(anchuraPelota))<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			/*((pos_abcisas+(anchuraPelota/2))>=(parseInt(ladrillito[i].style.left))) &&*/
			(pos_ordenadas)<=parseInt(ladrillito[i].style.top) &&
			(pos_ordenadas+(alturaPelota))>=parseInt(ladrillito[i].style.top) )

		){
			if(sentido_abcisas>0 && sentido_ordenadas<0){

				sentido_abcisas*=-1;
			}
			else if(sentido_abcisas>0 && sentido_ordenadas>0){

				sentido_ordenadas*=-1;
				sentido_abcisas*=-1;
			}
			else if(sentido_abcisas<0 && sentido_ordenadas>0){

				sentido_ordenadas*=-1;
			}

			resistencia[i]-=1;

			if(resistencia[i]==0){

				ladrillito[i].style.visibility="hidden";
				destroyed+=1;
			}

			pos_abcisas-=3;
			pos_ordenadas-=3;

			asignaPuntos();

			break;
		}

		else if((ladrillito[i].style.visibility=="visible") && /*rebote por la derecha del ladrillo*/
			(pos_abcisas<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			((pos_abcisas+anchuraPelota)>=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			(pos_ordenadas+(alturaPelota/2))>=parseInt(ladrillito[i].style.top) &&
			(pos_ordenadas+(alturaPelota/2))<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height)
		){
				sentido_abcisas*=-1;

				resistencia[i]-=1;

				if(resistencia[i]==0){


					ladrillito[i].style.visibility="hidden";
					destroyed+=1;
				}

				pos_abcisas+=3;

				asignaPuntos();

				break;

		}

		else if((ladrillito[i].style.visibility=="visible") && /*rebote por la izquierda del ladrillo*/
			(pos_abcisas<=(parseInt(ladrillito[i].style.left))) &&
			((pos_abcisas+anchuraPelota)>=(parseInt(ladrillito[i].style.left))) &&
			(pos_ordenadas+(alturaPelota/2))>=parseInt(ladrillito[i].style.top) &&
			(pos_ordenadas+(alturaPelota/2))<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height)
		){
				sentido_abcisas*=-1;

				resistencia[i]-=1;

				if(resistencia[i]==0){

					ladrillito[i].style.visibility="hidden";
					destroyed+=1;
				}

				pos_abcisas-=3;

				asignaPuntos();

				break;

		}

		else if((ladrillito[i].style.visibility=="visible") && /*rebote por encima del ladrillo*/
			((pos_abcisas+(anchuraPelota/2))<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			((pos_abcisas+(anchuraPelota/2))>=(parseInt(ladrillito[i].style.left))) &&
			(pos_ordenadas)<=parseInt(ladrillito[i].style.top) &&
			(pos_ordenadas+(alturaPelota))>=parseInt(ladrillito[i].style.top)
		){
				sentido_ordenadas*=-1;

				resistencia[i]-=1;

				if(resistencia[i]==0){

					ladrillito[i].style.visibility="hidden";
					destroyed+=1;
				}

				pos_ordenadas-=3;

				asignaPuntos();

				break;

		}

		else if((ladrillito[i].style.visibility=="visible") && /*rebote por debajo del ladrillo*/
			((pos_abcisas+(anchuraPelota/2))<=(parseInt(ladrillito[i].style.left)+parseInt(ladrillito[i].style.width))) &&
			((pos_abcisas+(anchuraPelota/2))>=(parseInt(ladrillito[i].style.left))) &&
			(pos_ordenadas)<=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height) &&
			(pos_ordenadas+(alturaPelota/2))>=parseInt(ladrillito[i].style.top)+parseInt(ladrillito[i].style.height)
		){
				sentido_ordenadas*=-1;

				resistencia[i]-=1;

				if(resistencia[i]==0){

					ladrillito[i].style.visibility="hidden";
					destroyed+=1;
				}

				pos_ordenadas+=3;

				asignaPuntos();

				break;

		}

		if(destroyed==numLadrillos){

			siguienteNivel();
		}
	}

}

function siguienteNivel(){

	inter=window.clearInterval(inter);

	nextLevel=level+1;

	level=nextLevel;

	destroyed=0;

	num_vidas+=1;

	boton("boton_restart",false);
	boton("boton_stop",true);
	boton("boton_pause",true);

	pintaNextLevel(level);

	pintaBotones();

	pintaLadrillos();

	borraNivel();

	pintarNivel();
}

function pintaNextLevel(lev){

	switch(lev){

		case 0:

			divPantalla.style.backgroundImage="url('static/images/space/caos_696x600.jpg')";
			break;

		case 1:

			divPantalla.style.backgroundImage="url('static/images/space/sun_600x545.jpg')";
			break;

		case 2:

			divPantalla.style.backgroundImage="url('static/images/space/massive_800x574.jpg')";
			break;

	}
}

function muevePelota(){

	if(pos_abcisas >=maxXPelota || pos_abcisas<=minXPelota){

		if((pos_ordenadas>=maxYPelota && compruebaRebote()) || pos_ordenadas<=minYPelota){

			sentido_abcisas*=-1;
			sentido_ordenadas*=-1;
		}

		else{

			sentido_abcisas*=-1;
		}
	}

	else if(pos_ordenadas>=maxYPelota && compruebaRebote()){

		/*calculaDireccion();*/
		calculaTrayectoria();
	}

	else if(pos_ordenadas<=minYPelota){

		sentido_ordenadas*=-1;
	}

	else{

		if(pos_ordenadas>maxYPelota+parseInt(alturaPelota/2)){

			num_vidas-=1;

			if(num_vidas==0){

				stopGame();
			}
			else{

				borraVidas();
				pintaVidas();
				turnOff();
			}
		}
	}

	if(sentido_abcisas==-1){

		if(sentido_ordenadas==-1){

			mueveIzquierdaArriba();
		}
		else{

			mueveIzquierdaAbajo();
		}
	}
	else{

		if(sentido_ordenadas==-1){

			mueveDerechaArriba();
		}
		else{

			mueveDerechaAbajo();
		}
	}

	compruebaReboteLadrillos();
}

function calculaTrayectoria(){

	if(pos_abcisas+(parseInt(anchuraPelota/2))<posXBarra+parseInt(anchoBarra/5)){

		sentido_abcisas=-3;
		sentido_ordenadas=-1;

	}

	else if(pos_abcisas+(parseInt(anchuraPelota/2))<posXBarra+parseInt(2*(anchoBarra/5))){

		sentido_abcisas=-2;
		sentido_ordenadas=-2;
	}

	else if(pos_abcisas+(parseInt(anchuraPelota/2))<posXBarra+parseInt(3*(anchoBarra/5))){

		if(sentido_abcisas<0){

			sentido_abcisas=-1;
			sentido_ordenadas=-3;
		}
		else{

			sentido_abcisas=1;
			sentido_ordenadas=-3;
		}
	}

	else if(pos_abcisas+(parseInt(anchuraPelota/2))<posXBarra+parseInt(4*(anchoBarra/5))){

			sentido_abcisas=2;
			sentido_ordenadas=-2;
	}

	else{

			sentido_abcisas=3;
			sentido_ordenadas=-1;
	}
}

function asignaSubida(){

	if(dificil.checked==true){
		return 3;
	}
	else if(media.checked==true){

		return 2;
	}
	else{

		return 1;
	}
}


function compruebaRebote(){

	if(pos_abcisas+(anchuraPelota/2)>=posXBarra && pos_abcisas<=posXBarra+anchoBarra){

		return true;
	}
	else{

		return false;
	}
}

function mueveDerechaArriba(){

	/*pos_abcisas+=asignaSubida();
	pos_ordenadas-=asignaSubida();*/

	pos_abcisas+=sentido_abcisas;
	pos_ordenadas+=sentido_ordenadas;

	pelota.style.left=(pos_abcisas)+"px";
	pelota.style.top=(pos_ordenadas)+"px";
}

function mueveDerechaAbajo(){

	/*pos_abcisas+=asignaSubida();
	pos_ordenadas+=asignaSubida();*/

	pos_abcisas+=sentido_abcisas;
	pos_ordenadas+=sentido_ordenadas;

	pelota.style.left=(pos_abcisas)+"px";
	pelota.style.top=(pos_ordenadas)+"px";
}

function mueveIzquierdaArriba(){

	/*pos_abcisas-=asignaSubida();
	pos_ordenadas-=asignaSubida();*/

	pos_abcisas+=sentido_abcisas;
	pos_ordenadas+=sentido_ordenadas;

	pelota.style.left=(pos_abcisas)+"px";
	pelota.style.top=(pos_ordenadas)+"px";
}

function mueveIzquierdaAbajo(){

	/*pos_abcisas-=asignaSubida();
	pos_ordenadas+=asignaSubida();*/

	pos_abcisas+=sentido_abcisas;
	pos_ordenadas+=sentido_ordenadas;

	pelota.style.left=(pos_abcisas)+"px";
	pelota.style.top=(pos_ordenadas)+"px";
}

function manejaEventos(elEvento){

	var evento = window.event || elEvento;

	var codigoTecla=evento.keyCode;


	if(codigoTecla==37 || codigoTecla==90){ /*Pulsar flecha IZQDA*/

		if(!(posXBarra<=minXBarra)){
			posXBarra-=10;
			barra.style.left=posXBarra+"px";
		}
	}
	if(codigoTecla==39 || codigoTecla==88){ /*Pulsar flecha DCHA*/

		if(!(posXBarra>=maxXBarra)){
			posXBarra+=10;
			barra.style.left=posXBarra+"px";
		}
	}
	if(codigoTecla==32){ /*Pulsar ESPACIO*/

		if(!document.getElementById("boton_pause").disabled){

			pause();
		}

	}
	if(codigoTecla==13){ /*Pulsar ENTER*/

		if(pre==0){

			preStart();

			pre=1;
		}
		else if(s==1){

			gameOverLogo.style.visibility="hidden";

			divPantalla.style.backgroundImage="url('static/images/fondo_espacio_600x753.jpg')";

			s=0;

			level=0;
			pintaLadrillos();
			/*if(level==0){

				for(i=0; i< numLadrillos; i++){

				ladrillito[i].style.visibility="visible";
				resistencia[i]=resistenciaBackUp[i];
				}
			}
			else{
				level=0;
				pintaLadrillos();
			}*/
		}
		else{
			if(!document.getElementById("boton_restart").disabled){

				restart();

			}
		}

		pintaNextLevel(level);
	}

	if(codigoTecla==83){ /*Pulsar 's'*/

		if(!document.getElementById("boton_stop").disabled){

			stopGame();
		}
	}
	if(codigoTecla==73){ /*Pulsar 'i'*/

		ayuda();
	}
}

function moverRaton(elEvento){

	var evento = elEvento || window.event;

	punteroX=evento.clientX-100-(anchoBarra/2);
	punteroY=evento.clientY;


	if(!p){
		if(punteroX < 0){

			punteroX=0;
		}

		else if(punteroX>anchoPantalla-anchoBarra){

			punteroX=anchoPantalla-anchoBarra;
		}

		posXBarra=punteroX;
		barra.style.left=posXBarra+"px";
	}
}

function borraNivel(){

	while(n.hasChildNodes()){

		n.removeChild(n.lastChild);
	}
}

function pintarNivel(){

	n.appendChild(document.createTextNode(level+1));
}

function stopGame(){

		num_vidas=0;

		destroyed=0;

		gameOverLogo.style.visibility="visible";

		borraVidas();

		turnOff();

		s=1;

		for(i=0; i< numLadrillos; i++){

			ladrillito[i].style.visibility="hidden";
		}
}

function turnOff(){

	inter=window.clearInterval(inter);

	boton("boton_restart",false);
	boton("boton_stop",true);
	boton("boton_pause",true);

	pintaBotones();

	borraNivel();

	colocaObjetos();

	abrirRadios();

	if(num_vidas==0){

		borraPuntos();
	}
}

function pause(){

	if(!p){

		inter=window.clearInterval(inter);

		p=1
	}
	else{

		jugar();

		p=0;
	}
}

function boton(nombre, estado){

	document.getElementById(nombre).disabled=estado;
}

function cerrarRadios(){

	if(facil.checked==true){

		boton("seleccion_dificultad_media", true);
		boton("seleccion_dificultad_dificil", true);
	}
	else if(media.checked==true){

		boton("seleccion_dificultad_facil", true);
		boton("seleccion_dificultad_dificil", true);
	}
	else{

		boton("seleccion_dificultad_facil", true);
		boton("seleccion_dificultad_media", true);
	}
}

function abrirRadios(){

	boton("seleccion_dificultad_facil", false);
	boton("seleccion_dificultad_media", false);
	boton("seleccion_dificultad_dificil", false);
}

function ayuda(){

	if(a){

		cerrarAyuda();
	}
	else{

		mostrarAyuda()
	}
}

function mostrarAyuda(){

	var elem=document.getElementById("instrucciones");
	elem.style.visibility="visible";
	a=1;
}

function cerrarAyuda(){

	var elem=document.getElementById("instrucciones");
	elem.style.visibility="hidden";
	a=0;
}

function pintaBotones(){

	if(bot_start.disabled==false){

		/*bot_start.style.color="black";*/
		bot_start.style.visibility="visible";
	}
	else{
		/*bot_start.style.color="gray";*/
		bot_start.style.visibility="hidden";
	}

	if(bot_stop.disabled!=true){

		/*bot_stop.style.color="black";*/
		bot_stop.style.visibility="visible";
	}
	else{
		/*bot_stop.style.color="gray";*/
		bot_stop.style.visibility="hidden";
	}

	if(bot_pause.disabled!=true){

		/*bot_pause.style.color="black";*/
		bot_pause.style.visibility="visible";

	}
	else{
		/*bot_pause.style.color="gray";*/
		bot_pause.style.visibility="hidden";
	}
}

function pinta(id){

	bot=document.getElementById(id);

	if(bot.disabled==false){

		bot.style.color="white";
	}
}

function borra(id){

	bot=document.getElementById(id);

	bot.style.color="black";
}

function pintaVidas(){

	life.style.visibility="visible";

	xVidas.appendChild(document.createTextNode("x "+num_vidas));
}

function borraVidas(){

	life.style.visibility="hidden";

	while(xVidas.hasChildNodes()){

		xVidas.removeChild(xVidas.lastChild);
	}
}

function colocaObjetos(){

	sentido_abcisas=Math.floor(Math.random()*2);
	sentido_ordenadas=-2;  /*ARRIBA*/

	if(sentido_abcisas==0){

		sentido_abcisas=-1; /*IZQDA*/
	}

	pos_abcisas=posXPelotaOriginal;
	pos_ordenadas=posYPelotaOriginal;

	pelota.style.left=pos_abcisas+"px";
	pelota.style.top=pos_ordenadas+"px";

	posXBarra=posXOriginalBarra;

	barra.style.top=(altoPantalla-30)+"px";
	barra.style.left=posXBarra+"px";
}

function preStart(){

	pelota.style.visibility="visible";
	barra.style.visibility="visible";
	patilloid.style.visibility="hidden";

	pintaLadrillos();

	for(i=0;i<numLadrillos;i++){

			ladrillito[i].style.visibility="visible";
	}
}

function restart(){

	a=0;
	p=0;

	/*level=0;*/

	if(pre==0){

		preStart();
		pre=1;
	}
	else if(s==1){

		divPantalla.style.backgroundImage="url('../images/fondo_espacio_600x753.jpg')";
		gameOverLogo.style.visibility="hidden";
		num_vidas=3;
		pintaVidas();
		s=0;
		ptos=0;

		pintaLadrillos();
	}

	else{

		if(num_vidas==0){

			num_vidas=3;
			ptos=0;
		}

		borraVidas();
		pintaVidas();

		boton("boton_restart",true);
		boton("boton_stop",false);
		boton("boton_pause",false);

		pintaBotones();

		cerrarRadios();

		colocaObjetos();

		jugar();
	}

	pintaNextLevel(level);
}
