import {EVENTS} from '../../constants';

export default (socketClient,ui) =>{
    
    socketClient.on(EVENTS.BRODCAST_STATE, (allStates) =>{
        ui.states.innerHTML =''
        allStates.forEach(state =>{
            ui.states.innerHTML += `<div>
            <p>${state.msg}-${state.time}-${state.user}-${state.likes}</p>
            <button id="botonLike" onClick="window.ui.sendLike('${state.msg}','${state.id}')">Like</button>
            <button onClick="window.ui.deleteLike('${state.msg}')">Delete</button>
            </div>`
        })
    })


}


