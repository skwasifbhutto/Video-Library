var mongoClient =require("mongodb").MongoClient;
var express=require("express");
var cors=require("cors");

var app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

var connectionString="mongodb://127.0.0.1:27017";


app.get('/get-admin',(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        database.collection("tbladmin").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-videos',(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        database.collection("tblvideos").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-videos',(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        database.collection("tblvideos").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-categories',(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        database.collection("tblcategories").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-users',(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        database.collection("tblusers").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});


app.get('/get-user/:userid',(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        database.collection("tblusers").find({UserId:req.params.userid}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/get-video/:id',(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        database.collection("tblvideos").find({VideoId:parseInt(req.params.id)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.get('/filter-videos/:categoryid',(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        database.collection("tblvideos").find({CategoryId:parseInt(req.params.categoryid)}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        });
    });
});

app.post("/register-user",(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        
        var user={
            UserId:req.body.UserId,
            UserName:req.body.UserName,
            Password:req.body.Password,
            Email:req.body.Email,
            Mobile:req.body.Mobile
        }
        database.collection("tblusers").insertOne(user).then(()=>{
            console.log(`User Registered`);
            res.end();
        });
    });
});


app.post("/add-category",(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        
        var category={
            CategoryId:parseInt(req.body.CategoryId),
            CategoryName:req.body.CategoryName
        }
        database.collection("tblcategories").insertOne(category).then(()=>{
            console.log(`Category Added`);
            res.end();
        });
    });
});

app.post("/add-video",(req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
        
        var video={
             VideoId:parseInt(req.body.VideoId),
             Title:req.body.Title,
             Url:req.body.Url,
             Description:req.body.Description,
             Likes:parseInt(req.body.Likes),
             Dislikes:parseInt(req.body.Dislikes),
             Views:parseInt(req.body.Views),
             CategoryId:parseInt(req.body.CategoryId),
             Comments:[req.body.Comments]
        }
        database.collection("tblvideos").insertOne(video).then(()=>{
            console.log(`Video Added`);
            res.end();
        });
    });
});

app.put("/edit-video/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
    var database=connectionObject.db("videolibrary");
    var video={
        VideoId:parseInt(req.body.VideoId),
        Title:req.body.Title,
        Url:req.body.Url,
        Description:req.body.Description,
        Likes:parseInt(req.body.Likes),
        Dislikes:parseInt(req.body.Dislikes),
        Views:parseInt(req.body.Views),
        CategoryId:parseInt(req.body.CategoryId),
        Comments:[req.body.Comments]
   }

    database.collection("tblvideos").updateOne({VideoId:parseInt(req.params.id)},{$set:video}).then(()=>{
        console.log(`Video Updated Successfully..`);
        res.end();
    });
    });
});

app.delete("/delete-video/:id", (req, res)=>{
    mongoClient.connect(connectionString).then(connectionObject=>{
        var database=connectionObject.db("videolibrary");
         database.collection("tblvideos").deleteOne({VideoId:parseInt(req.params.id)}).then(()=>{
            console.log(`Video Deleted Successfully..`);
            res.end();
         })

    })
})

app.listen(5050);
console.log(`server started : http://127.0.0.1:5050`);