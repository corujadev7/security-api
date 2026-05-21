import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

/*
|--------------------------------------------------------------------------
| ROTA PUBLICA
|--------------------------------------------------------------------------
*/

app.post('/criar-pix', async (req,res)=>{

    console.log(process.env.API_TOKEN)

   try{

      const response = await axios.post(
         'http://localhost:5004/api/payment/process',
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

const PORT = 3000;

app.listen(PORT, ()=>{
   console.log(`🌐 Backend público rodando`);
});