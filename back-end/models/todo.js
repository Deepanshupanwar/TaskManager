const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const TodoSchema = new Schema({ 
    title:{type:String},
    description:{type:String},
    start:{type:Date},
    end:{type:Date},
    author:{type: Schema.Types.ObjectId, ref:'User'},
}
);

const TodoModel = model('Todo',TodoSchema);

module.exports = TodoModel; 