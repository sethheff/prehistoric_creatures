const express = require('express');
const router = express.Router()
const fs = require('fs')

// ----> DINO INDEX ROUTE <----
router.get('/', (req,res)=>{
    let dinosaurs = fs.readFileSync('../dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) // convert the string to an array
    
    // handle the query string if there is one
    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if(nameFilter){ // reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index', {dinosaurs: dinoData})
})

// ----> CREATE NEW DINO ROUTE <----
router.get('/new', (req,res)=>{
    res.render('new')
})

// ----> DINO SHOW ROUTE <----
router.get('/:idx', (req,res)=>{
    let dinosaurs = fs.readFileSync('../dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) 

    // get array index from url paramter
    let dinoIndex = parseInt(req.params.idx)
    console.log(dinoData[dinoIndex])
    res.render('show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
})

// ----> DINO POST ROUTE <----
router.post('/', (req,res)=>{
    let dinosaurs = fs.readFileSync('../dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) 
    dinoData.push(req.body) // push the new dino to the array
    // save the new dinoData array to the dinosaurs.json file
    // JSON.stringify does the opposite of JOSN.parse
    fs.writeFileSync('../dinosaurs.json', JSON.stringify(dinoData))
    //redirect the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
    
})

// ----> DINO EDIT ROUTE <----
router.get('/edit/:idx', (req,res)=>{
    let dinosaurs = fs.readFileSync('../dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) 
    res.render('dinosaurs/edit', {dino: dinoData[req.params.idx], dinoId: req.params.idx})
})

// ----> DINO PUT ROUTE <----
router.put('/:idx', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) 
    // reassign the dinos fields to be that which the user input
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type
    // save the edited 
    fs.writeFileSync('../dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})

router.delete('/:idx', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) 

    //remove the deleted dinosaur from the dinosaurs array
    dinoData.splice(req.params.idx, 1)

    //save the new dinosaurs to the json file
    fs.writeFileSync('../dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
})


module.exports = router;