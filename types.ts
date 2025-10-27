

import React from 'react';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  fullDescription: string; // Added for detail page
  icon: React.ReactNode;
  // Added images property to the Service interface
  images: string[];
}