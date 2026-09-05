require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));


// DB connect
mongoose.connect(process.env.DB_URL)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});