const express = require("express")
const app = express()
const port = 4000
const cors = require("cors")
const bodyParser = require("body-parser")
const {itemsList} = require("./data.js")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.get("/", (req,res)=>{
    res.send("hello")
})

function findRecipe(data, itemsList){
    data = data.replaceAll(" ","")
    let searchItems = data.split(",")
    console.log(searchItems)
    let matchCount = 0;
    let matchRecipes = [];
    let sameItems = []

    itemsList.forEach((item)=>{

        searchItems.forEach((searchItem)=>{
            item.items.forEach((dataItem)=>{
                if(dataItem.includes(searchItem)){
                    matchCount++;
                }
            })
        })
        if(matchCount == searchItems.length){
            matchRecipes.push(item)
        }
        matchCount = 0
    })
    // console.log("matched recipe:----------------")
    // matchRecipes.forEach((recipe)=>console.log(recipe.foodItem))
    // console.log("-------------------------------")
    return matchRecipes
}
findRecipe("rice ,dal, seeds",itemsList)
app.post("/recipe", (req,res)=>{
    console.log("req.body", req.body)
    const matchedRecipies = findRecipe(req.body.data, itemsList)

    if(matchedRecipies.length > 0){
        return res.json({
            data: matchedRecipies,
        })
    }
    return res.json({
        "message": "No matched recipes :("
    })
})


app.listen(port,()=>{
    console.log("Api Running on port ",port)
})


