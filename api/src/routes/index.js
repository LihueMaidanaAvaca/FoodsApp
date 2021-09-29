const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios')
const { Recipe, Type } = require ('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=ecce4fd21f8b43138d926e3c808887b2&addRecipeInformation=true&number=100');
    const apiInfo = await apiUrl.data.results.map(recipe => {
        return {
            title: recipe.title,
            id: recipe.id,
            created: false,
            Diets: recipe.diets.map((diet) => {return { name: diet };}),
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
        console.log('acawachin',recipesTotal)
        let recipeTitle = await recipesTotal.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()))
        
        recipeTitle.length ?
        res.status(200).send(recipeTitle) :
        res.status(404).send('eso nourecipi papi.juju')
    } else{
        res.status(200).send(recipesTotal)
    }
})

router.get('/types', async (req, res)=>{
    const typesUrl = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=ecce4fd21f8b43138d926e3c808887b2&addRecipeInformation=true&number=200')
    const typesApi = typesUrl.data.results.map(el=> {if(el.diets.length===0)return el.diets=['vegan'];else return el.diets})
    
    
    const dietEach = typesApi.map(diet => {
        for (let i = 0; i < diet.length; i++) return diet[i]})
        
        console.log(dietEach, 'esto viene de la api')
        
    dietEach.forEach(diet => {
        Type.findOrCreate({
            where: { name: diet}
        })
    })
    const allDiets = await Type.findAll();
    res.send(allDiets);    
})


module.exports = router;

