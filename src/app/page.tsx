'use client';

import { useState } from 'react';
import LostCardForm from './lost-card/page';
import BrokenCardForm from './broken-card/page';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'lost' | 'broken'>('lost');

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Card Reprint Request
        </h1>
        <p className="text-gray-600 text-lg text-center mb-6">
          Choose the form to fill out. We’re here to help you with lost or broken cards.
        </p>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-gray-300 mb-6">
          <button
            onClick={() => setActiveTab('lost')}
            className={`px-4 py-2 font-medium text-lg ${
              activeTab === 'lost'
                ? 'border-b-4 border-indigo-600 text-indigo-600'
                : 'text-gray-500 hover:text-indigo-600'
            }`}
          >
            Lost Card
          </button>
          <button
            onClick={() => setActiveTab('broken')}
            className={`px-4 py-2 font-medium text-lg ${
              activeTab === 'broken'
                ? 'border-b-4 border-purple-600 text-purple-600'
                : 'text-gray-500 hover:text-purple-600'
            }`}
          >
            Broken Card
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === 'lost' && <LostCardForm />}
          {activeTab === 'broken' && <BrokenCardForm />}
        </div>
      </div>
    </div>
  );
}
