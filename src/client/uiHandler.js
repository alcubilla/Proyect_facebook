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

    const clientData ={
        token:''
    }

    function updateClientData (token){
        clientData.token = token;
    }
    
   

    sendState.addEventListener('click', ()=>{ 
        if( stateText.value.length >0 && userName.value.length >0)
        {const data ={msg: stateText.value, user:userName.value}
        data.time = Date(Date.now());
        data.token= clientData.token;
        socketClient.emit(EVENTS.SEND_STATE, data);
        stateText.value= '';
        }   
    });

    doLogin.addEventListener('click', ()=>{ 
        if( usuario.value.length >0 && password.value.length >0)
        {
       socketClient.emit('doLogin', {
           userName: usuario.value,
           password: password.value
       })
        }   
    });

    sendUser.addEventListener('click', ()=>{ 
        if(userName.value.length > 0 ) socketClient.emit(EVENTS.SEND_NAME, userName.value)
    });

    const sendLike = (msg, id) =>{ 
        document.getElementById('buttonLike').disabled= true;
        const like = {msg:msg , id: id}
        socketClient.emit(EVENTS.REFRESH_LIKES, like)

    }

    const deleteLike = (msg) =>{
        socketClient.emit(EVENTS.DELETE_STATE, msg)
    }

    return{states, deleteLike, sendLike, wall, login, clientData, updateClientData}

}