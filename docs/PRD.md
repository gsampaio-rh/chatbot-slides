# PRD: Chatbot-Driven Presentation Application

## 1. **Product Overview**

### **Product Name:**

TBD – working title: **SlideBot**

### **Description:**

SlideBot is a **React-based web application** that enables presenters to deliver presentations through a **local LLM-powered chatbot interface**. Instead of manually navigating slides, the presenter interacts with a conversational chatbot that **reads a Markdown (.md) file**, dynamically rendering slides, images, charts, videos, and comparisons.
The chatbot **responds to presenter clicks** or voice commands, making presentations more fluid, interactive, and intelligent.

### **Problem Statement:**

Traditional presentation tools like PowerPoint or Google Slides lack adaptability and interactivity. Presenters are limited to static slide navigation and manual control. With AI and local LLMs becoming mainstream in 2025, there is an opportunity to **transform presentations into dynamic, conversational experiences** while maintaining **privacy and offline capabilities**.

### **Primary Users:**

* **Corporate presenters** – for pitches, training, and internal meetings.
* **Educators** – for interactive teaching and demonstrations.
* **Conference speakers** – to deliver engaging, dynamic presentations.
* **Developers/Tech teams** – to integrate AI-powered storytelling in technical demos.

---

## 2. **Goals & Non-Goals**

### **Goals**

1. Provide a **chatbot-driven interface** for navigating and presenting Markdown-based slide decks.
2. Support **rich content rendering**: text, images, videos, charts, and comparisons.
3. Enable **privacy-first, local AI processing** using an LLM running on-device.
4. Allow **screen sharing** via built-in tools (e.g., WebRTC or browser APIs).
5. Optimize for **real-time, low-latency interactions** during live presentations.
6. Offer a seamless **React-based user interface** with modular components.

### **Non-Goals**

* Cloud-based AI inference (strictly local models).
* Real-time collaborative editing (future roadmap).
* Advanced analytics or tracking of audience behavior (future roadmap).

---

## 3. **Use Cases**

| **Use Case**                | **Description**                                                                                   | **Priority** |
| --------------------------- | ------------------------------------------------------------------------------------------------- | ------------ |
| Standard Presentation       | Presenter uses chatbot to navigate Markdown slides.                                               | P0           |
| Dynamic Content Loading     | Images, charts, and videos render on demand from local assets or embedded URLs.                   | P0           |
| Screen Sharing              | Presenter shares browser window to external participants (Zoom, Teams, etc.).                     | P1           |
| Comparison Mode             | Presenter requests AI-generated side-by-side comparisons (e.g., two charts or bullet point sets). | P1           |
| Offline Mode                | Entire application runs without internet access.                                                  | P0           |
| Markdown Update Auto-Reload | Application detects changes in the Markdown file and refreshes live.                              | P2           |

---

## 5. **Functional Requirements**

### **5.1 Markdown Slide Parsing**

* **Input**: Local `.md` file.
* **Features**:

  * Headings map to slide titles (`#` = slide title, `##` = section headers).
  * Inline images rendered using `![alt text](path/to/image)`.
  * Charts and videos embedded via special syntax, e.g.:

    ```md
    ![chart](data.json)
    ![video](path/to/video.mp4)
    ```
  * Custom tags for comparison:

    ```md
    :::compare
    - Option A
    - Option B
    :::
    ```

### **5.2 Chatbot Interface**

* Local LLM interaction:

  * Ollama or LLaMA2 running locally via WebAssembly or Python backend.
  * Ability to interpret presenter commands like:

    * `"Next slide"`, `"Go back"`, `"Summarize this slide"`.
    * `"Compare previous chart with current chart"`.
* Natural language explanations for complex data.

### **5.3 Rendering Engine**

* Built using **React** with modular components:

  * `<Slide />` – renders text and media dynamically.
  * `<ChatPanel />` – displays chatbot conversation.
  * `<ComparisonView />` – side-by-side visualizations.
  * `<Toolbar />` – controls for manual navigation.

### **5.4 Screen Sharing**

* Integration with WebRTC or browser API:

  * Share current presentation view.
  * Presenter’s chatbot interface remains private.

### **5.5 Offline Mode**

* Entire application functions without internet.
* Assets loaded from local disk or USB drive.

