const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/db');
const productsRoutes = require('./routes/productsRoutes')
const router = express();
const port = process.env.PORT || 5000;
//middleware
router.use(cors());
router.use(express.json());
router.get('/',(req,res) =>{
    res.send('server is running');
})
//DB Connection
dbConnect();
//products router
router.use('/',productsRoutes);

router.listen(port,() =>{
    console.log('listening on port',port)
})