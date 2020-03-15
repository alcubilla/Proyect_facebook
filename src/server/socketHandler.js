//carga los eventos 

import {EVENTS} from '../../constants'

export default (io,allStates) => (socket)=>{

    if(allStates){io.emit(EVENTS.BRODCAST_STATE, allStates)}

    socket.on(EVENTS.SEND_STATE, (data) => {
        data.id= socket.id;
        data.likes=0;
        allStates.push(data)
        io.emit(EVENTS.BRODCAST_STATE, allStates)
    });

    socket.on(EVENTS.SEND_NAME, (userName) =>{
        allStates.forEach(p=>{ if (p.id == socket.id) p.user = userName; });
        io.emit(EVENTS.BRODCAST_STATE, allStates)
    });
    
    socket.on(EVENTS.DELETE_STATE, (msg) =>{
        allStates=allStates.filter( p => p.msg !== msg )
        io.emit(EVENTS.BRODCAST_STATE, allStates)
    });

    socket.on(EVENTS.REFRESH_LIKES, (like) =>{
        const current= allStates.find(p => p.msg == like.msg)
        current.likes +=1;
        io.emit(EVENTS.BRODCAST_STATE, allStates)
    });   
};