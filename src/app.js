import express from "express";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());

const usuarios = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
    const newuser = req.body;
    usuarios.push(newuser);
    res.send(usuarios);
})

app.post("/tweets", (req, res) => {
    const newtweet = req.body;
    const findUser = usuarios.find(user => user.username === newtweet.username);
    if(!findUser){
        res.send('UNAUTHORIZED');
    }
    else{
        tweets.push(newtweet);
        res.send('OK');
    }
})


app.get("/tweets", (req, res) => {
    const formateddata = [];
    for(let i = 0; i < tweets.length; i++){
        const finduser = usuarios.findIndex(user => user.username === tweets[i].username)
        const data = {
            username: tweets[i].username,
            avatar: usuarios[finduser].avatar,
            tweet: tweets[i].tweet
        }
        formateddata.push(data);
    }
    if(formateddata.length > 10){
        const lasttweets = []
        for(let i = formateddata.length - 10; i < formateddata; i++){
            lasttweets.push(formateddata[i]);
        }
        res.send(lasttweets);
    }
    else{
        res.send(formateddata);
    }
    
    
    
    
    




    
})





app.get("/", (req, res) => {
    res.send('hello world')
})






app.listen(5000)