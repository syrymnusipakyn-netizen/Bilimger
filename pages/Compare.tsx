import React, { useState } from 'react';
import { universities } from '../data';
import { getComparisonVerdict } from '../services/geminiService';
import { Icon } from '../components/Icons';

const Compare: React.FC = () => {
  // Select first 3 for demo
  const selectedUnis = universities.slice(0, 3);
  const [verdict, setVerdict] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateVerdict = async () => {
    setLoading(true);
    const names = selectedUnis.map(u => u.name);
    const result = await getComparisonVerdict(names);
    setVerdict(result);
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-black text-slate-900">Сравнение вузов</h1>
      <p className="mb-8 text-slate-500">Сравните ключевые показатели выбранных университетов.</p>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] table-fixed">
            <thead>
              <tr className="bg-slate-50">
                <th className="w-1/4 p-6 text-left text-sm font-bold text-slate-500">Характеристика</th>
                {selectedUnis.map(uni => (
                  <th key={uni.id} className="w-1/4 p-6 text-left">
                    <div className="flex items-center gap-3">
                      <img src={uni.image} alt={uni.name} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-bold text-slate-900 line-clamp-2">{uni.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-6 text-slate-500 flex items-center gap-2"><Icon name="trophy" className="w-4 h-4" /> Рейтинг</td>
                {selectedUnis.map(uni => (
                  <td key={uni.id} className="p-6 font-medium text-slate-900">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-800">
                      #{uni.ranking} место
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-6 text-slate-500 flex items-center gap-2"><Icon name="users" className="w-4 h-4" /> Студентов</td>
                {selectedUnis.map(uni => (
                  <td key={uni.id} className="p-6 font-medium text-slate-900">{uni.studentCount}</td>
                ))}
              </tr>
              <tr>
                <td className="p-6 text-slate-500 flex items-center gap-2"><Icon name="dollar" className="w-4 h-4" /> Стоимость (год)</td>
                {selectedUnis.map(uni => (
                  <td key={uni.id} className="p-6 font-medium text-slate-900">{uni.cost.toLocaleString()} ₸</td>
                ))}
              </tr>
              <tr>
                <td className="p-6 text-slate-500 flex items-center gap-2"><Icon name="book" className="w-4 h-4" /> Проходной балл</td>
                {selectedUnis.map(uni => (
                  <td key={uni.id} className="p-6 font-medium text-slate-900">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-800">
                      {uni.grantScore}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 rounded-3xl bg-gradient-to-r from-indigo-50 to-cyan-50 p-8 md:p-10">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-3xl">
            🤖
          </div>
          <div className="w-full">
            <h3 className="text-xl font-bold text-slate-900">Вердикт ИИ</h3>
            <p className="mt-2 text-slate-600">
              Нажмите кнопку ниже, чтобы получить краткий анализ и сравнение выбранных вузов от искусственного интеллекта Gemini.
            </p>
            
            {!verdict && !loading && (
              <button 
                onClick={handleGenerateVerdict}
                className="mt-6 flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-600 hover:scale-105"
              >
                <Icon name="sparkles" className="h-5 w-5" />
                Сгенерировать сравнение
              </button>
            )}

            {loading && (
              <div className="mt-6 flex items-center gap-2 text-primary font-medium animate-pulse">
                <Icon name="sparkles" className="h-5 w-5 animate-spin" />
                Анализирую данные...
              </div>
            )}

            {verdict && (
              <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-indigo-100 animate-fade-in">
                <p className="text-lg leading-relaxed text-slate-800">{verdict}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;