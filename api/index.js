//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { Type, conn } = require('./src/db.js');
let dietsStings= ['dairy free','gluten free','pescatarian','whole 30','lacto ovo vegetarian','primal','fodmap friendly','vegan','paleolithic', 'ketogenic']
const preCharge = async function (array){
  try{array.forEach(diet => {
    Type.findOrCreate({
        where: { name: diet}
    })
  })}catch{console.log('no sepudio')}
  
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {

  preCharge(dietsStings)
  
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});


