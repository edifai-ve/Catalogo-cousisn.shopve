const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tu-frontend.railway.app'] 
    : ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;