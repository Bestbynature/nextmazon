import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require ("daisyui")],
  daisyui: {
    themes: [ "light", "dark", "cupcake",
      {
        mytheme: {
        
          "primary": "#2cd380",
                  
          "secondary": "#8455db",
                  
          "accent": "#b8c91e",
                  
          "neutral": "#1f212d",
                  
          "base-100": "#323234",
                  
          "info": "#67bada",
                  
          "success": "#28e6d0",
                  
          "warning": "#e9b52f",
                  
          "error": "#e0243a",
          "body": {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
}
export default config
