import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '../components/Icons';
import { createChatSession, sendChatMessage, analyzeImageWithText } from '../services/geminiService';
import { Chat } from "@google/genai";
import { useLocation } from 'react-router-dom';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    image?: string;
    timestamp: Date;
    isContext?: boolean;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            role: 'model',
            text: 'Привет! Я твой AI-помощник BILIMGER. 🎓\n\nЯ могу:\n• Оценить шансы на грант\n• Сравнить вузы\n• Решить задачу по фото\n\nС чего начнем?',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const location = useLocation();
    const isContextProcessed = useRef(false);

    // Initialize Chat and Handle Context
    useEffect(() => {
        const initChat = async () => {
            const session = await createChatSession();
            setChatSession(session);
            
            // Check if we came from Calculator
            if (location.state?.calculatorContext && !isContextProcessed.current && session) {
                const { score, specialty, subjects, initialAdvice } = location.state.calculatorContext;
                
                // Construct the "hidden" prompt to AI to set context
                const contextPrompt = `
Контекст пользователя (из калькулятора):
- Балл ЕНТ: ${score}/140
- Специальность: ${specialty}
- Предметы: ${subjects.join(', ')}
- Предварительный совет: "${initialAdvice}"

Пожалуйста, поздоровайся, упомяни эти баллы и дай более развернутую стратегию поступления для этого студента. Какие вузы в Казахстане подходят лучше всего?
                `;

                // Show a system message to user indicating context load
                setMessages(prev => [
                    ...prev, 
                    {
                        id: 'ctx-info',
                        role: 'user',
                        text: `📊 Данные из калькулятора загружены:\nСпециальность: ${specialty}\nБалл: ${score}`,
                        timestamp: new Date(),
                        isContext: true
                    }
                ]);

                setIsLoading(true);
                
                try {
                    const responseText = await sendChatMessage(session, contextPrompt);
                    setMessages(prev => [...prev, {
                        id: Date.now().toString(),
                        role: 'model',
                        text: responseText,
                        timestamp: new Date()
                    }]);
                } catch (error) {
                    console.error("Context error", error);
                } finally {
                    setIsLoading(false);
                }

                isContextProcessed.current = true;
                // Clear state to avoid reprocessing on refresh
                window.history.replaceState({}, document.title);
            }
        };
        initChat();
    }, [location.state]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setSelectedImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleSend = async () => {
        if ((!input.trim() && !selectedImage) || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            image: selectedImage || undefined,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        const imgToSend = selectedImage;
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        setIsLoading(true);

        try {
            let responseText = '';

            if (imgToSend) {
                responseText = await analyzeImageWithText(imgToSend, input);
            } else if (chatSession) {
                responseText = await sendChatMessage(chatSession, input);
            } else {
                // Re-init session if lost
                const newSession = await createChatSession();
                setChatSession(newSession);
                if (newSession) {
                    responseText = await sendChatMessage(newSession, input);
                } else {
                    responseText = "Ошибка подключения к сервису ИИ.";
                }
            }

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: responseText,
                timestamp: new Date()
            }]);

        } catch (error) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "Извини, произошла ошибка при обработке запроса. Попробуй еще раз.",
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] flex-col bg-[#eef2f6]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-md">
                            <Icon name="bot" className="h-6 w-6" />
                        </div>
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-slate-900 leading-tight">AI Консультант</h1>
                        <p className="text-xs text-slate-500 font-medium">Online • Отвечает мгновенно</p>
                    </div>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                    Gemini 2.5 Flash
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex gap-3 w-full max-w-3xl mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'model' && (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-sm mt-1">
                                <Icon name="bot" className="h-5 w-5" />
                            </div>
                        )}

                        <div className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[70%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                            {msg.isContext ? (
                                <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-xs text-blue-700 border border-blue-100 mb-2">
                                    <Icon name="gradCap" className="h-4 w-4" />
                                    <span className="whitespace-pre-wrap">{msg.text}</span>
                                </div>
                            ) : (
                                <div className={`
                                    rounded-2xl px-5 py-3 shadow-sm text-sm leading-relaxed
                                    ${msg.role === 'user' 
                                        ? 'bg-slate-900 text-white rounded-br-none' 
                                        : 'bg-white text-slate-800 rounded-bl-none border border-gray-100'}
                                `}>
                                    {msg.image && (
                                        <div className="mb-3 overflow-hidden rounded-lg bg-black/10">
                                            <img src={msg.image} alt="Upload" className="max-h-60 w-full object-cover" />
                                        </div>
                                    )}
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            )}
                            {!msg.isContext && (
                                <span className="text-[10px] text-slate-400 px-1">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            )}
                        </div>

                        {msg.role === 'user' && (
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500 mt-1">
                                <Icon name="userCircle" className="h-5 w-5" />
                            </div>
                        )}
                    </div>
                ))}
                
                {isLoading && (
                     <div className="flex gap-3 w-full max-w-3xl mx-auto justify-start">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
                            <Icon name="bot" className="h-5 w-5" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100 shadow-sm flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0 z-20">
                <div className="mx-auto max-w-3xl">
                    {selectedImage && (
                        <div className="flex items-center gap-3 mb-3 p-2 bg-slate-50 rounded-lg border border-slate-100 w-fit">
                            <img src={selectedImage} className="h-10 w-10 rounded object-cover" alt="Selected" />
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700">Изображение</span>
                                <span className="text-[10px] text-slate-500">Готово к отправке</span>
                            </div>
                            <button onClick={() => setSelectedImage(null)} className="p-1 hover:bg-slate-200 rounded-full ml-2">
                                <Icon name="x" className="h-4 w-4 text-slate-500" />
                            </button>
                        </div>
                    )}
                    
                    <div className="flex gap-2">
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-primary transition-colors"
                        >
                            <Icon name="image" className="h-6 w-6" />
                        </button>
                        <input type="file" className="hidden" ref={fileInputRef} accept="image/*" onChange={handleImageSelect} />
                        
                        <input 
                            type="text" 
                            className="flex-1 rounded-xl bg-slate-100 px-4 text-sm font-medium text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            placeholder="Напиши сообщение..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        
                        <button 
                            onClick={handleSend}
                            disabled={!input.trim() && !selectedImage}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-600 active:scale-95 disabled:opacity-50 disabled:shadow-none"
                        >
                            {isLoading ? <Icon name="loader" className="h-6 w-6 animate-spin" /> : <Icon name="send" className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;