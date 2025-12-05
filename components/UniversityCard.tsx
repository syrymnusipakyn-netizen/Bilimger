import { FC } from 'react';
import { University } from '../types';
import { Link } from 'react-router-dom';
import { Icon } from './Icons';

interface Props {
  university: University;
}

const UniversityCard: FC<Props> = ({ university }) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      <div 
        className="h-48 w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${university.image})` }}
      />
      <div className="flex h-[calc(100%-12rem)] flex-col p-5">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-bold leading-tight text-slate-900 group-hover:text-primary">
            {university.name}
          </h3>
          <div className="flex items-center gap-1 rounded-md bg-yellow-50 px-2 py-1">
            <Icon name="star" className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-yellow-700">{university.rating}</span>
          </div>
        </div>
        
        <div className="mb-4 flex items-center gap-1 text-slate-500">
          <Icon name="pin" className="h-4 w-4" />
          <span className="text-sm">{university.city}</span>
        </div>

        <div className="mt-auto pt-4">
          <Link 
            to={`/university/${university.id}`}
            className="block w-full rounded-full bg-primary/10 py-2.5 text-center text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UniversityCard;