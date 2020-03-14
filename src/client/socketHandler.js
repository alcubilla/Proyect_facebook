import {EVENTS} from '../../constants';

export default (socketClient,ui) =>{
    
    socketClient.on(EVENTS.BRODCAST_STATE, (allStates) =>{
        ui.states.innerHTML =''
        allStates.forEach(state =>{
            ui.states.innerHTML += `<div>
            <p>${state.text}</p>
            <button onClick="window.ui.sendLike('${state.text}, ${state.id}, ${state.likes}')">Like</button>
            <li>${state.likes}</li>
            </div>`
        })

        
        
    })


}


