import React from 'react'

const Footer = () => {
  return (
    
    <div className="px-5 py-2 text-center text-gray-300 bg-gray-900">
      <p>
        © Copyright Spices Storyline
      </p>
      <div className="mt-2">
        <a
          href="https://github.com/dynamic-user"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-200 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 inline-block mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 12h2a9 9 0 0 0 9-9c0-4.418-3.582-8-8-8a8.962 8.962 0 0 0-6.383 2.617A7.958 7.958 0 0 0 2 10a8.962 8.962 0 0 0 2.617 6.383A8.96 8.96 0 0 0 2 18h2a6.963 6.963 0 0 1 6-6c1.918 0 3.652.772 4.919 2.029A6.963 6.963 0 0 1 20 18h2"
            />
          </svg>
          GitHub Profile
        </a>
      </div>
    </div>
  )
}

export default Footer