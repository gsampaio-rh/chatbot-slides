# SlideBot Architecture Documentation

## System Overview

SlideBot is a modern React-based web application that transforms traditional presentations into interactive, AI-driven experiences. The architecture is designed with privacy-first principles, offline capabilities, and real-time performance in mind.

---

## **Architecture Principles**

### **Core Principles**
1. **Privacy-First**: All AI processing happens locally, no data leaves the user's device
2. **Offline-Capable**: Full functionality without internet connectivity
3. **Real-Time Performance**: < 100ms slide navigation, < 2s AI response times
4. **Modular Design**: Component-based architecture for maintainability and extensibility
5. **Progressive Enhancement**: Graceful degradation when advanced features aren't available

### **Technology Stack**
- **Frontend**: React 18+ with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds
- **AI/ML**: Ollama or LLaMA2 via WebAssembly or Python backend
- **Charts**: Chart.js with React wrapper
- **Media**: Native HTML5 video/audio with fallbacks
- **Screen Sharing**: WebRTC with browser API fallbacks

---

## **System Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Presentation  │  │   Chat Panel    │  │   Toolbar       │ │
│  │   Viewer        │  │   Component     │  │   Component     │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Slide         │  │   Media         │  │   Comparison    │ │
│  │   Component     │  │   Renderer      │  │   View          │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                     State Management                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Presentation  │  │   Chat Store    │  │   UI Store      │ │
│  │   Store         │  │                 │  │                 │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│                       Core Services                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   Markdown      │  │   AI Service    │  │   Media         │ │
│  │   Parser        │  │                 │  │   Service       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   File System   │  │   Screen Share  │  │   Cache         │ │
│  │   Service       │  │   Service       │  │   Service       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                                │
                                │ WebAssembly/HTTP
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                     Local AI Backend                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │   LLM Engine    │  │   Model         │  │   Context       │ │
│  │   (OLLAMA)     │  │   Manager       │  │   Manager       │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## **Component Architecture**

### **Core Components**

#### **App Component**
```typescript
interface AppProps {
  // Root application component
}

// Responsibilities:
// - Route management
// - Global state initialization
// - Error boundary setup
// - Theme provider
```

#### **PresentationViewer**
```typescript
interface PresentationViewerProps {
  presentationId: string;
  mode: 'presenter' | 'audience';
}

// Responsibilities:
// - Main presentation layout
// - Slide rendering coordination
// - Navigation handling
// - Screen sharing integration
```

#### **SlideComponent**
```typescript
interface SlideProps {
  slide: SlideData;
  isActive: boolean;
  transitionType?: 'fade' | 'slide' | 'none';
}

// Responsibilities:
// - Individual slide rendering
// - Media content display
// - Animation handling
// - Accessibility features
```

#### **ChatPanel**
```typescript
interface ChatPanelProps {
  isVisible: boolean;
  onToggle: () => void;
  presentationContext: PresentationContext;
}

// Responsibilities:
// - Chat interface rendering
// - Message history management
// - AI interaction handling
// - Command parsing
```

#### **MediaRenderer**
```typescript
interface MediaRendererProps {
  type: 'image' | 'video' | 'chart';
  source: string | ChartData;
  alt?: string;
  options?: MediaOptions;
}

// Responsibilities:
// - Multi-format media support
// - Lazy loading
// - Error handling
// - Responsive sizing
```

---

## **Data Flow Architecture**

### **State Management Structure**

```typescript
// Root State Interface
interface RootState {
  presentation: PresentationState;
  chat: ChatState;
  ui: UIState;
  media: MediaState;
}

// Presentation State
interface PresentationState {
  currentSlide: number;
  slides: SlideData[];
  metadata: PresentationMetadata;
  isLoading: boolean;
  error?: string;
}

// Chat State
interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  aiModel: AIModelConfig;
  context: PresentationContext;
}

// UI State
interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  fullscreen: boolean;
  screenSharing: boolean;
}
```

### **Data Flow Patterns**

1. **User Actions** → **Action Creators** → **Reducers** → **State Updates** → **Component Re-renders**
2. **File Upload** → **Parser Service** → **Slide Generation** → **State Update** → **UI Refresh**
3. **Chat Input** → **AI Service** → **Response Processing** → **State Update** → **UI Update**

---

## **Service Layer Architecture**

### **MarkdownParser Service**

```typescript
interface MarkdownParserService {
  parseFile(file: File): Promise<ParsedPresentation>;
  parseContent(content: string): ParsedPresentation;
  extractMedia(content: string): MediaAsset[];
  validateSyntax(content: string): ValidationResult;
}

// Features:
// - Custom markdown extensions for slides
// - Media asset extraction
// - Chart data parsing
// - Comparison syntax support
```

### **AI Service**

```typescript
interface AIService {
  initialize(): Promise<void>;
  sendMessage(message: string, context: PresentationContext): Promise<string>;
  processCommand(command: string): Promise<CommandResult>;
  generateSummary(slide: SlideData): Promise<string>;
  compareSlides(slide1: SlideData, slide2: SlideData): Promise<string>;
}

// Implementation Options:
// - WebAssembly Ollama integration
// - Python backend with REST API
// - Local model switching capability
```

### **FileSystem Service**

```typescript
interface FileSystemService {
  loadFile(): Promise<File>;
  watchFile(path: string, callback: (content: string) => void): void;
  cacheAssets(assets: MediaAsset[]): Promise<void>;
  loadCachedAsset(path: string): Promise<Blob>;
}

// Features:
// - File API integration
// - Hot reload support
// - Asset caching for offline use
// - Security-conscious file handling
```

### **ScreenShare Service**

