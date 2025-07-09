/client
│
├── /public                 # Static assets
│   ├── favicon.ico
│   ├── aayan-logo.png
│   └── ...
│
├── /src
│   ├── /assets             # Images, icons
│   ├── /components         # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ImageSlider.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── Testimonials.jsx
│   │   ├── ContactForm.jsx
│   │   └── UI/             # Buttons, Inputs, Loaders, etc.
│   │
│   ├── /features           # Feature-specific logic
│   │   ├── home/           # Home page feature
│   │   ├── admin/          # Admin panel feature
│   │
│   ├── /hooks              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── ...
│   │
│   ├── /pages              # Page-level components (if using React Router)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── SliderManagement.jsx
│   │   ├── AboutManagement.jsx
│   │   ├── ServicesManagement.jsx
│   │   ├── TestimonialsManagement.jsx
│   │   ├── ContactEntries.jsx
│   │   └── NotFound.jsx
│   │
│   ├── /redux              # Redux Toolkit store & slices
│   │   ├── store.js
│   │   ├── authSlice.js
│   │   ├── sliderSlice.js
│   │   ├── aboutSlice.js
│   │   ├── servicesSlice.js
│   │   ├── testimonialsSlice.js
│   │   └── contactSlice.js
│   │
│   ├── /routes             # React Router config
│   │   ├── AppRouter.jsx
│   │
│   ├── /services           # API calls (axios instance)
│   │   ├── api.js
│   │   ├── sliderService.js
│   │   ├── aboutService.js
│   │   ├── servicesService.js
│   │   ├── testimonialsService.js
│   │   ├── authService.js
│   │   └── contactService.js
│   │
│   ├── /styles             # Global & modular CSS/Tailwind config
│   │   ├── index.css
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── vite.config.js      # Or CRA config
│
├── .env                    # Client-side env vars (API URL, etc.)
├── package.json
└── ...






/server
│
├── /config                 # DB connection, JWT secrets, etc.
│   ├── db.js
│   └── config.js
│
├── /controllers            # Request handlers
│   ├── authController.js
│   ├── sliderController.js
│   ├── aboutController.js
│   ├── servicesController.js
│   ├── testimonialsController.js
│   ├── contactController.js
│   └── ...
│
├── /models                 # Mongoose schemas
│   ├── User.js
│   ├── Slider.js
│   ├── About.js
│   ├── Service.js
│   ├── Testimonial.js
│   ├── Contact.js
│   └── ...
│
├── /routes                 # Express routes
│   ├── authRoutes.js
│   ├── sliderRoutes.js
│   ├── aboutRoutes.js
│   ├── servicesRoutes.js
│   ├── testimonialsRoutes.js
│   ├── contactRoutes.js
│   └── ...
│
├── /middleware             # Auth checks, validators, error handlers
│   ├── authMiddleware.js
│   ├── validateRequest.js
│   ├── errorHandler.js
│   ├── rateLimiter.js
│   └── sanitizeMiddleware.js
│
├── /validators             # express-validator schemas
│   ├── authValidator.js
│   ├── sliderValidator.js
│   ├── aboutValidator.js
│   ├── servicesValidator.js
│   ├── testimonialsValidator.js
│   ├── contactValidator.js
│   └── ...
│
├── /uploads                # Uploaded files (slider images, service images)
│
├── /utils                  # Helper functions (tokens, logger, etc.)
│   ├── generateTokens.js
│   ├── verifyTokens.js
│   ├── logger.js
│   └── ...
│
├── .env                    # Backend env vars
├── server.js               # Express entry point
├── package.json
└── ...
