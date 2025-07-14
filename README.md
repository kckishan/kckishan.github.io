# Kishan KC - Academic Portfolio

Personal academic portfolio website showcasing research publications, experience, and expertise in AI/ML, NLP, and Generative AI.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Interactive Publications**: Expandable abstracts with smooth animations
- **Performance Optimized**: Lazy loading, code splitting, and optimized images
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **SEO Optimized**: Meta tags, structured data, and performance metrics

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Analytics**: Google Analytics integration

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kishankc-portfolio.git
cd kishankc-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🏗️ Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🌐 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy!

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the contents of the `dist/` folder to your web server

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ContactForm.jsx
│   ├── ExperienceCard.jsx
│   ├── PublicationCard.jsx
│   ├── LazyImage.jsx
│   └── ErrorBoundary.jsx
├── data/               # Static data files
│   ├── experienceData.js
│   ├── projectData.js
│   └── publicationData.js
├── utils/              # Utility functions
│   └── readingTime.js
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Configuration

### Google Analytics

To enable Google Analytics, add your tracking ID to the `index.html` file:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Customization

- **Content**: Update data files in `src/data/` to modify publications, experience, and projects
- **Styling**: Modify `src/index.css` and Tailwind classes for custom styling
- **Images**: Replace images in `public/assets/` with your own

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- **Email**: kishankhatrichettri@gmail.com
- **LinkedIn**: [Kishan KC](https://www.linkedin.com/in/kishankc)
- **GitHub**: [@kckishan](https://github.com/kckishan)
- **Twitter**: [@kishan_kc07](https://twitter.com/kishan_kc07) 