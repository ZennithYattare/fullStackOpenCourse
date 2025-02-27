/** @format */

module.exports = {
	env: {
		browser: true,
		node: true,
		commonjs: true,
		es2021: true,
		jest: true,
		"cypress/globals": true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ["react", "jest", "cypress"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": 0,
		quotes: ["error", "double"],
		semi: ["error", "always"],
		eqeqeq: "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": ["error", "always"],
		"arrow-spacing": ["error", { before: true, after: true }],
		"no-console": 0,
		"react/prop-types": 0,
		"react/react-in-jsx-scope": "off",
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};
