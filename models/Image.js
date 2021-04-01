const mongoose=require('mongoose');


const Schema=mongoose.Schema;


const imageSchema=new Schema({
    
    img:{
        type:Buffer,  isRequired: true
    },
    imgType:{
        type:String, isRequired: true
    },
});


imageSchema.virtual('imgSrc').get(function(){
    if(this.img!=null && this.imgType!=null){
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`
    }
})
// imageSchema.virtual('src').get(function(){
//     if(this.img!=null && this.imgType!=null){
//         return `${this.id}`
//     }
// })


module.exports=mongoose.model('Image',imageSchema);
