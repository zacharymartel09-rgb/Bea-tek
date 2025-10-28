
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

  return (
    <section id="contact" className="py-20 bg-bea-tek-dark text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center text-bea-tek-magenta mb-12">Contactez-nous</h2>
        <p className="text-lg text-center text-gray-300 mb-8">
          Avez-vous des questions, besoin d'un devis ou souhaitez-vous discuter de votre prochain événement ?
          Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
        </p>
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div className="mb-6">
            <label htmlFor="name" className="block text-white text-sm font-semibold mb-2">
              Nom Complet
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-bea-tek-magenta text-white"
              placeholder="Votre nom"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
              Adresse E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-bea-tek-magenta text-white"
              placeholder="votre.email@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-white text-sm font-semibold mb-2">
              Votre Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-bea-tek-magenta text-white"
              placeholder="Décrivez votre événement ou votre demande..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-bea-tek-magenta hover:bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-md text-lg transition duration-300 transform hover:scale-105 shadow-lg"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Préparation de votre e-mail...' : 'Envoyer le Message'}
          </button>
          {status === 'success' && (
            <p className="mt-4 text-center text-green-400">Votre client de messagerie devrait s'ouvrir pour envoyer l'e-mail.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-center text-red-400">Une erreur est survenue. Veuillez réessayer.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
