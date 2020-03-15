import {EVENTS} from '../../constants';

export default (socketClient) =>{
    
    const stateText =document.getElementById('state-text');  
    const sendState= document.getElementById('send-state'); 
    const states= document.getElementById('states'); 
    const userName =document.getElementById('user-name');
    const sendUser= document.getElementById('send-username');
    
   

    sendState.addEventListener('click', ()=>{ 
        if( stateText.value.length >0 && userName.value.length >0)
        {const data ={msg: stateText.value, user:userName.value}
        data.time = Date.now();
        socketClient.emit(EVENTS.SEND_STATE, data);
        stateText.value= '';
        }   
    });

    sendUser.addEventListener('click', ()=>{ 
        if(userName.value.length > 0 ) socketClient.emit(EVENTS.SEND_NAME, userName.value)
    });

    const sendLike = (msg, id) =>{ 
        const like = {msg:msg , id: id}
        socketClient.emit(EVENTS.REFRESH_LIKES, like)

    }

    const deleteLike = (msg) =>{
        socketClient.emit(EVENTS.DELETE_STATE, msg)
    }

    return{states, deleteLike, sendLike}

}