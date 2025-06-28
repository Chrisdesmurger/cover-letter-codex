import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Check, FileText, Upload, User, MessageSquare, Sparkles, Menu, X, Home, Settings, Bell } from 'lucide-react';

const ModernWebApp = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [answers, setAnswers] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');

    const questions = [
        {
            id: 'motivation',
            type: 'textarea',
            title: 'Pourquoi voulez-vous ce poste ?',
            subtitle: 'Partagez votre motivation en quelques phrases.',
            placeholder: 'Tapez votre réponse ici...'
        },
        {
            id: 'skills',
            type: 'textarea',
            title: 'Quelles compétences vous distinguent ?',
            subtitle: 'Décrivez vos compétences principales pour ce rôle.',
            placeholder: 'Décrivez vos compétences...'
        },
        {
            id: 'experience',
            type: 'multiple',
            title: 'Votre niveau d\'expérience ?',
            subtitle: 'Sélectionnez votre niveau d\'expérience.',
            options: [
                'Débutant (0-2 ans)',
                'Intermédiaire (2-5 ans)',
                'Senior (5-10 ans)',
                'Expert (10+ ans)'
            ]
        },
        {
            id: 'availability',
            type: 'multiple',
            title: 'Quand pouvez-vous commencer ?',
            subtitle: 'Sélectionnez votre disponibilité.',
            options: [
                'Immédiatement',
                'Dans 2 semaines',
                'Dans 1 mois',
                'Dans 2-3 mois'
            ]
        }
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const nextStep = () => {
        if (currentStep < questions.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
                setIsAnimating(false);
            }, 200);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(currentStep - 1);
                setIsAnimating(false);
            }, 200);
        }
    };

    const progress = ((currentStep + 1) / questions.length) * 100;

    const renderDashboard = () => (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-orange-100/50 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Bienvenue sur LetterCraft</h1>
                        <p className="text-gray-600">Créez des lettres de motivation personnalisées et impactantes</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-blue-800">Lettres créées</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-green-600">8</div>
                        <div className="text-sm text-green-800">Candidatures envoyées</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                        <div className="text-2xl font-bold text-purple-600">3</div>
                        <div className="text-sm text-purple-800">Entretiens obtenus</div>
                    </div>
                </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">CV Uploadé</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Gérez votre CV et vos documents</p>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                        Voir détails <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Upload className="w-5 h-5 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Offres d'emploi</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">3 offres analysées</p>
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                        Gérer <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-orange-100/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Lettres générées</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">12 lettres créées</p>
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center">
                        Historique <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Actions rapides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={() => setActiveTab('questionnaire')}
                        className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-all duration-200"
                    >
                        <div className="flex items-center space-x-3">
                            <Sparkles className="w-6 h-6" />
                            <div>
                                <div className="font-semibold">Nouvelle lettre</div>
                                <div className="text-sm text-orange-100">Démarrer le questionnaire</div>
                            </div>
                        </div>
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-all duration-200">
                        <div className="flex items-center space-x-3">
                            <Upload className="w-6 h-6" />
                            <div>
                                <div className="font-semibold">Importer CV</div>
                                <div className="text-sm text-orange-100">Mettre à jour votre profil</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderQuestionnaire = () => (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-orange-100/50 overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-100">
                <div
                    className="h-full bg-gradient-to-r from-orange-400 to-amber-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="p-8 md:p-12">
                {/* Question Counter */}
                <div className="flex items-center justify-between mb-8">
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {currentStep + 1} sur {questions.length}
                    </span>
                    {currentStep > 0 && (
                        <button
                            onClick={prevStep}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Retour
                        </button>
                    )}
                </div>

                {/* Question Content */}
                <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {questions[currentStep].title}
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        {questions[currentStep].subtitle}
                    </p>

                    {/* Question Input */}
                    <div className="mb-8">
                        {questions[currentStep].type === 'textarea' ? (
                            <textarea
                                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200 resize-none text-lg"
                                placeholder={questions[currentStep].placeholder}
                                value={answers[questions[currentStep].id] || ''}
                                onChange={(e) => handleAnswer(questions[currentStep].id, e.target.value)}
                            />
                        ) : (
                            <div className="space-y-3">
                                {questions[currentStep].options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(questions[currentStep].id, option)}
                                        className={`w-full p-4 text-left border-2 rounded-xl transition-all duration-200 hover:border-orange-300 hover:bg-orange-50 ${answers[questions[currentStep].id] === option
                                                ? 'border-orange-400 bg-orange-50 text-orange-800'
                                                : 'border-gray-200 bg-white'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg">{option}</span>
                                            {answers[questions[currentStep].id] === option && (
                                                <Check className="w-5 h-5 text-orange-600" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                            {questions.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index <= currentStep ? 'bg-orange-400' : 'bg-gray-300'
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="flex space-x-4">
                            {currentStep === questions.length - 1 ? (
                                <button
                                    className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                                    onClick={() => {
                                        console.log('Answers:', answers);
                                        alert('Questionnaire terminé ! Réponses sauvegardées.');
                                        setActiveTab('dashboard');
                                    }}
                                >
                                    Terminer
                                </button>
                            ) : (
                                <button
                                    onClick={nextStep}
                                    disabled={!answers[questions[currentStep].id]}
                                    className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
                                >
                                    Suivant
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-orange-100/50 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-amber-500 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-semibold text-gray-900">LetterCraft</span>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`flex items-center space-x-2 transition-colors ${activeTab === 'dashboard' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
                                    }`}
                            >
                                <Home className="w-4 h-4" />
                                <span>Dashboard</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('documents')}
                                className={`flex items-center space-x-2 transition-colors ${activeTab === 'documents' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
                                    }`}
                            >
                                <FileText className="w-4 h-4" />
                                <span>Documents</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('questionnaire')}
                                className={`flex items-center space-x-2 transition-colors ${activeTab === 'questionnaire' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
                                    }`}
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Générateur</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center space-x-2 transition-colors ${activeTab === 'profile' ? 'text-orange-600' : 'text-gray-700 hover:text-orange-600'
                                    }`}
                            >
                                <User className="w-4 h-4" />
                                <span>Profil</span>
                            </button>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                                <Bell className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200">
                        <div className="px-4 py-2 space-y-1">
                            <button
                                onClick={() => { setActiveTab('dashboard'); setIsMenuOpen(false); }}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                <Home className="w-4 h-4" />
                                <span>Dashboard</span>
                            </button>
                            <button
                                onClick={() => { setActiveTab('documents'); setIsMenuOpen(false); }}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                <FileText className="w-4 h-4" />
                                <span>Documents</span>
                            </button>
                            <button
                                onClick={() => { setActiveTab('questionnaire'); setIsMenuOpen(false); }}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                <MessageSquare className="w-4 h-4" />
                                <span>Générateur</span>
                            </button>
                            <button
                                onClick={() => { setActiveTab('profile'); setIsMenuOpen(false); }}
                                className="flex items-center space-x-2 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                            >
                                <User className="w-4 h-4" />
                                <span>Profil</span>
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-8">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'questionnaire' && renderQuestionnaire()}

                {activeTab === 'documents' && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-orange-100/50 shadow-xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Mes Documents</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-2">Glissez votre CV ici</p>
                                <p className="text-sm text-gray-500">ou cliquez pour parcourir</p>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-3">
                                    <FileText className="w-8 h-8 text-blue-600" />
                                    <div className="flex-1">
                                        <div className="font-medium">CV_John_Doe.pdf</div>
                                        <div className="text-sm text-gray-500">Uploadé il y a 2 jours</div>
                                    </div>
                                    <button className="text-gray-400 hover:text-red-500">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-orange-100/50 shadow-xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Mon Profil</h2>
                        <div className="space-y-6">
                            <div className="flex items-center space-x-6">
                                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
                                    <p className="text-gray-600">Développeur Full Stack</p>
                                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                                    <input
                                        type="text"
                                        defaultValue="John Doe"
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        defaultValue="john.doe@example.com"
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                    <input
                                        type="tel"
                                        defaultValue="+33 6 12 34 56 78"
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                                    <input
                                        type="text"
                                        defaultValue="Paris, France"
                                        className="w-full p-3 border border-gray-300 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <button className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                                Sauvegarder les modifications
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ModernWebApp;