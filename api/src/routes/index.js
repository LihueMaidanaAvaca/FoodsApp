const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;
const axios = require ('axios')
const { Recipe, Type } = require ('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=19022f25000d41f9b5b20fa4efc787e1&addRecipeInformation=true&number=100`);
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
    const typesUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=19022f25000d41f9b5b20fa4efc787e1&addRecipeInformation=true&number=100`)
    const typesApi = typesUrl.data.results.map(el=> {if(el.diets.length===0)return el.diets=['vegan'];else return el.diets})
    
    let dietsStings= []
    const dietEach = typesApi.map(diet => {
        for (let i = 0; i < diet.length; i++) dietsStings.push(diet[i])})
        
        console.log(dietsStings, 'esto viene de la ap')
        
    dietsStings.forEach(diet => {
        Type.findOrCreate({
            where: { name: diet}
        })
    })
    const allDiets = await Type.findAll();
    res.send(allDiets);    
})

router.get('/recipes/:id', async (req, res)=>{
    const id= req.params.id;
    const recipesTotal = await getAllRecipe()
    if(id){
        let recipeID = await recipesTotal.filter(el => el.id == id)
        recipeID.length?
        res.status(200).json(recipeID) :
        res.status(404).send('this is not found :(')
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
        console.log('aca estas mas cerca del error', tDB)
    recipeCreated.addType( tDB[0]) })
    console.log('esto y ya esta' ,recipeCreated)
    res.json(recipeCreated)
})


module.exports = router;

// router.put('/:breedId', (req, res) => {});

// //PUT
// //////////////////////////////////////////////////////////////////////////////////
// //DELETE

// router.delete('/:breedId', (req, res, next) => {
//     const {breedId} = req.params;
//     try {
//         Dog.destroy({where: {id: breedId}});
//         res.sendStatus(200);
//     } catch (err) {
//         next(err);
//     }
// });