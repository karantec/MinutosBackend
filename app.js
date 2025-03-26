const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const PortfolioRoutes=require('./routes/Portfolio.routes');
const ResumeRoutes=require('./routes/Resume.Routes');
const ProductRoutes=require('./routes/Products.routes');
const authenticationRoutes=require('./routes/User.routes');
const Job=require('./routes/Job.routes');
const TestimonialRoutes=require('./routes/Testimonial.routes')
const TeamRoutes=require('./routes/Team.routes')
const AboutRoutes=require('./routes/About.routes');
const ContactRoutes=require('./routes/Contact.routes');
const BrandRoutes=require('./routes/Partnership.routes');
const ServiceRoutes=require('./routes/Service.routes');
const PolicyRoutes=require('./routes/Privacy.routes');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Example route
app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});
app.use(cors());
app.use('/auth',authenticationRoutes)
app.use('/job',Job);
app.use('/about',AboutRoutes);
app.use('/contact', ContactRoutes);
app.use('/product',ProductRoutes);
app.use('/services',ServiceRoutes);
app.use('/portfolio',PortfolioRoutes)
app.use('/Brand',BrandRoutes);
app.use('/testimonial', TestimonialRoutes);
app.use('/teams',TeamRoutes)
app.use('/policy',PolicyRoutes);
app.use('/resume',ResumeRoutes)
// Middleware for handling 404 errors
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

// Connect to the database
connectDB();

// Function to log all routes with full URLs
const listRoutes = (app, baseUrl) => {
  console.log('📂 Available Routes:');
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Regular routes
      const method = Object.keys(middleware.route.methods).join(', ').toUpperCase();
      console.log(`${method} ${baseUrl}${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // Nested router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const method = Object.keys(handler.route.methods).join(', ').toUpperCase();
          console.log(`${method} ${baseUrl}${handler.route.path}`);
        }
      });
    }
  });
};

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`🚀 Server running at ${BASE_URL}`);
  listRoutes(app, BASE_URL); // Log all routes with full URLs
});
