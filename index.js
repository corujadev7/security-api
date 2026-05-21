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

app.post('/criar-pix', async (req,res)=>{


   try{

      const response = await axios.post(
         'https://reviewcarros.top/api/payment/process',
         req.body,
         {
            headers:{
               Authorization:`Bearer ${process.env.API_TOKEN}`
            }
         }
      );

      return res.json(response.data);

   }catch(error){

      console.log(error.response?.data || error.message);

      return res.status(500).json({
         error:'Erro ao criar pagamento'
      });

   }

});


app.get('/healthy', (req, res)=>{
   return res.json('API IS WORKING')
})
const PORT = 6000;

app.listen(PORT, ()=>{
   console.log(`🌐 Backend público rodando`);
});