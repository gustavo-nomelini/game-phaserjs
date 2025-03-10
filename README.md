# Phaser.js Game Development Project

## Overview

This project is a web-based game created using Phaser.js, a powerful HTML5 game framework. It provides a structured approach to game development with modern JavaScript tooling, including Yarn for package management and Webpack for bundling.

## Table of Contents

- [Comparison: Vanilla JS vs Phaser.js](#comparison-vanilla-js-vs-phaserjs)
- [Prerequisites](#prerequisites)
- [Project Setup with Yarn](#project-setup-with-yarn)
- [Project Structure](#project-structure)
- [Key Files](#key-files)
- [Development Workflow](#development-workflow)
- [Game Structure](#game-structure)
- [Next Steps](#next-steps)

## Comparison: Vanilla JS vs Phaser.js

### Vanilla JavaScript
**Pros:**
- Complete control over every aspect of your game
- No additional dependencies or learning curves for libraries
- Smaller file size and potentially better performance for simple games
- Great for learning fundamental game development concepts
- No external dependencies to maintain

**Cons:**
- You'll need to implement all game systems from scratch (physics, collision detection, asset loading, etc.)
- More time-consuming development process
- More complex to achieve advanced game features
- Browser compatibility issues might need extra handling

### Phaser.js
**Pros:**
- Full-featured game framework with built-in physics engines (Arcade Physics, Matter.js, etc.)
- Ready-to-use systems for sprites, animations, audio, input handling
- Efficient rendering using WebGL or Canvas
- Active community with documentation, tutorials, and examples
- Time-saving development for complex games
- Cross-browser compatibility handled for you

**Cons:**
- Learning curve to understand the framework
- Added dependency and file size to your project
- Less flexibility in some cases due to framework constraints
- May be overkill for very simple games

## Prerequisites

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12.0.0 or later)
- [Yarn](https://yarnpkg.com/) package manager
- A code editor (such as VS Code, Sublime Text, etc.)

## Project Setup with Yarn

### 1. Initialize Your Project

```bash
# Create project directory
mkdir my-phaser-game
cd my-phaser-game

# Initialize Yarn project
yarn init
```

### 2. Install Dependencies

```bash
# Install Phaser
yarn add phaser

# Install development dependencies
yarn add -D webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env file-loader html-webpack-plugin copy-webpack-plugin
```

### 3. Create Project Structure

```
my-phaser-game/
├── src/
│   ├── assets/
│   │   └── (put your game assets here)
│   ├── scenes/
│   │   ├── BootScene.js
│   │   ├── PreloadScene.js
│   │   └── GameScene.js
│   ├── index.html
│   └── index.js
├── package.json
└── webpack.config.js
```

### 4. Configure package.json Scripts

Add these scripts to your `package.json`:

```json
"scripts": {
  "build": "webpack --mode production",
  "dev": "webpack serve --mode development"
}
```

## Project Structure

The project follows a modular structure:

- `src/` - Contains all source code and assets
  - `assets/` - Game assets (images, audio, etc.)
  - `scenes/` - Phaser scene classes organizing game logic
  - `index.js` - Main entry point for the game
  - `index.html` - HTML template
- `webpack.config.js` - Webpack configuration
- `package.json` - Project metadata and dependencies

## Key Files

### webpack.config.js

Handles bundling of JavaScript modules, asset processing, and development server:

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|mp3|ogg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    hot: true
  }
};
```

### src/index.js

Main entry point that configures and initializes the Phaser game:

```javascript
import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [BootScene, PreloadScene, GameScene]
};

new Phaser.Game(config);
```

### src/index.html

HTML template for the game:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Phaser Game</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100vw;
    }
    canvas {
      display: block;
    }
  </style>
</head>
<body>
  <!-- The game canvas will be inserted here by Phaser -->
</body>
</html>
```

## Development Workflow

1. **Start Development Server**
   ```bash
   yarn dev
   ```
   This starts the development server at `http://localhost:8080/` with hot reloading enabled.

2. **Build for Production**
   ```bash
   yarn build
   ```
   This creates a `dist` folder with bundled and optimized files that you can deploy to any web server.

## Game Structure

The game is organized into three main scenes:

1. **BootScene (src/scenes/BootScene.js)**
   - Initializes the game and loads minimal assets needed for the loading screen
   - Transitions to PreloadScene

2. **PreloadScene (src/scenes/PreloadScene.js)**
   - Displays a loading bar
   - Loads all game assets (images, sprites, audio, etc.)
   - Transitions to GameScene when loading completes

3. **GameScene (src/scenes/GameScene.js)**
   - Main gameplay scene
   - Handles player input, game objects, and physics
   - Contains core game loop logic

## Required Assets

For the sample project to work, you'll need these basic placeholder images in your `src/assets` directory:

- `sky.png` - Background image (800x600px)
- `platform.png` - Platform/ground image (400x32px)
- `player.png` - Character sprite (32x48px)
- `loading-background.png` - Loading screen image (800x600px)

You can create these simple placeholder images or download free game assets from sites like itch.io or OpenGameArt.

## Next Steps

After setting up the project:

1. **Add Game Assets**
   - Place your game assets in the `src/assets` folder
   - Update the preload functions in your scenes to load these assets

2. **Implement Game Mechanics**
   - Expand the GameScene class to include your game logic
   - Add additional scenes as needed

3. **Add Audio**
   - Load audio files in PreloadScene
   - Implement sound effects and music in your game scenes

4. **Polish and Optimize**
   - Add animations and visual effects
   - Optimize performance for different devices
   - Add UI elements and menus

## Resources

- [Phaser Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Phaser Examples](https://phaser.io/examples)
- [Phaser GitHub Repository](https://github.com/photonstorm/phaser)
- [Webpack Documentation](https://webpack.js.org/concepts/)