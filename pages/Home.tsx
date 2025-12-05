import React, { useState, useRef } from 'react';
import UniversityCard from '../components/UniversityCard';
import { universities } from '../data';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const resultsRef = useRef<HTMLElement>(null);

  const filteredUniversities = universities.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-primary to-cyan-400 px-4 py-16 md:py-24 text-center sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-7xl">
            🎓 BILIMGER
          </h1>
          <p className="mb-8 text-lg font-medium text-blue-50 md:mb-10 md:text-xl">
            Умный путь к твоему вузу. Найди, сравни, поступи.
          </p>
          
          <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-2xl bg-white/20 p-2 backdrop-blur-md sm:flex-row sm:items-center">
            <div className="flex flex-1 items-center rounded-xl bg-white px-4 py-3 shadow-lg">
              <Icon name="search" className="mr-3 h-5 w-5 text-slate-400 shrink-0" />
              <input 
                type="text" 
                placeholder="ВУЗ, специальность или город..." 
                className="w-full border-none bg-transparent text-base md:text-lg placeholder-slate-400 focus:outline-none focus:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="w-full sm:w-auto rounded-xl bg-slate-900 px-8 py-3 sm:py-4 text-base font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-slate-800"
            >
              Найти
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-6 md:mb-8 text-center text-2xl font-bold text-slate-900">Быстрые действия</h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-3">
          <Link to="/compare" className="group flex flex-col items-center gap-4 rounded-2xl bg-white p-6 md:p-8 text-center shadow-sm transition-all hover:shadow-xl hover:shadow-cyan-100">
            <div className="rounded-full bg-cyan-50 p-4 transition-colors group-hover:bg-primary/20">
              <Icon name="scale" className="h-8 w-8 text-primary" />
            </div>
            <span className="text-lg font-bold text-slate-700 group-hover:text-primary">Сравнить вузы</span>
          </Link>
          <Link to="/map" className="group flex flex-col items-center gap-4 rounded-2xl bg-white p-6 md:p-8 text-center shadow-sm transition-all hover:shadow-xl hover:shadow-cyan-100">
            <div className="rounded-full bg-cyan-50 p-4 transition-colors group-hover:bg-primary/20">
              <Icon name="map" className="h-8 w-8 text-primary" />
            </div>
            <span className="text-lg font-bold text-slate-700 group-hover:text-primary">Карта вузов</span>
          </Link>
          <Link to="/calculator" className="group flex flex-col items-center gap-4 rounded-2xl bg-white p-6 md:p-8 text-center shadow-sm transition-all hover:shadow-xl hover:shadow-cyan-100">
            <div className="rounded-full bg-cyan-50 p-4 transition-colors group-hover:bg-primary/20">
              <Icon name="brain" className="h-8 w-8 text-primary" />
            </div>
            <span className="text-lg font-bold text-slate-700 group-hover:text-primary">Калькулятор шансов</span>
          </Link>
        </div>
      </section>

      {/* Top Universities */}
      <section ref={resultsRef} className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-24">
        <h2 className="mb-6 md:mb-8 text-center text-2xl font-bold text-slate-900">
          {searchTerm ? 'Результаты поиска' : 'Топ вузов недели'}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.slice(0, 5).map(uni => (
              <UniversityCard key={uni.id} university={uni} />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-slate-500">
              Вузы не найдены. Попробуйте другой запрос.
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl bg-slate-900 p-8 text-white md:p-16">
          <div className="text-center">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold">Почему именно BILIMGER?</h2>
            <p className="mb-8 md:mb-12 text-slate-400">Мы объединяем данные и искусственный интеллект для вашего будущего.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <Icon name="brain" className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">ИИ-рекомендации</h3>
              <p className="text-sm text-slate-400">Персонализированные советы на основе ваших баллов и интересов.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <Icon name="play" className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Видео-туры</h3>
              <p className="text-sm text-slate-400">Погрузитесь в атмосферу кампуса не выходя из дома.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <Icon name="scale" className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Честные сравнения</h3>
              <p className="text-sm text-slate-400">Объективные данные о стоимости, грантах и трудоустройстве.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;