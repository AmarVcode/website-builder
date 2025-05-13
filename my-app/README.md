# Drag-and-Drop Website Builder

A modern, intuitive website builder that allows users to create websites through a drag-and-drop interface. Built with React and TypeScript.

## Features

- Drag-and-drop interface for building websites
- Real-time element property editing
- Support for multiple element types (text, images, buttons)
- Responsive design for both desktop and mobile
- Clean and modern UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd website-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The application will be available at `http://localhost:3000`.

## Usage

1. Drag elements from the left panel onto the canvas
2. Click on any element to select it
3. Use the right panel to edit the selected element's properties
4. Drag elements within the canvas to reorder them

## Built With

- React
- TypeScript
- react-beautiful-dnd
- styled-components
- TailwindCSS

## Project Structure

```
src/
  ├── components/
  │   ├── BuilderCanvas.tsx    # Main canvas component
  │   ├── ElementPanel.tsx     # Left panel with draggable elements
  │   └── PropertyPanel.tsx    # Right panel for editing properties
  ├── App.tsx                  # Main application component
  ├── index.tsx               # Application entry point
  └── index.css               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 