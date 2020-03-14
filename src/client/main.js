import socketHandler from './socketHandler'; //cacha eventos del lado del cliente
import uiHandler from './uiHandler'; //listeners para el formulario


const socketClient = io(); //esta accesible en el cdn que agregamos en el 
const ui = uiHandler(socketClient); //uiHandler para el html
window.ui= ui; //hace global el ui

socketHandler(socketClient, ui); //recibir los eventos del back
