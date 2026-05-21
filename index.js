import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'OPTIONS'],
   allowedHeaders: [
      'Content-Type',
      'Authorization'
   ]
}));

app.options('*', cors());

/*
|--------------------------------------------------------------------------
| JSON
|--------------------------------------------------------------------------
*/

app.use(express.json());

/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get('/healthy', (req, res) => {

   return res.status(200).json({
      status: 'API IS WORKING'
   });

});

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
               Authorization: `Bearer ${process.env.API_TOKEN}`,
               'Content-Type': 'application/json'
            }
         }
      );

      return res.status(200).json(response.data);

   } catch (error) {

      console.log(
         error.response?.data ||
         error.message
      );

      return res.status(
         error.response?.status || 500
      ).json({
         error: 'Erro ao criar pagamento',
         details: error.response?.data || error.message
      });

   }

});



const PORT = 6000;

app.listen(PORT, ()=>{
   console.log(`🌐 Backend público rodando`);
});