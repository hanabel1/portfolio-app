# Portfolio App

A professional portfolio website built with Express.js, featuring a modern design and responsive layout.

## Features

- **Modern Design**: Clean, professional design with gradient backgrounds and smooth animations
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Multiple Pages**: Home, About, and Projects pages with proper routing
- **Interactive Elements**: Hover effects, smooth transitions, and dynamic navigation
- **Professional Styling**: Beautiful CSS with modern design principles

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
- `npm test`: Run tests (placeholder)

## License

ISC License 