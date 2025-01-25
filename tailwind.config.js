/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-blur': 'linear-gradient(180deg, #0EA5E9 0%, #FFFFFF 100%)',
				'miko': 'linear-gradient(180deg, rgba(232, 121, 249, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
				'blaze': 'linear-gradient(180deg, #0EA5E9 0%, #FFFFFF 100%)',
				'kai': 'linear-gradient(180deg, #F59E0B 0%, #FFFFFF 100%)',
				'daniel': 'linear-gradient(180deg, #3B82F6 0%, #FFFFFF 100%)',
				'gradient-avatar': 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 177.25%)',
				'gradient-blue-white': 'linear-gradient(180deg, rgba(14, 165, 233, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%)',
			},
			boxShadow: {
				'inset-soft': '0px 0px 8px 0px #FFFFFF inset',
				'inset-badge': '0px 0px 8px 0px rgba(255, 255, 255, 0.5) inset',
				'inset-glow': '0px 0px 24px 0px #FFFFFF80 inset',
				'inset-hard': '0px 0px 32px 0px #FFFFFF inset',
				'inset-heavy': '0px 0px 48px 0px #FFFFFF inset',
				'inset-avatar': '0px 0px 32px 6px #FFFFFF inset, 0px 0px 100px 0px #FFFFFF inset',
				'inset-hard-2': '0px 0px 32px 0px rgba(255, 255, 255, 1) inset', // Strong inset glow

			},
			backdropBlur: {
				light: '32px',
				heavy: '400px',
			},
			backdropFilter: {
				'blur-64': 'blur(64px)',
			},
			animation: {
				float: "float 6s ease-in-out infinite",
				"float-slow": "float 8s ease-in-out infinite",
			},
			keyframes: {
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-20px)" },
				},
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}