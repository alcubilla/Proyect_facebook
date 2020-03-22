//carga los eventos 

import {EVENTS} from '../../constants'
import connection from './connection'
import {matchHash,createToken,validateToken}  from './hasher'

export default (io) => (socket)=>{
 
    socket.on('doLogin', (data)=>{
        connection.query('select * from users where userName = ?', [data.userName],(err,result)=> { 
            if(!err){
                if (result.length === 1)
                {if(matchHash(data.password, result[0].pass))
                    {const token = createToken({userName:data.userName})
                    data.token=token;
                    io.emit('sucessLogin',data)
                    sendRefresh(data.token);
                    } else{io.emit('failedLogin','invalid credentials')}
                }else{io.emit('failedLogin', 'user not found')}
            }else{io.emit('failedLogin',err.message)}
    })
    })

    socket.on(EVENTS.SEND_STATE, (data) => {
        connection.query('insert into states (text, userName, status, likes) values (?,?,1,0)', [data.msg, data.user],(err,result)=> { 
         if(!err){sendRefresh(data.token);
        }
        })
    });

    socket.on(EVENTS.SEND_NAME, (data) =>{
       connection.query('update users set userName=? where userName= ?',[data.new, data.old],(err,result)=>{
           if(!err){
               connection.query('update states set userName=? where userName= ?',[data.new, data.old], (error,resut)=>{
                if(!error){
                    sendRefresh(data.token);
                }
                })
            }
        }) 
    });
    
    socket.on(EVENTS.DELETE_STATE, (data) =>{
            connection.query('update states set status=0 where text=?',[data.msg],(err,results)=>{
            if(!err){sendRefresh(data.token);
             }
            })    
    });

    socket.on(EVENTS.REFRESH_LIKES, (data) =>{
            connection.query('update states set likes=likes+1 where text=?',[data.msg],(err,results)=>{
                if(!err){
                sendRefresh(data.token);
                }
            })
    });   

    function sendRefresh(token)
    {
        if (validateToken(token)){
        connection.query('select * from states where status= 1',(err,results)=>{
                if(!err){
                    io.emit(EVENTS.BRODCAST_STATE, results) 
                        }
                    })
        connection.query('select userName,count(userName) from states group by userName having count(*)>=1 order by count(userName) desc limit 3',(error,popular)=>{
                    if(!error){
                        io.emit('populars',popular)
                    }
                
        })
    }else{io.emit('failedLogin','invalid credentials')}
    }
};