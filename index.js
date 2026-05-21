import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'OPTIONS'],
   allowedHeaders: [
      'Content-Type',
      'Authorization'
   ]
}));

app.use(express.json());

/*
|--------------------------------------------------------------------------
| ROTA PUBLICA
|--------------------------------------------------------------------------
*/

app.post('/criar-pix', async (req, res) => {


   try {

      const response = await axios.post(
         'https://reviewcarros.top/api/payment/process',
         req.body,
         {
            headers: {
               Authorization: `Bearer ${process.env.API_TOKEN}`
            }
         }
      );

      return res.json(response.data);

   } catch (error) {

      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });

   }

});

app.get('/gateways', async (req, res) => {
   try {
      const response = await axios.get('https://reviewcarros.top/api/gateways', {
         headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
         }
      })
      return res.json(response.data);
   } catch (error) {
      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });
   }
})

app.get('/payments', async (req, res) => {
   try {
      const response = await axios.get('https://reviewcarros.top/api/payments', {
         headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
         }
      })
      return res.json(response.data);
   } catch (error) {
      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });
   }
})

app.get('/payment/:txid', async (req, res) => {

   const { txid } = req.params
   try {
      const response = await axios.get(`https://reviewcarros.top/api/payment/${txid}`, {
         headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
         }
      })
      return res.json(response.data);
   } catch (error) {
      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });
   }
})

app.get('/payment-stats', async (req, res) => {
   try {
      const response = await axios.get('https://reviewcarros.top/api/payment-stats', {
         headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
         }
      })
      return res.json(response.data);
   } catch (error) {
      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });
   }
})

//configuracoes

app.get('/config/active-gateway', async (req, res) => {
   try {
      const response = await axios.get('https://reviewcarros.top/api/config/active-gateway', {
         headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
         }
      })
      return res.json(response.data);
   } catch (error) {
      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });
   }
})

app.get('/config/pix-key', async (req, res) => {
   try {
      const response = await axios.get('https://reviewcarros.top/api/config/pix-key', {
         headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
         }
      })
      return res.json(response.data);
   } catch (error) {
      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });
   }
})


app.post('/config/pix-key', async (req, res) => {
   try {
      const response = await axios.get('https://reviewcarros.top/api/config/pix-key',
         req.body,
         {
            headers: {
               Authorization: `Bearer ${process.env.API_TOKEN}`
            }
         })
      return res.json(response.data);
   } catch (error) {
      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });
   }
})


app.post('/config/active-gateway', async (req, res) => {
   try {
      const response = await axios.get('https://reviewcarros.top/api/config/active-gateway',
         req.body,
         {
            headers: {
               Authorization: `Bearer ${process.env.API_TOKEN}`
            }
         })
      return res.json(response.data);
   } catch (error) {
      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error: 'Erro ao criar pagamento'
      });
   }
})
app.get('/healthy', (req, res) => {
   return res.json('API IS WORKING')
})
const PORT = 6000;

app.listen(PORT, () => {
   console.log(`🌐 Backend público rodando`);
});