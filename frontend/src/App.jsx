import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [recipes, setRecipes] = useState([])
  // console.log("data: )", data)
  async function handleSubmit(){
    await axios.post("http://localhost:4000/recipe", {data: data})
    .then((response)=>{
      console.log("response.data: ",response.data.data)
      setRecipes(response.data.data)
    })
  }
  console.log("recepies:",recipes)
  return (
    <div className="flex flex-col justify-start items-center gap-5 p-10 md:w-[80vw] m-auto">
      <h1 className="text-3xl font-semibold">
        Recipe Search
      </h1>
      <div className="flex gap-2">
          <input type="text" className="border-[1px] px-2 py-1 rounded-md" placeholder="Enter Ingredients..." onChange={(e)=>{
            // setData()
           console.log("e: ", e.target.value)
           setData(e.target.value)
          }} />
          <button className="text-white bg-green-800 px-4 py-1 rounded-md" onClick={handleSubmit}>Search</button>
      </div>
      <div className="flex flex-wrap gap-5 justify-center items-start">
      { 
      (recipes != undefined)?(
        <div>
          <p className="text-center py-2">{recipes.length} recipes found</p>
        <div className="flex flex-wrap justify-center items-start gap-5">
          {recipes.map((recipe)=>{
              return(

                  
                  <div className="border-[1px] p-5 rounded-md w-[400px] ">
                  
                  <div className="text-2xl text-green-600 font-semibold">{recipe.foodItem}</div>
                  <div>
                    <div className="text-xl">Ingredients: </div>
                    {recipe.ingredients.map((ingredient)=>{
                      return(
                        <p className="text-gray-600 flex justify-start items-center gap-3"><div className="w-2 h-2 bg-gray-200 rounded-full"></div>{ingredient}</p>
                      )
                    })}
                  </div>
                  <div className="my-4">
                    <div className="text-xl text-blue-800">Preparation Steps:</div>
                    {recipe.recipe.map((item, id)=>{
                      return(
                        <div className="my-1">{id+1} {item}</div>
                      )
                    })}
                  </div>
                </div>
              )
          })}
        </div>
        </div>
      ):<p>"No Matched Recipes"</p>
      
          
      }
      </div>
    </div>
  )
}

export default App
