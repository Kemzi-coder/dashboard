/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		colors: {
			text: {
				light: "#ffffff",
				dark: "#87888e",
				darker: "#65656a"
			},
			primary: {
				DEFAULT: "#1d1e25",
				light: "#2b2c32",
				lighter: "#333339"
			},
			accent: {
				DEFAULT: "#6366ea",
				dark: "#2d2f50",
				darker: "#252635",
				btn: "#4c50e6"
			},
			transparent: "transparent",
			danger: "#c85f5f",
			success: "#78b1a3",
			warning: "#cfa254"
		},
		extend: {
			borderRadius: {
				base: "0.5rem"
			}
		}
	},
	plugins: []
};
