//carga los eventos 

import {EVENTS} from '../../constants'
import connection from './connection'
import {matchHash,createToken,validateToken}  from './hasher'


export default (io,allStates) => (socket)=>{

    socket.on('doLogin', (data)=>{
        connection.query('select * from users where userName = ?', [data.userName],(err,result)=> { 
            if(!err){
                if (result.length === 1)
                    {console.log(data.password)
                        if(matchHash(data.password, result[0].pass))
                        {const token= createToken({userName:data.userName})
                        io.emit('sucessLogin',token)
                        } else{io.emit('failedLogin','invalid credentials')}
                    }else{io.emit('failedLogin', 'user not found')}
            }else{io.emit('failedLogin',err.message)}
    })
    })

    if(allStates){io.emit(EVENTS.BRODCAST_STATE, allStates)}

    socket.on(EVENTS.SEND_STATE, (data) => {
        if (validateToken(data.token))
        {
        data.id= socket.id;
        data.likes=0;
        allStates.push(data)
        console.log(data)
        io.emit(EVENTS.BRODCAST_STATE, allStates)
        }
      
        //else{invalidToken}
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