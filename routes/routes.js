const express = require('express')

const app = express()
const Brands = require('../models/brands');
const Models = require('../models/models');

//Cada modelo deberia tener su propio archivo de rutas
app.post('/brand',async (req, res) => {
    console.log(req.body);
    let newBrand = new Brands(req.body);
    try {

        const resp = await newBrand.save();
        return res.send(resp)
    } catch(e) {
        
        console.log(e.code)
        if(e.code === 11000) {
            
            return res.json({message:'Ya existe la marca', code: e.code});
        }
        
    }
  })

  app.post('/brand/:id/models',async (req, res) => {
    console.log(req.params);
    let newModel = new Models({...req.body, brand_id: req.params.id});
    if(req.params.id.length < 24){
        res.send({code: 404, message: 'No existe esa marca'});
    }
    let brand = await Brands.findById(req.params.id);
    if(!brand){
        res.send({code: 404, message: 'No existe esa marca'});
    }
    try {
        console.log(newModel)
        const oldModel = await Models.findOne({name: req.body.name, brand_id: req.params.id})
        if(!!oldModel) return res.send({code: 500, message: 'ya existe ese modelo para esta marca'})
        const resp = await newModel.save();
        return res.send(resp)
    } catch(e) {
        
            
            return res.json({message: e.message, code: e.code});
        
        
    }
  })

  app.put('/models/:id',async (req, res) => {
    console.log(req.params);
    if(req.params.id.length < 24) {
        return res.send({code: 404, message: 'No existe ese modelo'});
    }
    let model = await Models.findById(req.params.id);
    if(!model){
        return res.send({code: 404, message: 'No existe esa modelo'});
    }
    console.log(req.body.avarage_price)
    if(!(req.body.avarage_price > 100000)) {
        return res.send({code: 500, message: 'la cantidad debe ser mayor a 100000'});

    }
    try {

        
        model.avarage_price = req.body.avarage_price;
        const resp = await model.save();
        return res.send(resp)
    } catch(e) {
        
        console.log(e.code)
            
            return res.json({message:e.message, code: e.code});
        
        
    }
  })
  app.get('/brand/:id/models',async (req, res) => {
    console.log(req.params);
    if(req.params.id.length < 24) {
        return res.send({code: 404, message: 'No existe esa marca'});
    }
    let brand = await Brands.findById(req.params.id);
    if(!brand){
        return res.send({code: 404, message: 'No existe esa marca'});
    }
    let models = await Models.find({brand_id: req.params.id}, {_id:1, name:1, avarage_price:1 });
    res.send(models)
    
  })
  app.get('/brand/',async (req, res) => {
    
   
    let models = await Models.aggregate([{"$match":{}},{
        $group:
    {
        _id: "$brand_id" ,
        prom: { $avg: "$avarage_price" }
    }
    }]);
    var options = {
        path: '_id',
        model: 'Brands'
   };
   const resp = await Models.populate(models, options);
    res.send(resp)
    
  })



module.exports = app;