import React, { useState } from 'react';

interface ApiKeyPromptProps {
  onApiKeySelected: () => void;
  isLoading: boolean;
}

const ApiKeyPrompt: React.FC<ApiKeyPromptProps> = ({ onApiKeySelected, isLoading }) => {
  const handleSelectApiKey = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
      // openSelectKey does not return a promise, but it triggers the environment update.
      // We assume success after it's called, and the parent component will re-check.
      await window.aistudio.openSelectKey();
      onApiKeySelected(); // Notify parent to re-check API key status
    } else {
      console.error("window.aistudio is not available. Cannot open API key selection dialog.");
      // Optionally, display a user-friendly error message if aistudio is not available.
      alert("Erreur: L'interface de sélection de clé API n'est pas disponible. Assurez-vous que l'application est exécutée dans un environnement compatible.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-gray-800 p-8 md:p-10 rounded-lg shadow-2xl max-w-lg w-full text-center border-2 border-bea-tek-magenta animate-fade-in-up">
        <h2 className="text-3xl font-bold text-bea-tek-magenta mb-6">Clé API requise</h2>
        <p className="text-lg text-white mb-6">
          Avant d'utiliser l'assistant IA, veuillez sélectionner votre clé API Gemini. Cela est nécessaire pour que l'IA puisse fonctionner.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Notez que l'utilisation de l'API Gemini peut entraîner des coûts. Plus d'informations sur la facturation :{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bea-tek-magenta hover:underline"
          >
            ai.google.dev/gemini-api/docs/billing
          </a>
        </p>
        <button
          onClick={handleSelectApiKey}
          className="bg-bea-tek-magenta hover:bg-fuchsia-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : null}
          {isLoading ? 'Chargement...' : 'Sélectionner Clé API'}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyPrompt;