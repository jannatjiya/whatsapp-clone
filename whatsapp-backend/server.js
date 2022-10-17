//importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import Messages from './dbMessages.js';
import Cors from 'cors';
//app config
const app =  express();
const port = process.env.PORT || 9000;
const pusher = new Pusher({
    appId: "1492545",
    key: "b93a84f988f4cb8f1d83",
    secret: "595d84d034e1c9281958",
    cluster: "ap2",
    useTLS: true
  });

//middleware
app.use(express.json())
app.use(Cors());

/*cors is used insted of typying these errors
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Headers","*");
//     next();
// })
*/
//db confg
const connection_url = "mongodb+srv://jiya:jiya@cluster0.kkeli73.mongodb.net/whatsappdb?retryWrites=true&w=majority"

mongoose.connect(connection_url,{ useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.once("open",()=>{
  console.log("DB connected");
  //collection
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change" ,(change)=>{
      console.log(" a change occured",change);

      if(change.operationType === 'insert'){
          const messageDetails = change.fullDocument;
          pusher.trigger('messages','inserted',{
              name : messageDetails.name,
              message : messageDetails.message,
              timestamp : messageDetails.timestamp,
             received : messageDetails.received
          });
      }else{
          console.log("error triggering pusher");
      }
  })
})


//??

//adding datastructure

//api routes 
app.get('/',(req,res)=>res.status(200).send('hello world'))//200  is gonna be ok server is ok  201 means created

app.get('/messages/sync',(req,res)=>{
    const dbMessage =  req.body
        Messages.find((err,data)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(200).send(`new message created: \n ${data}`)//200 means db ok ,n we e not creating db
            }
        })
    
})

app.post('/messages/new',(req,res)=>{
    const dbMessage =  req.body
        Messages.create(dbMessage,(err,data)=>{
            if(err){
                res.status(500).send(err)
            }else{
                res.status(201).send(`new message created: \n ${data}`)//201 means db created well 
            }
        })
    
})


 
// listen
app.listen(port,()=>console.log(`listening on localhost:${port}`))