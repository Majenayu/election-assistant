'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const [language, setLanguage] = useState('en')

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ]

  return (
    <div className="relative group">
      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center space-x-1">
        <Globe size={20} />
        <span className="text-sm">{language.toUpperCase()}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  )
}
