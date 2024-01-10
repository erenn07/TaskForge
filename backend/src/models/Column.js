import mongoose from 'mongoose';

const ColumnSchema =new mongoose.Schema({
    columnName:{
        type:String,
        require:false
    },
    columnId:{
        type:String,
        reuquired:false
    },
    project:{
        type:String,
        required:false,
        ref:'Project'
    }
});

const Column = mongoose.model('Column',ColumnSchema);

export default Column;