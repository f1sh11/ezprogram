require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 中间件设置
app.use(express.json());        // 解析 JSON 请求体
app.use(cors());                // 允许跨域请求

// 连接 MongoDB 数据库
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    // 只有当数据库连接成功后才启动服务器
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })

  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
  app.get("/", (req, res) => {
    res.send("Server is running.");
  });
  
// 路由配置
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);