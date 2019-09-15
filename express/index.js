const express = require('express')
// const router = express.Router();
const app = express() 
const pgp = require('pg-promise')(/* options */)
const db = pgp(process.env.DATABASE_URL||'postgresql://localhost:5432/vb-db')

// CORSを許可する
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/',function(req,res){
    res.send('hello')
})

app.get('/hometeam', function (req, res) {
    db.any("SELECT home FROM ballinfo;")
      .then(function (data) {
        res.json(data);
    });
});

app.get('/teams', function (req, res) {
    db.any("SELECT teamname,shortname FROM teaminfo;")
      .then(function (data) {
        res.json(data);
    });
});


app.get('/pitcher/:name', function (req, res) {
  name = req.params.name
  type = req.params.type
    db.any(`SELECT inning,pitcherside,batterside,ballspeed,balltype,result FROM ballinfo WHERE pitchername='${decodeURI(name)}';`)
      .then(function (data) {
        console.log(data)
        res.json(data);
    });
});
app.get('/:team/pitcher', function (req, res) {
  team = req.params.team
    db.any(`SELECT DISTINCT(pitchername) FROM ballinfo WHERE pitcherteam='${decodeURI(team)}';`)
      .then(function (data) {
        res.json(data);
    });
});

  
const port = process.env.PORT || 3000;
app.listen(port);
console.log('server start listen on port ' + port);