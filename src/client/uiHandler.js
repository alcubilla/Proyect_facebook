import {EVENTS} from '../../constants';

export default (socketClient,allStates) =>{
    
    const stateText =document.getElementById('state-text');  
    const sendState= document.getElementById('send-state'); 
    const states= document.getElementById('states'); 
    

    sendState.addEventListener('click', ()=>{ 
        if( stateText.value.length >0)
        {socketClient.emit(EVENTS.SEND_STATE, stateText.value); }
        stateText.value= '';
    } );

    const sendLike = (msg, id ,likes)=>{
        if(allStates.lenght >0)

        { console.log(allStates)
            const actual= allStates.filter(p=> p.id===state.id && p.text ===state.text)
            actual.likes +=1
        }
    

    }

return{
    sendLike,
    states
}
}