import React from 'react';
import Scene from './components/three/Scene';

function App() {
  return (
    <div className="relative min-h-screen bg-primary-950">
      <Scene />
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen">
        {/* Add your content components here */}
      </div>
    </div>
  );
}

export default App;