import { useState, useRef, useEffect } from 'react';
import rpoLogo from '../assets/RPO-logo.png';

export default function Footer() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [language, setLanguage] = useState('Slovenščina');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'sl', name: 'Slovenščina' },
    { code: 'en', name: 'English' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <footer className="bg-[#061E2A] text-gray-300 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around gap-8 mb-12">
          <div>
            <h4 className="font-bold text-white mb-6">Igre</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Chicken kura igra sui</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Črni jaka</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Igra s kockami</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Igra številka štiri #4</a></li>
            </ul>
          </div>

          <div className='text-center'>
            <h4 className="font-bold text-white mb-6">O nas</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Člani skupine</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Namen projektne naloge</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Lokacija</a></li>
              <li><a href="#" className="hover:text-blue-400 transition"></a></li>
            </ul>
          </div>

          <div className='text-right basis-48'>
            <h4 className="font-bold text-white mb-6">Ostale povezave</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">Pomoč uporabnikom</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Zaposlitev</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Pravno obvestilo</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Varstvo osebnosti</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>

        <div className="text-center flex flex-col items-center">
          <div className="mb-6 relative inline-block text-left" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none transition-colors border border-gray-600"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
              </svg>
              {language}
              <svg className={`ml-2 w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 border border-gray-600 overflow-hidden">
                <div className="py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.name);
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${language === lang.name ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600 hover:text-white'
                        }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <img src={rpoLogo} alt="RPO Logo" className="h-16 mx-auto mb-4" />
          <p className="text-sm">© 2025 RPO Projektna naloga</p>
        </div>
      </div>
    </footer>
  );
}
