import Model from './Model.js'
import television from './television.js'
import express from 'express'
let reussi = "completer la tache "
let prix_tele = 0


let app = express()
app.use(express.urlencoded())

app.get("/", async function (req, res) {
    const tele = await television.loadMany()
    prix_tele = 0
    for(var i =0;i<tele.length;i+=1){
        prix_tele+= tele[i].prix
    }
    res.render('momo.ejs', { tv: tele, prix_tele })
  })
app.post('/ajout', async function(req, res){
    const tele = new television()
    tele.marque = req.body.marque
    tele.prix = req.body.prix
    tele.taille = req.body.size
    tele.acheter = 0
    tele.casser = 0
    tele.comment = " "
    await tele.save()
    res.redirect('/')    
})
app.get('/acheter', async function(req, res){
    const tele = await television.load({id : req.query.buy})
    tele.update({acheter : 1})
    await tele.save()
    res.redirect('/') 
})
app.get('/casser', async function(req, res){
    const tele = await television.load({id : req.query.casseur})
    tele.update({casser : 1, comment : req.query.casser})
    //tele.update({comment : req.query.casser})
    await tele.save()
    res.redirect('/') 
})


app.use(express.static('public'))
app.listen(3000, function(){
})


