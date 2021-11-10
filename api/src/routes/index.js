const { Router, response } = require('express');

const axios = require ('axios')
const { Recipe, Type } = require ('../db')


const router = Router();

const getApiInfo = async () => {
    

        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=192d6b2c42ce490b91b00d22b466d851&addRecipeInformation=true&number=100`);
        const apiInfo = await apiUrl.data.results.map(recipe => {
            return {
                title: recipe.title,
                id: recipe.id,
                created: false,
                Types: recipe.diets.map((diet) => {return { name: diet };}),
                dishTypes: recipe.dishTypes,
                healthScore: recipe.healthScore,
                score: parseInt(recipe.spoonacularScore),
                summary: recipe.summary,
                image: recipe.image,
                steps: recipe.analyzedInstructions.map((r) => r.steps.map((s) => s.step)).flat(2).join(""),
            };
        });
        return apiInfo;
    
};



const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Type,
            through: {
                attributes: [],
            },
        }
    })
}

const getAllRecipe = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo);
    return infoTotal
}

router.get('/recipes', async (req, res) => {
    const name = req.query.name
    
    let recipesTotal = await getAllRecipe();
    if(name){
        
        let recipeTitle = await recipesTotal.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()))
        
        recipeTitle.length ?
        res.status(200).send(recipeTitle) :
        res.status(404).send('error')
    } else{
        res.status(200).send(recipesTotal)
    }
})

router.get('/types', async (req, res)=>{
  
        
        let dietsStings= ['dairy free','gluten free','pescatarian','whole 30','lacto ovo vegetarian','primal','fodmap friendly','vegan','paleolithic', 'ketogenic']
        
            dietsStings.forEach(diet => {
                Type.findOrCreate({
                    where: { name: diet}
                })
            })
            const allDiets = await Type.findAll();
            res.send(allDiets);    
        
})

router.post('/type', async (req, res)=>{
    const newType= req.query.name 

    const newNewType = await Type.findOrCreate({
        where: { name: newType}
    })
     
    res.send(newNewType)


})

router.get('/recipes/:id', async (req, res)=>{
    const id= req.params.id;
    const recipesTotal = await getAllRecipe()
    if(id){
        let recipeID = await recipesTotal.filter(el => el.id == id)
        recipeID.length?
        res.status(200).json(recipeID) :
        res.status(404).send('this is not found')
    }
})

router.post('/recipe', async (req, res) =>{
    let{
        title,
        summary,
        score,
        healthScore, 
        image,
        created,
        steps,
        types
    } = req.body

    let recipeCreated = await Recipe.create({
        title,
        summary,
        score,
        healthScore,
        image,
        steps,
        created
    })
    
    types.map(async t=> {
        let tDB = await Type.findOrCreate({
            where: { name : t}
        })
        
    recipeCreated.addType( tDB[0]) })
    
    res.json(recipeCreated)
})


module.exports = router;
