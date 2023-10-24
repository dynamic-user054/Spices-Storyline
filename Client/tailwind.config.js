/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend:{ backgroundImage: {
      'HomeBG': "url('Assets/SignUpBg.jpg')",
      'RecipeBg': "url('Assets/RecipeBg.jpg')",
      'LoginBg': "url('Assets/LoginBg.jpg')",
      'SignUpBg': "url('Assets/SignUpBg.jpg')",
      'ProfileBg': "url('Assets/ProfileBg.jpg')"}
    },
  },
  plugins: [
    require('tailwindcss-transforms'),
    require('tailwindcss-transition'),]
}