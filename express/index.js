const express = require('express')
// const router = express.Router();
const app = express() 
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgresql://localhost:5432/vb-db')

app.get('/',function(req,res){
    res.send('hello')
})

app.get('/hometeam', function (req, res) {
    db.any("SELECT home FROM ballinfo;")
      .then(function (data) {
        res.json(data);
    });
});
  
const port = process.env.PORT || 3000;
app.listen(port);
console.log('server start listen on port ' + port);