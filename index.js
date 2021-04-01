const express=require('express');
const app=express();
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const Employee=require('./models/Employee');
const TeaserData=require('./models/TeaserData');
const Images=require('./models/Image');



const imageMimeType=['image/jpg','image/png','image/jpeg']


mongoose.connect("mongodb://localhost:27017/moonraftEmployeeRegistration",{ useNewUrlParser: true });
const db=mongoose.connection;




db.once('error',(err)=>{
    console.log(err)
})
db.on('open',()=>{
    console.log('db is connected')
})
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',(req,res,next)=>{
    res.render('index');
});
app.get("/register",(req,res)=>{
    res.render("register");
});


app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/teaseradd",async (req,res)=>{
    try{
        const allTeaser=await TeaserData.find();
        const allImages= await Images.find();
        res.render("teaserData",{
            allImages,
            allTeaser

            

       
      
        });
    }
    catch(err){
        console.log(err)
    }
  
    
})

// app.post('/add', async (req,res,next)=>{
//     const {firstname,lastname,email,password,img}=req.body;
//     const employee=new Employee({
//         firstname,
//         lastname,
//         email,
//         password,
//         img
//     });
    
//     saveImage(employee,img);

//     try{
//         const newEmployee=await employee.save()
//         res.redirect('/')
//     }
//     catch(err){
//         console.log(err)
//     }
//     console.log(employee);
// });

// app.post("/login",async (req,res)=>{

//     try{
        
//         const email=req.body.email;
//         const password=req.body.password;
//         console.log(password);
//         const useremail=await Employee.findOne({email:email})
//         if(useremail.password==password){
//             res.status(201).render("employeeData",{
//                  firstname:useremail.firstname,
//                  lastname:useremail.lastname,
//                  email:useremail.email,
//                  imgSrc:`data:${useremail.imgType};charset=utf-8;base64,${useremail.img.toString('base64')}`

//             })
//         }
//         else{
//             res.send("password not matching")
//         }
        
//     }
//     catch(error){
//         res.status(400).send("Invalid Email id");
        
//     }
// })

app.post('/teaseradd', async (req,res,next)=>{
    const {teasertext,teaserdescription,img}=req.body;

    const teaser=new TeaserData({
        teasertext,
        teaserdescription
        
    });
    const image=new Images({
        img
    });
    
    saveImage(image,img);
   

    try{
        const newTeaser=await teaser.save()
        const newImage=await image.save()
        res.redirect('/teaseradd')
    }
    catch(err){
        console.log(err)
    }
    
});







// save image as binary file
const  saveImage= async (image,imgEncoded)=>{
    if(imgEncoded == null) return ;
    
    const img=await JSON.parse(imgEncoded)
    
    
    if(img!=null && imageMimeType.includes(img.type)){
        
        image.img=new Buffer.from(img.data,'base64');
        image.imgType=img.type
        
        
    }
};


//delete item
app.delete('/teaseradd/:_id', async (req,res)=>{
    const id=req.params._id;
    

    const findImage=await Images.findByIdAndDelete(id)

        
    .then(result=>{
        
        res.json({redirect:'/teaseradd'})
    })
    .catch(err=>{console.log(err)})
    
})

app.listen(3000,()=>console.log('Server is working on port 3000'))