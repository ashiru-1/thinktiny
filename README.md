# ThinkTiny - Learn Complex Topics Simply

ThinkTiny is an AI-powered learning tool that explains complex topics at three different levels: 5-year-old, 15-year-old, and expert. It features a beautiful timeline interface that highlights the differences between explanations side-by-side.

## Features

- **Multi-Level Explanations**: Get explanations tailored for different age groups and expertise levels
- **Timeline View**: Visual learning progression from simple to complex
- **Side-by-Side Comparison**: Compare all three levels simultaneously
- **Copy to Clipboard**: Easy sharing of individual explanations
- **Modern UI**: Beautiful, responsive design with dark mode support
- **AI-Powered**: Uses OpenAI GPT-4 for intelligent, contextual explanations

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **AI**: OpenAI GPT-4 API
- **Utilities**: clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd thinktiny
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Input a Topic**: Paste any complex topic in the text area (e.g., "quantum physics", "machine learning", "climate change")

2. **Generate Explanations**: Click "Explain" or press ⌘+Enter to generate explanations

3. **View Results**: 
   - **Timeline View**: See explanations in a learning progression
   - **Side-by-Side View**: Compare all levels simultaneously

4. **Copy Explanations**: Click the copy icon on any explanation to copy it to your clipboard

## Project Structure

```
app/
├── components/
│   ├── TopicInput.tsx          # Topic input form
│   ├── ExplanationDisplay.tsx  # Main display component
│   └── LoadingSpinner.tsx      # Loading animation
├── api/
│   └── explain/
│       └── route.ts           # OpenAI API integration
├── lib/
│   └── utils.ts              # Utility functions
├── globals.css               # Global styles
├── layout.tsx                # Root layout
└── page.tsx                  # Main page
```

## API Integration

The application uses OpenAI's GPT-4 model to generate explanations. The API route (`/api/explain`) takes a topic and returns three explanations:

```typescript
{
  child: string;   // 5-year-old level explanation
  teen: string;    // 15-year-old level explanation  
  expert: string;  // Expert level explanation
}
```

## Customization

### Adding New Explanation Levels

To add more explanation levels, modify the `levels` array in `ExplanationDisplay.tsx` and update the API prompt in `route.ts`.

### Styling

The application uses Tailwind CSS with a custom color scheme. You can modify the colors in the `getColorClasses` and `getIconColor` functions in `ExplanationDisplay.tsx`.

### AI Model

To use a different AI model, update the `model` parameter in the OpenAI API call in `route.ts`.

## Deployment

The application can be deployed to Vercel, Netlify, or any other Next.js-compatible platform.

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Built with Next.js and OpenAI
- Icons from Lucide React
- Styling with Tailwind CSS
