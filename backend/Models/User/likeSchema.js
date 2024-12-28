const mongoose=require('mongoose')

const likeSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,ref:'Users'},
    posts:[{type:mongoose.Schema.ObjectId,ref:'Post'}]
})

module.exports=mongoose.model('like',likeSchema)