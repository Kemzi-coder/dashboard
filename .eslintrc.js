module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ["plugin:react/recommended", "airbnb", "airbnb/hooks", "prettier"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["react", "react-hooks", "prettier"],
	rules: {
		"prettier/prettier": ["error", {endOfLine: "auto"}],
		"react/function-component-definition": [
			"error",
			{
				namedComponents: "arrow-function"
			}
		],
		"react/jsx-props-no-spreading": "off",
		"react/forbid-prop-types": "off",
		"no-param-reassign": [
			"error",
			{
				props: false
			}
		],
		"no-console": "off"
	}
};
