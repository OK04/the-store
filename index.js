const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https= require("https");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/products", async function (req,res){


  var apiData=[];
  var title=[];
  var price=[];
  var description=[];
  var category=[];
  var image=[];
  var rating=[];
  var id=[];

  const url="https://fakestoreapi.com/products";
  https.get(url, await function(response){

    response.on("data", function (data){
      apiData.push(data);
    });
    response.on("end" , () =>{
      const products = JSON.parse(Buffer.concat(apiData));

      for(var i=0;i<products.length;i++){
        title.push(products[i].title);
        price.push(products[i].price);
        description.push(products[i].description);
        category.push(products[i].category);
        image.push(products[i].image);
        id.push(products[i].id);
        rating.push(products[i].rating);
      }

      res.render("home",{
        id: id,
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
        rating: rating
      });
    })

  })


});


app.get('/products/:prodid', async function(req,res){
  const reqid= req.params.prodid;


  var apiData=[];
  var title=[];
  var price=[];
  var description=[];
  var category=[];
  var image=[];
  var id=[];
  var rating=[];

  const url="https://fakestoreapi.com/products";
  https.get(url, await function(response){


    response.on("data", function (data){
      apiData.push(data);
    });

    response.on("end" , () =>{
      const products = JSON.parse(Buffer.concat(apiData));

      for(var i=0;i<products.length;i++){

        if(reqid == products[i].id)
        {

        title.push(products[i].title);
        price.push(products[i].price);
        description.push(products[i].description);
        category.push(products[i].category);
        image.push(products[i].image);
        id.push(products[i].id);
        rating.push(products[i].rating);
      }
    }

      res.render("cart",{
        id: id,
        title: title,
        price: price,
        description: description,
        category: category,
        image: image,
        rating: rating
      });
    })
})
})


let port = process.env.PORT;
if(port== null || port== ""){
  port = 3000;
}


app.listen(port,function(){
  console.log("server started");
});
