# SlideBot 🤖📊

> Transform your presentations into interactive, AI-driven experiences with privacy-first, offline-capable technology.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Version](https://img.shields.io/badge/version-1.0.0--alpha-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)]()

## 🚀 What is SlideBot?

SlideBot is a revolutionary **React-based web application** that enables presenters to deliver presentations through a **local LLM-powered chatbot interface**. Instead of manually clicking through slides, you interact with an intelligent assistant that reads your Markdown files and dynamically renders slides, images, charts, videos, and comparisons.

### ✨ Key Features

- 🤖 **AI-Powered Navigation**: Control presentations through natural language
- 🔒 **Privacy-First**: All AI processing happens locally - no data leaves your device
- 📱 **Offline Capable**: Full functionality without internet connectivity
- 🎨 **Rich Media Support**: Images, videos, charts, and interactive comparisons
- 📺 **Screen Sharing**: Built-in sharing for remote presentations
- ⚡ **Real-Time Performance**: < 100ms slide navigation, < 2s AI responses
- 📝 **Markdown-Based**: Use simple Markdown files as your presentation source

---

## 🎯 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Modern browser** with WebAssembly support

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/slidebot.git
cd slidebot

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see SlideBot in action!

### Your First Presentation

1. Create a simple Markdown file (`my-presentation.md`):

```markdown
# Welcome to SlideBot

This is my first AI-powered presentation!

## Features

- **Smart Navigation**: Just ask the AI to go to any slide
- **Rich Content**: Images, videos, and charts work seamlessly
- **Offline Ready**: No internet? No problem!

## Chart Example

![chart](sales-data.json)

## Video Demo

![video](demo-video.mp4)

## Comparison

:::compare
### Option A
- Fast implementation
- Lower cost
- Basic features

### Option B
- Comprehensive solution
- Higher investment
- Advanced capabilities
:::
```

2. Load the file in SlideBot
3. Start chatting with your AI assistant:
   - "Go to the next slide"
   - "Show me the chart on slide 3"
   - "Compare the two options"
   - "Summarize this presentation"

---

## 🛠️ Development

### Project Structure

```
slidebot/
├── src/
│   ├── components/          # React components
│   │   ├── presentation/    # Slide and presentation components
│   │   ├── chat/           # Chatbot interface components
│   │   ├── media/          # Media rendering components
│   │   └── ui/             # Shared UI components
│   ├── services/           # Core services
│   │   ├── aiService.ts    # Local LLM integration
│   │   ├── markdown.ts     # Markdown parsing
│   │   ├── media.ts        # Media handling
│   │   └── screenShare.ts  # Screen sharing
│   ├── store/              # Redux state management
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript definitions
├── docs/                   # Documentation
│   ├── PRD.md             # Product Requirements
│   ├── ARCHITECTURE.md     # Technical architecture
│   └── ROADMAP.md         # Development roadmap
├── public/                 # Static assets
└── tests/                  # Test files
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
npm run coverage     # Generate test coverage

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier

# AI Setup
npm run setup-ai     # Download and configure local AI models
```

### Environment Setup

Create a `.env.local` file in the project root:

```bash
# AI Configuration
VITE_AI_MODEL=Ollama-j-v1.3-groovy
VITE_AI_MODEL_PATH=./models/
VITE_AI_MAX_TOKENS=512

# Development
VITE_DEV_MODE=true
VITE_DEBUG_AI=false

# Performance
VITE_SLIDE_TRANSITION_DURATION=300
VITE_AI_RESPONSE_TIMEOUT=5000
```

---

## 📚 Documentation

### Core Concepts

#### **Markdown Syntax**

SlideBot extends standard Markdown with presentation-specific features:

```markdown
# Slide Title
## Section Header
Regular text, **bold**, *italic*, and [links](url)

### Images
![Alt text](path/to/image.png)

### Videos
![video](path/to/video.mp4)

### Charts
![chart](data.json)

### Comparisons
:::compare
Left side content
:::
:::compare
Right side content
:::
```

#### **AI Commands**

Interact with your presentation using natural language:

| Command | Example | Description |
|---------|---------|-------------|
| Navigation | "Go to slide 3", "Next slide", "Previous" | Navigate between slides |
| Summary | "Summarize this slide", "What's the main point?" | Get AI-generated summaries |
| Comparison | "Compare slides 2 and 5", "Show differences" | AI-powered content comparison |
| Search | "Find the chart about sales", "Show revenue slide" | Search presentation content |

#### **Media Support**

- **Images**: PNG, JPG, SVG, WebP
- **Videos**: MP4, WebM, OGG
- **Charts**: JSON data with Chart.js rendering
- **Audio**: MP3, WAV, OGG (auto-play controls)

### API Reference

#### **Core Services**

##### MarkdownParser

```typescript
import { MarkdownParser } from '@/services/markdown';

const parser = new MarkdownParser();
const presentation = await parser.parseFile(file);
```

##### AIService

```typescript
import { AIService } from '@/services/aiService';

const ai = new AIService();
await ai.initialize();
const response = await ai.sendMessage("Go to next slide", context);
```

##### ScreenShareService

```typescript
import { ScreenShareService } from '@/services/screenShare';

const screenShare = new ScreenShareService();
const stream = await screenShare.startSharing();
```

---

## 🔧 Configuration

### AI Model Configuration

SlideBot supports multiple local AI models. Configure in `src/config/ai.ts`:

```typescript
export const aiConfig = {
  model: 'Ollama-j-v1.3-groovy', // Default model
  modelPath: './models/',          // Model storage path
  maxTokens: 512,                  // Response length limit
  temperature: 0.7,                // Response creativity
  contextWindow: 2048,             // Context memory size
};
```

### Presentation Themes

Customize the look and feel in `src/config/themes.ts`:

```typescript
export const themes = {
  default: {
    primary: '#3B82F6',
    secondary: '#10B981',
    background: '#FFFFFF',
    text: '#1F2937',
    slideTransition: 'fade',
  },
  dark: {
    primary: '#60A5FA',
    secondary: '#34D399',
    background: '#111827',
    text: '#F9FAFB',
    slideTransition: 'slide',
  },
};
```

---

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to static hosting
npm run deploy
```

### Deployment Options

#### **Static Hosting**
- **Netlify**: Drag and drop `dist` folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Use GitHub Actions workflow

#### **Self-Hosted**
```bash
# Using Docker
docker build -t slidebot .
docker run -p 3000:3000 slidebot

# Using nginx
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

### Environment Variables

Production environment variables:

```bash
# Required
VITE_AI_MODEL_PATH=/app/models/
VITE_ENABLE_ANALYTICS=false

# Optional
VITE_SENTRY_DSN=your-sentry-dsn
VITE_GA_TRACKING_ID=your-ga-id
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Airbnb configuration
- **Prettier**: Code formatting
- **Husky**: Pre-commit hooks
- **Conventional Commits**: Commit message format

### Testing

```bash
# Run all tests
npm test

# Test specific component
npm test -- --testNamePattern="SlideComponent"

# Update snapshots
npm test -- --updateSnapshot
```

---

## 📈 Roadmap

### Current Version (v1.0.0-alpha)
- ✅ Basic markdown parsing
- ✅ AI chatbot interface
- ✅ Media rendering
- ✅ Screen sharing
- 🔄 Local AI integration (in progress)

### Upcoming Features (v1.1.0)
- 🔜 Voice command support
- 🔜 Advanced chart types
- 🔜 Presentation templates
- 🔜 Mobile presenter app

### Future Roadmap (v2.0.0+)
- 📅 Real-time collaboration
- 📅 Advanced analytics
- 📅 Cloud sync (optional)
- 📅 Plugin ecosystem

See our detailed [Development Roadmap](docs/ROADMAP.md) for more information.

---

## 🐛 Troubleshooting

### Common Issues

#### **AI Model Loading Issues**
```bash
# Download required models
npm run setup-ai

# Check model path
ls -la ./public/models/

# Verify model format
file ./public/models/Ollama-j-v1.3-groovy.bin
```

#### **Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+

# Update dependencies
npm update
```

#### **Performance Issues**
```bash
# Enable production mode
export NODE_ENV=production

# Optimize bundle size
npm run analyze

# Check memory usage
npm run profile
```

### Getting Help

- 📖 **Documentation**: Check our [docs](docs/) folder
- 💬 **Discussions**: GitHub Discussions for questions
- 🐛 **Bug Reports**: GitHub Issues for bugs
- 💡 **Feature Requests**: GitHub Issues with enhancement label

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **Ollama**: For local AI capabilities
- **Chart.js**: For beautiful data visualizations
- **Tailwind CSS**: For rapid UI development
- **Vite**: For lightning-fast development experience

---

## 📞 Contact

- **Project Lead**: [Your Name](mailto:your.email@example.com)
- **GitHub**: [@your-username](https://github.com/your-username)
- **Website**: [slidebot.dev](https://slidebot.dev)
- **Twitter**: [@slidebot](https://twitter.com/slidebot)

---

<div align="center">

**Made with ❤️ by the SlideBot Team**

[⭐ Star this project](https://github.com/your-org/slidebot) if you find it useful!

</div>
