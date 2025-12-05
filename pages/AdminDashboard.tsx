import React from 'react';
import { useAuth } from '../context/AuthContext';
import { universities } from '../data';
import { Icon } from '../components/Icons';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { role, isEmployee } = useAuth();

  if (!isEmployee) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Доступ запрещен</h2>
          <p className="text-slate-500">У вас нет прав для просмотра этой страницы.</p>
          <Link to="/" className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-white">На главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            {role === 'admin' ? 'Панель Администратора' : 'Панель Сотрудника'}
          </h1>
          <p className="text-slate-500">Управление контентом и пользователями.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-bold text-white hover:bg-primary-600">
          <Icon name="plus" className="h-5 w-5" />
          Добавить вуз
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Stats */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <Icon name="fileText" className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">{universities.length}</h3>
          <p className="text-sm text-slate-500">Активных вузов</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-500">
            <Icon name="users" className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">1,240</h3>
          <p className="text-sm text-slate-500">Пользователей сегодня</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500">
            <Icon name="settings" className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Система</h3>
          <p className="text-sm text-slate-500">Работает стабильно</p>
        </div>
      </div>

      <h2 className="mb-6 mt-10 text-xl font-bold text-slate-900">Управление вузами</h2>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-500">
          <thead className="bg-slate-50 text-xs uppercase text-slate-700">
            <tr>
              <th className="px-6 py-3">Название</th>
              <th className="px-6 py-3">Город</th>
              <th className="px-6 py-3">Рейтинг</th>
              <th className="px-6 py-3">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {universities.map((uni) => (
              <tr key={uni.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{uni.name}</td>
                <td className="px-6 py-4">{uni.city}</td>
                <td className="px-6 py-4">{uni.rating}</td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-1 text-primary hover:text-primary-700">
                    <Icon name="edit" className="h-4 w-4" />
                    Изменить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;