```typescript
interface ScreenShareService {
  startSharing(): Promise<MediaStream>;
  stopSharing(): void;
  isSupported(): boolean;
  getShareableWindow(): Promise<Window>;
}

// Implementation:
// - WebRTC screen capture
// - Browser compatibility detection
// - Fallback sharing options
// - Privacy-aware sharing modes
```

---

## **Performance Architecture**

### **Optimization Strategies**

#### **Component Level**
- **React.memo**: Prevent unnecessary re-renders
- **useMemo/useCallback**: Memoize expensive calculations
- **Lazy Loading**: Dynamic imports for code splitting
- **Virtual Scrolling**: For large slide collections

#### **Asset Management**
- **Image Optimization**: WebP format with fallbacks
- **Video Streaming**: Progressive loading and buffering
- **Chart Caching**: Pre-computed chart renders
- **Asset Compression**: Gzip/Brotli compression

#### **State Management**
- **Normalized State**: Flat state structure for performance
- **Selective Updates**: Granular state subscriptions
- **Batched Updates**: Group related state changes
- **Persistent Storage**: IndexedDB for offline caching

### **Memory Management**

```typescript
// Resource cleanup patterns
useEffect(() => {
  const cleanup = () => {
    // Clean up event listeners
    // Release media resources
    // Cancel pending requests
  };
  
  return cleanup;
}, []);

// Lazy component loading
const ChatPanel = lazy(() => import('./components/ChatPanel'));
const MediaRenderer = lazy(() => import('./components/MediaRenderer'));
```

---

## **Security Architecture**

### **Client-Side Security**

#### **File Handling**
- **MIME Type Validation**: Strict file type checking
- **Size Limits**: Prevent memory exhaustion
- **Sandboxed Execution**: Isolated file processing
- **Content Validation**: Malicious content detection

#### **AI Security**
- **Local Processing**: No data transmission to external services
- **Model Validation**: Verify model integrity
- **Input Sanitization**: Clean user inputs before AI processing
- **Context Isolation**: Separate AI contexts per presentation

#### **Screen Sharing**
- **Permission Management**: Explicit user consent
- **Content Filtering**: Prevent sensitive information leakage
- **Session Management**: Secure sharing session handling

### **Data Privacy**

```typescript
// Privacy-first data handling
interface PrivacyConfig {
  localProcessingOnly: boolean;
  encryptCachedData: boolean;
  clearDataOnExit: boolean;
  anonymizeAnalytics: boolean;
}

// Implementation ensures:
// - No data leaves the local environment
// - Encrypted local storage
// - Automatic data cleanup
// - Privacy-compliant analytics
```

---

## **Deployment Architecture**

### **Build Configuration**

```typescript
// Vite configuration for optimal builds
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ai: ['./src/services/aiService'],
          charts: ['chart.js', 'react-chartjs-2']
        }
      }
    }
  },
  plugins: [
    react(),
    serviceWorker(), // Offline support
    webAssembly()    // AI model support
  ]
});
```

### **Progressive Web App**

```typescript
// Service Worker for offline functionality
interface ServiceWorkerConfig {
  cacheStrategy: 'networkFirst' | 'cacheFirst';
  assets: string[];
  version: string;
}

// Features:
// - Offline presentation capability
// - Asset caching
// - Update notifications
// - Background sync
```

---

## **Testing Architecture**

### **Testing Strategy**

#### **Unit Tests**
- **Component Testing**: React Testing Library
- **Service Testing**: Jest with mocks
- **Utility Testing**: Pure function testing
- **Hook Testing**: Custom hook validation

#### **Integration Tests**
- **State Management**: Redux store integration
- **AI Service**: Mock AI responses
- **File Processing**: End-to-end parsing
- **Media Rendering**: Cross-browser compatibility

#### **E2E Tests**
- **Presentation Flow**: Complete user journeys
- **Chat Interactions**: AI conversation flows
- **Screen Sharing**: Multi-browser testing
- **Performance**: Load time and responsiveness

### **Test Configuration**

```typescript
// Jest configuration
export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

---

## **Monitoring & Observability**

### **Performance Monitoring**

```typescript
// Performance metrics collection
interface PerformanceMetrics {
  slideTransitionTime: number;
  aiResponseTime: number;
  mediaLoadTime: number;
  memoryUsage: number;
}

// Implementation:
// - Web Vitals integration
// - Custom performance marks
// - Memory usage tracking
// - Error boundary monitoring
```

### **Error Handling**

```typescript
// Comprehensive error handling
interface ErrorHandling {
  errorBoundaries: ComponentErrorBoundary[];
  serviceErrors: ServiceErrorHandler[];
  aiErrors: AIErrorHandler[];
  networkErrors: NetworkErrorHandler[];
}

// Features:
// - Graceful degradation
// - User-friendly error messages
// - Automatic error recovery
// - Debug information collection
```

---

## **Future Architecture Considerations**

### **Scalability**
- **Module Federation**: Micro-frontend architecture for larger teams
- **Web Workers**: Offload heavy processing to background threads
- **Streaming**: Real-time slide updates and collaboration
- **CDN Integration**: Global asset distribution

### **Extensibility**
- **Plugin System**: Third-party extension support
- **Theme Engine**: Custom presentation themes
- **API Layer**: External service integration
- **Component Library**: Reusable UI components

### **Advanced Features**
- **Real-time Collaboration**: Multi-user presentation editing
- **Advanced Analytics**: Presentation engagement metrics
- **Voice Recognition**: Speech-to-text for hands-free control
- **Mobile Companion**: Presenter remote control app

---

This architecture provides a solid foundation for building a scalable, maintainable, and performant chatbot-driven presentation application while maintaining the core principles of privacy, offline capability, and real-time performance.
