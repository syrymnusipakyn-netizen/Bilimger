import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="bg-slate-900 py-12 text-slate-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-black text-white">BILIMGER</h2>
            <p className="mt-2 text-sm text-slate-400">© 2025. Все права защищены.</p>
            <p className="mt-1 text-sm text-slate-500">Умный путь к твоему вузу.</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Конфиденциальность</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;