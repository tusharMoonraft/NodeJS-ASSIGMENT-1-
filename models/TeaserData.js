const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const TeaserScehma=new Schema({
    teasertext:{
        type: String, 
        isUnique: true, 
        isRequired: true,
    },
    teaserdescription:{
        type: String,  isRequired: true, 
        
    },
});
TeaserScehma.virtual('src').get(function(){
    if(this.img!=null && this.imgType!=null){
        return `${this.id}`
    }
})

module.exports=mongoose.model('TeaserData',TeaserScehma);



