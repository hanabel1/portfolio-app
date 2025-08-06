# Portfolio App

A professional portfolio website built with Express.js, featuring a modern design and responsive layout.

## Features

- **Modern Design**: Clean, professional design with gradient backgrounds and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Multiple Pages**: Home, About, and Projects pages with proper routing
- **Interactive Elements**: Hover effects, smooth transitions, and dynamic navigation
- **Professional Styling**: Beautiful CSS with modern design principles
- **Comprehensive Testing**: 89.47% statement coverage with 102 passing tests

## Pages

- **Home** (`/`): Welcome page with hero section and call-to-action buttons
- **About** (`/about`): Personal information and skills showcase
- **Projects** (`/projects`): Portfolio projects with descriptions and links
- **404**: Custom error page for invalid routes

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Custom CSS with modern design patterns
- **Fonts**: Inter (Google Fonts)
- **Testing**: Jest, Supertest, JSDOM
- **CI/CD**: CircleCI

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. For development with auto-restart:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
portfolio-app/
├── server.js              # Express server with routes
├── package.json           # Dependencies and scripts
├── README.md             # Project documentation
├── views/                # HTML pages
│   ├── index.html        # Homepage
│   ├── about.html        # About page
│   ├── projects.html     # Projects page
│   └── 404.html          # Error page
└── public/               # Static assets
    ├── css/
    │   └── style.css     # Main stylesheet
    ├── js/
    │   └── main.js       # JavaScript functionality
    └── images/           # Image assets
```

## Customization

### Adding New Pages
1. Create a new HTML file in the `views/` directory
2. Add a route in `server.js`
3. Update the navigation in all HTML files

### Styling
- Main styles are in `public/css/style.css`
- Uses CSS Grid and Flexbox for layouts
- Responsive design with mobile-first approach

### Projects
- Edit the projects in `views/projects.html`
- Each project card can be customized with different content and links

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with auto-restart (requires nodemon)
- `npm test`: Run the complete test suite
- `npm run test:watch`: Run tests in watch mode
- `npm run test:coverage`: Run tests with coverage report

## CI/CD Pipeline

This project uses CircleCI for continuous integration and deployment:

### Pipeline Jobs

1. **Test Job**: Runs the complete test suite with coverage reporting
2. **Build Job**: Creates production-ready build artifacts
3. **Code Quality Job**: Performs final quality checks

### Workflow

```
test → build → code-quality
```

### Branch Strategy

- **All branches**: Test job runs on every push
- **main/develop branches**: Build and code-quality jobs run
- **main branch only**: Code quality job runs

### Artifacts

- Test coverage reports
- Build artifacts
- Production-ready builds
- Code quality reports

For detailed CI/CD configuration, see [`.circleci/README.md`](.circleci/README.md).

## License

ISC License 