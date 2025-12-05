import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { universities } from '../data';
import { TabType } from '../types';
import { Icon } from '../components/Icons';

const UniversityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const university = universities.find(u => u.id === id);
  const activeTabDefault = TabType.ABOUT;
  const [activeTab, setActiveTab] = useState<TabType>(activeTabDefault);

  if (!university) {
    return <div className="p-10 text-center">University not found</div>;
  }

  return (
    <div className="min-h-screen bg-background-light pb-20">
      {/* Banner */}
      <div 
        className="relative h-80 w-full bg-cover bg-center md:h-96"
        style={{ backgroundImage: `url(${university.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl p-6">
            <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white">
                <Icon name="arrowLeft" className="h-4 w-4" /> Назад
            </Link>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">{university.name}</h1>
              <div className="mt-2 flex items-center gap-4 text-slate-300">
                <div className="flex items-center gap-2">
                    <Icon name="pin" className="h-5 w-5 text-primary" />
                    <span className="text-lg">{university.city}, Kazakhstan</span>
                </div>
                {university.mapLink && (
                    <a 
                        href={university.mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:text-white transition-colors rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm hover:bg-primary"
                    >
                        <span>Показать на карте</span>
                        <Icon name="link" className="h-3 w-3" />
                    </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center rounded-xl bg-white/10 p-3 backdrop-blur-md">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-white">{university.rating}</span>
                  <Icon name="star" className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-xs text-slate-300">Рейтинг</span>
              </div>
              <Link to="/compare" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-200">
                Сравнить
              </Link>
              <Link to="/calculator" className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-primary-600">
                Мои шансы
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto mt-8 max-w-7xl px-6">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: TabType.ABOUT, label: 'О вузе' },
              { id: TabType.PROGRAMS, label: 'Программы' },
              { id: TabType.ADMISSION, label: 'Приём' },
              { id: TabType.REVIEWS, label: 'Отзывы' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap border-b-2 py-4 px-1 text-sm font-bold transition-colors
                  ${activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-500 hover:border-gray-300 hover:text-slate-700'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {activeTab === TabType.ABOUT && (
              <div className="animate-fade-in">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">О вузе</h2>
                <p className="mb-8 text-lg leading-relaxed text-slate-600">
                  {university.description}
                </p>

                <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <Icon name="calendar" className="mb-2 h-6 w-6 text-primary" />
                    <div className="text-2xl font-bold text-slate-900">{university.founded}</div>
                    <div className="text-xs text-slate-500">Год основания</div>
                  </div>
                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <Icon name="users" className="mb-2 h-6 w-6 text-primary" />
                    <div className="text-2xl font-bold text-slate-900">{university.studentCount}</div>
                    <div className="text-xs text-slate-500">Студентов</div>
                  </div>
                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <Icon name="trophy" className="mb-2 h-6 w-6 text-primary" />
                    <div className="text-2xl font-bold text-slate-900">#{university.ranking}</div>
                    <div className="text-xs text-slate-500">Нац. рейтинг</div>
                  </div>
                  <div className="rounded-2xl bg-white p-5 shadow-sm">
                    <Icon name="building" className="mb-2 h-6 w-6 text-primary" />
                    <div className="text-2xl font-bold text-slate-900">{university.partners}+</div>
                    <div className="text-xs text-slate-500">Партнеров</div>
                  </div>
                </div>

                <h3 className="mb-4 text-xl font-bold text-slate-900">Фото кампуса</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {university.gallery && university.gallery.length > 0 ? (
                        university.gallery.map((imgUrl, i) => (
                             <div key={i} className="aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
                                 <img src={imgUrl} alt={`Campus view ${i+1}`} className="h-full w-full object-cover transition-transform hover:scale-110" />
                             </div>
                        ))
                    ) : (
                        <p className="text-slate-400 italic">Фотографии кампуса скоро появятся.</p>
                    )}
                </div>
              </div>
            )}
             {activeTab === TabType.PROGRAMS && (
                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <p className="text-slate-600">Информация о программах в данный момент обновляется. Пожалуйста, проверьте позже.</p>
                </div>
            )}
            {activeTab === TabType.ADMISSION && (
                <div className="rounded-xl bg-white p-6 shadow-sm">
                     <p className="text-slate-600">Информация о приемной комиссии доступна на официальном сайте университета.</p>
                </div>
            )}
             {activeTab === TabType.REVIEWS && (
                <div className="rounded-xl bg-white p-6 shadow-sm">
                     <p className="text-slate-600">Отзывы студентов загружаются...</p>
                </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold text-slate-900">Ключевые показатели</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-slate-500">Проходной балл</span>
                    <span className="font-bold text-primary">{university.grantScore}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-slate-500">Стоимость (год)</span>
                    <span className="font-bold text-slate-900">{university.cost.toLocaleString()} ₸</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-3">
                    <span className="text-slate-500">Специальностей</span>
                    <span className="font-bold text-slate-900">{university.specialtiesCount}</span>
                  </div>
                </div>
                <button className="mt-6 w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition-opacity hover:opacity-90">
                  Подать заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetail;