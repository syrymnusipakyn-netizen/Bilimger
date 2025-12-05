import React, { useState, useRef } from 'react';
import { universities, landmarks } from '../data';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';

const MapPage: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const almatyUnis = universities.filter(u => u.city === 'Almaty');
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom logic
  const zoomIn = () => setScale(s => Math.min(s + 0.5, 4));
  const zoomOut = () => setScale(s => Math.max(s - 0.5, 0.8));
  const reset = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  // Drag logic
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  // Mobile Touch Logic
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
       setIsDragging(true);
       setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
       setPosition({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y });
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-gray-100 relative">
      
      {/* Sidebar Toggle (Mobile) */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-30 bg-white p-2 rounded-lg shadow-md lg:hidden"
      >
        <Icon name={sidebarOpen ? "x" : "list"} className="w-6 h-6 text-slate-700" />
      </button>

      {/* Sidebar List */}
      <aside className={`
        absolute inset-y-0 left-0 z-20 w-80 bg-white shadow-xl transform transition-transform duration-300 lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-slate-800">Вузы Алматы</h2>
          <p className="text-xs text-slate-500">Поиск по карте</p>
        </div>
        <div className="overflow-y-auto h-full p-2 space-y-2 pb-20">
          {almatyUnis.map(uni => (
            <Link to={`/university/${uni.id}`} key={uni.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group">
               <img src={uni.image} className="w-12 h-12 rounded-md object-cover bg-gray-200" alt="" />
               <div>
                 <h3 className="text-sm font-bold text-slate-900 group-hover:text-primary-600">{uni.name}</h3>
                 <p className="text-xs text-slate-500">{uni.city}</p>
               </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* Map Viewport */}
      <div 
        className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing bg-slate-200"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div 
            className="absolute top-0 left-0 origin-top-left transition-transform duration-75"
            style={{ 
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                width: '1000px',
                height: '800px'
            }}
        >
            {/* Map Background Placeholder */}
            <div className="absolute inset-0 bg-[#e6e2d3] rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
                {/* Simplified Map Pattern */}
                <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#a3a3a3 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                
                {/* Roads (Decorative) */}
                <div className="absolute top-[300px] left-0 right-0 h-4 bg-white/60 transform -rotate-1"></div>
                <div className="absolute top-[600px] left-0 right-0 h-8 bg-white/60 transform rotate-2"></div>
                <div className="absolute top-0 bottom-0 left-[400px] w-6 bg-white/60"></div>
                
                {/* Landmarks */}
                {landmarks.map(l => (
                    <div 
                        key={l.id} 
                        className="absolute flex flex-col items-center group cursor-pointer"
                        style={{ left: l.coordinates.x, top: l.coordinates.y }}
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-125">
                            <Icon name="pin" className="w-4 h-4" />
                        </div>
                        <span className="mt-1 text-xs font-bold bg-white/80 px-2 py-0.5 rounded shadow-sm">{l.name}</span>
                    </div>
                ))}

                {/* Universities */}
                {almatyUnis.map(uni => (
                    <Link 
                        to={`/university/${uni.id}`}
                        key={uni.id} 
                        className="absolute flex flex-col items-center group z-10"
                        style={{ left: uni.coordinates.x, top: uni.coordinates.y }}
                    >
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl border-2 border-white shadow-xl overflow-hidden transform transition-transform group-hover:scale-125 group-hover:-translate-y-2 bg-white">
                                <img src={uni.image} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold border border-white">
                                {uni.rating}
                            </div>
                        </div>
                        <span className="mt-2 text-xs font-bold bg-white px-2 py-1 rounded-md shadow-md text-slate-900 group-hover:text-primary-600 whitespace-nowrap">
                            {uni.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2">
            <button onClick={zoomIn} className="p-3 bg-white rounded-xl shadow-lg hover:bg-gray-50 text-slate-700">
                <Icon name="plus" className="w-6 h-6" />
            </button>
            <button onClick={zoomOut} className="p-3 bg-white rounded-xl shadow-lg hover:bg-gray-50 text-slate-700">
                <Icon name="minus" className="w-6 h-6" />
            </button>
            <button onClick={reset} className="p-3 bg-white rounded-xl shadow-lg hover:bg-gray-50 text-slate-700 font-bold text-xs">
                100%
            </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;