
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const { name, email, message } = formData;
      const subject = `Demande de devis de ${name}`;
      const body = `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      
      // Use mailto to open user's email client
      window.location.href = `mailto:beatekevents@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      setFormData({ name: '', email: '', message: '' }); // Clear form
      setStatus('success');

    } catch (error) {
      console.error('Error creating mailto link:', error);
      setStatus('error');
    }

    // Reset status after a delay, regardless of outcome
    setTimeout(() => setStatus('idle'), 5000);
  };

  const isDisabled = status === 'submitting';

  return (
    <section id="contact" className="py-20 bg-bea-tek-dark text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-bea-tek-magenta mb-12">Nous Contacter</h2>
        <p className="text-lg text-center text-gray-300 mb-8">
          Avez-vous des questions, besoin d'un devis ou souhaitez-vous discuter de votre prochain événement ?
          Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
        </p>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="mb-6">
            <label htmlFor="name" className="block text-white text-sm font-semibold mb-2">
              Nom Complet
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-bea-tek-magenta text-white"
                placeholder="Votre nom"
                required
                disabled={isDisabled}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
              Adresse E-mail
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-bea-tek-magenta text-white"
                placeholder="votre.email@example.com"
                required
                disabled={isDisabled}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-white text-sm font-semibold mb-2">
              Votre Message
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-bea-tek-magenta text-white"
                placeholder="Décrivez votre événement ou votre demande..."
                required
                disabled={isDisabled}
              ></textarea>
              <div className="absolute inset-y-0 left-0 flex items-start pt-3 pl-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                </svg>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full bg-bea-tek-magenta hover:bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-md text-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isDisabled}
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </>
            ) : (
              'Envoyer le Message'
            )}
          </button>
          {status === 'success' && (
            <p className="mt-4 text-center text-green-400 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Votre client de messagerie devrait s'ouvrir pour envoyer l'e-mail.
            </p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-center text-red-400 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;