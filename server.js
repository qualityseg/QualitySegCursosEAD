const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(cors());
app.use(express.json());

// Configure suas credenciais do Mercado Pago
mercadopago.configure({
  access_token: 'APP_USR-2684905602430236-052513-9eece6d19d92891e0f385f8ad4816f6d-135153905',
});

app.post('/create_preference', async (req, res) => {
  const { title, price, quantity } = req.body;

  const preference = {
    items: [
      {
        title,
        unit_price: Number(price),
        quantity: Number(quantity),
      },
    ],
  };

  try {
    const response = await mercadopago.preferences.create(preference); // Correção aqui
    res.json({ id: response.body.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
