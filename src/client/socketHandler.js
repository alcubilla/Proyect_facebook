import {EVENTS} from '../../constants';

export default (socketClient,ui) =>{

    socketClient.on('sucessLogin', (data)=>{
        console.log(data)
        ui.updateClientData(data.token);
        ui.login.style.display='none';
        ui.wall.style.display='block';
        ui.error.style.display='none';
        ui.userName.placeholder=data.userName;
    })

    
    socketClient.on('failedLogin', (msg)=>{
        ui.login.style.display='none';
        ui.wall.style.display='none';
        ui.error.style.display='block';
        ui.error.innerHTML='';
        ui.error.innerHTML += `<h3>Sorry...${msg}</h3>`
    })
    
    socketClient.on(EVENTS.BRODCAST_STATE, (results) =>{
        ui.states.innerHTML =''
        results.forEach(state =>{
            ui.states.innerHTML += `
            <div class="card">
            <p style="font-family: 'Pontano Sans', sans-serif; font-size:10pt;" class="card-header">${state.userName} at ${state.createdAt}</p>
            <div class="card-body">
            <p style="font-family: 'Pontano Sans', sans-serif; font-size:14pt;" class="card-text">${state.text}-${state.likes} Likes</p>
            <button class="btn btn-primary" id="${state.text}" onClick="window.ui.sendLike('${state.text}','${state.id}')">Like</button>
            <button class="btn btn-primary" onClick="window.ui.deleteLike('${state.text}')">Delete</button>
            </div>
            </div>`
        })
    })
    
    socketClient.on('populars',(popular)=>{
        ui.popular.innerHTML=''
        ui.popular.innerHTML+= '<h3>Usuarios más populares</h3>'
        popular.forEach(user =>{
            ui.popular.innerHTML+=`<p>${user.userName}</p>`
        })
    
    })


}


