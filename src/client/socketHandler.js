import {EVENTS} from '../../constants';

export default (socketClient,ui) =>{

    socketClient.on('sucessLogin', (token)=>{
        console.log('token')
        ui.updateClientData(token);
        ui.login.style.display='none';
        ui.wall.style.display='block';
    })
    
    socketClient.on(EVENTS.BRODCAST_STATE, (allStates) =>{
        console.log(allStates)
        ui.states.innerHTML =''
        allStates.forEach(state =>{
            ui.states.innerHTML += `
            <div class="card">
            <p style="font-family: 'Pontano Sans', sans-serif; font-size:10pt;" class="card-header">${state.user} at ${state.time}</p>
            <div class="card-body">
            <p style="font-family: 'Pontano Sans', sans-serif; font-size:14pt;" class="card-text">${state.msg}-${state.likes} Likes</p>
            <button class="btn btn-primary" id="buttonLike" onClick="window.ui.sendLike('${state.msg}','${state.id}')">Like</button>
            <button class="btn btn-primary" onClick="window.ui.deleteLike('${state.msg}')">Delete</button>
            </div>
            </div>`
        })
    })


}


