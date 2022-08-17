const mongoose = require('mongoose');
const ModelsSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    avarage_price: {
        type: Number,
        required: true,
    },
    brand_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
    

})

module.exports = mongoose.model('Models',ModelsSchema, 'models');