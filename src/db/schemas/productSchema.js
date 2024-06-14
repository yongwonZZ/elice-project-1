const{Schema} = mongoose;

const productSchema = new Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true },

  name: { 
    type: String, 
    required: true },

  price: { 
    type: Number, 
    required: true },

  des: { 
    type: String, 
    required: true },

  img: { 
    type: String, 
    required: true },
});


module.exports = productSchema;