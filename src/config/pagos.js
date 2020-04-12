// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-8175964347029356-041116-19cb43624f680230306c73a522b6eec2-206746350'
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: 'Servicio MadeMaker',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "$$init_point$$" en tu HTML
  global.init_point = response.body.init_point;
}).catch(function(error){
  console.log(error);
});

module.exports = mercadopago;