const express = require('express');
const router = express.Router()

// ----> PREHIS INDEX ROUTE <----
router.get('/', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('../prehistoric_creatures.json')
    let preHistoricData = JSON.parse(prehistoric_creatures) // convert the string to an array
    
    // handle the query string if there is one
    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if(nameFilter){ // reassign dinoData to only be an array of dinos whose name matches the query string name (and make it ignore case)
        preHistoricData = preHistoricData.filter((preHis)=>{
            return preHis.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('prehistorics/index', {prehistoric_creatures: preHistoricData})
})

// ----> CREATE NEW PREHIS ROUTE <----
router.get('/new', (req,res)=>{
    res.render('new')
})

// ----> PREHIS SHOW ROUTE <----
router.get('/:idx', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('../prehistoric_creatures.json')
    let preHistoricData = JSON.parse(prehistoric_creatures)

    // get array index from url paramter
    let preIndex = parseInt(req.params.idx)
    console.log(preHistoricData[preIndex])
    res.render('show', {pre: preHistoricData[preIndex], preId: preIndex})
})

// ----> PREHIS POST ROUTE <----
router.post('/', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('../prehistoric_creatures.json')
    let preHistoricData = JSON.parse(prehistoric_creatures) 
    preHistoricData.push(req.body) // push the new dino to the array
    // save the new dinoData array to the dinosaurs.json file
    // JSON.stringify does the opposite of JOSN.parse
    fs.writeFileSync('../prehistoric_creatures.json', JSON.stringify(preHistoricData))
    //redirect the GET /dinosaurs route (index)
    res.redirect('/prehistorics')
    
})

// ----> PREHIS EDIT ROUTE <----
router.get('/edit/:idx', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('../prehistoric_creatures.json')
    let preHistoricData = JSON.parse(prehistoric_creatures) 
    res.render('prehistorics/edit', {pre: preHistoricData[req.params.idx], preId: req.params.idx})
})

// ----> PREHIS PUT ROUTE <----
router.put('/:idx', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('../prehistoric_creatures.json')
    let preHistoricData = JSON.parse(prehistoric_creatures) 
    // reassign the dinos fields to be that which the user input
    preHistoricData[req.params.idx].name = req.body.name
    preHistoricData[req.params.idx].type = req.body.type
    // save the edited 
    fs.writeFileSync('../prehistoric_creatures.json', JSON.stringify(preHistoricData))

    res.redirect('/prehistorics')
})

router.delete('/:idx', (req,res)=>{
    let prehistoric_creatures = fs.readFileSync('../prehistoric_creatures.json')
    let preHistoricData = JSON.parse(prehistoric_creatures)

    //remove the deleted dinosaur from the dinosaurs array
    preHistoricData.splice(req.params.idx, 1)

    //save the new dinosaurs to the json file
    fs.writeFileSync('../prehistoric_creatures.json', JSON.stringify(preHistoricData))

    res.redirect('/prehistorics')
})

module.exports = router;