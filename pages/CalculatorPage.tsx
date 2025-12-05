import React, { useState } from 'react';
import { Icon } from '../components/Icons';
import { getGrantAdvice } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

const CalculatorPage: React.FC = () => {
  const [score, setScore] = useState(70);
  const [specialty, setSpecialty] = useState("Информационные технологии");
  const [selectedSubjects, setSelectedSubjects] = useState(["Математика", "Физика"]);
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [calculated, setCalculated] = useState(false);
  
  const navigate = useNavigate();

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleCalculate = async () => {
    setLoading(true);
    // Simulate calculation delay for UX
    setTimeout(async () => {
      setCalculated(true);
      const aiAdvice = await getGrantAdvice(score, specialty, selectedSubjects);
      setAdvice(aiAdvice);
      setLoading(false);
    }, 1200);
  };

  const handleDiscuss = () => {
    navigate('/chat', {
      state: {
        calculatorContext: {
          score,
          specialty,
          subjects: selectedSubjects,
          initialAdvice: advice || "Анализ не был завершен"
        }
      }
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-slate-900">Калькулятор шансов</h1>
        <p className="mt-2 text-slate-500">Узнай вероятность поступления на грант с помощью ИИ.</p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm h-fit">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Ввод данных</h2>
          
          <div className="space-y-6">
            <div>
              <label className="mb-2 block font-bold text-slate-700">Специальность</label>
              <select 
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full rounded-xl border-gray-200 bg-slate-50 p-4 font-medium text-slate-900 focus:border-primary focus:ring-primary"
              >
                <option>Информационные технологии</option>
                <option>Медицина</option>
                <option>Экономика</option>
                <option>Юриспруденция</option>
                <option>Педагогика</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-bold text-slate-700">Профильные предметы</label>
              <div className="grid grid-cols-2 gap-3">
                {['Математика', 'Физика', 'Химия', 'Биология', 'География', 'История'].map(subj => (
                  <label key={subj} className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-100 bg-slate-50 p-3 hover:bg-slate-100 transition-colors">
                    <input 
                      type="checkbox" 
                      className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" 
                      checked={selectedSubjects.includes(subj)}
                      onChange={() => handleSubjectChange(subj)}
                    />
                    <span className="font-medium text-slate-700 text-sm">{subj}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <label className="font-bold text-slate-700">Балл ЕНТ</label>
                <span className="text-3xl font-black text-primary">{score}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="140" 
                value={score} 
                onChange={(e) => setScore(parseInt(e.target.value))}
                className="h-3 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                <span>0</span>
                <span>70 (Порог)</span>
                <span>140</span>
              </div>
            </div>
            
            <button 
              onClick={handleCalculate}
              disabled={loading}
              className="mt-4 w-full rounded-xl bg-slate-900 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:scale-[1.02] disabled:opacity-70 disabled:scale-100"
            >
              {loading ? 'ИИ анализирует...' : 'Рассчитать шансы'}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-6">
          {calculated ? (
            <div className="animate-fade-in space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Вердикт системы</h3>
                     <div className={`px-3 py-1 rounded-full text-xs font-bold ${score > 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {score > 100 ? 'Грант вероятен' : 'Платное/Скидка'}
                     </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                     <span className="text-4xl font-black text-slate-900">{Math.round((score/140)*100)}%</span>
                     <span className="text-sm font-bold text-slate-500 mb-1">Успешность</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-orange-400 via-primary to-green-500 transition-all duration-1000"
                      style={{ width: `${(score / 140) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="rounded-2xl bg-indigo-50 p-6 border border-indigo-100">
                  <div className="mb-3 flex items-center gap-2 font-bold text-indigo-900">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-200 text-indigo-700">
                        <Icon name="message" className="h-4 w-4" />
                    </div>
                    Мнение AI-эксперта
                  </div>
                  <p className="text-sm leading-relaxed text-indigo-800 mb-6 font-medium">
                    {advice || "Анализ данных..."}
                  </p>
                  <button 
                    onClick={handleDiscuss}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700 shadow-md shadow-indigo-200"
                  >
                    Обсудить стратегию с ИИ
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="rounded-3xl bg-white p-6 border border-gray-200">
                 <h3 className="font-bold text-slate-900 mb-4">Подходящие вузы</h3>
                 <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-gray-200 bg-cover bg-center" style={{backgroundImage: 'url(https://satbayev.university/resources/img/about/history/history-1.jpg)'}}></div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">Satbayev University</p>
                                <p className="text-xs text-slate-500">Алматы</p>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-green-600">Шанс высокий</span>
                    </div>
                 </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 bg-slate-50 p-10 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <Icon name="checkCircle" className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Ожидание данных</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">Заполните форму слева и нажмите кнопку расчета, чтобы получить прогноз.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;