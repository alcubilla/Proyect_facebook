import {EVENTS} from '../../constants';

export default (socketClient) =>{
    
    const stateText =document.getElementById('state-text');  
    const sendState= document.getElementById('send-state'); 
    const states= document.getElementById('states'); 
    const userName =document.getElementById('user-name');
    const sendUser= document.getElementById('send-username');
    const login = document.getElementById('login');
    const wall=document.getElementById('wall');
    wall.style.display = 'none';
    const usuario = document.getElementById('userName');
    const password = document.getElementById('password');
    const doLogin = document.getElementById('do-login');
    const error =document.getElementById('error');
    error.style.display='none';
    const popular = document.getElementById('popular');

    const clientData ={
        token:''
    }

    function updateClientData (token){
        clientData.token = token;
    }
    
    sendState.addEventListener('click', ()=>{ 
        if( stateText.value.length >0 && userName.value.length >0)
        {const data ={msg: stateText.value, user:userName.value}
        data.token= clientData.token;
        socketClient.emit(EVENTS.SEND_STATE, data);
        stateText.value= ''
        }   
    });

    doLogin.addEventListener('click', ()=>{ 
        if( usuario.value.length >0 && password.value.length >0)
        {
        socketClient.emit('doLogin', {userName: usuario.value, password: password.value})
        }   
    });

    sendUser.addEventListener('click', ()=>{ 
        if(userName.value.length > 0 ) socketClient.emit(EVENTS.SEND_NAME, {old:usuario.value, token:clientData.token, new: userName.value})
    });

    const sendLike = (msg) =>{ 
        const data= {msg: msg, token: clientData.token}
        socketClient.emit(EVENTS.REFRESH_LIKES, data)
    }
        //document.getElementById(`${msg}`).disabled= true;
    

    const deleteLike = (msg) =>{
        const data= {msg: msg, token: clientData.token}
        socketClient.emit(EVENTS.DELETE_STATE, data)
    }

    return{states, deleteLike, sendLike, wall, login, clientData, updateClientData, error, popular, userName}
}
