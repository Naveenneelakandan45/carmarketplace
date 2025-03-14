module.exports = {
  darkMode: ['class'],
  content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      extend: {
          borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)',
          },
          colors: {
              background: 'hsl(var(--background))',
              foreground: 'hsl(var(--foreground))',
              card: {
                  DEFAULT: 'hsl(var(--card))',
                  foreground: 'hsl(var(--card-foreground))',
              },
              popover: {
                  DEFAULT: 'hsl(var(--popover))',
                  foreground: 'hsl(var(--popover-foreground))',
              },
              primary: require('tailwindcss/colors').neutral, // Replaced Zinc with Neutral
              secondary: require('tailwindcss/colors').neutral, // Replaced Zinc with Neutral
              muted: require('tailwindcss/colors').neutral, // Replaced Zinc with Neutral
              destructive: require('tailwindcss/colors').neutral, // Replaced Zinc with Neutral
              border: 'hsl(var(--border))',
              input: 'hsl(var(--input))',
              ring: 'hsl(var(--ring))',
              chart: {
                  '1': 'hsl(var(--chart-1))',
                  '2': 'hsl(var(--chart-2))',
                  '3': 'hsl(var(--chart-3))',
                  '4': 'hsl(var(--chart-4))',
                  '5': 'hsl(var(--chart-5))',
              },
          },
      },
  },
  plugins: [require('tailwindcss-animate')],
};
