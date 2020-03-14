//carga los eventos 

import {EVENTS} from '../../constants'

export default (io,allStates) => (socket)=>{

    socket.on(EVENTS.SEND_STATE, (text) => {
    //console.log(text);
    const data={text: text, id:socket.id, likes:0}
    allStates.push(data)
    //console.log(allStates)
    io.emit(EVENTS.BRODCAST_STATE, (allStates) )
    });


};