module.exports = {
	plugins: ["prettier"],
	extends: ["eslint:recommended", "plugin:prettier/recommended"],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
	},
	env: {
		commonjs: true,
		node: true,
		mocha: true,
	},
	rules: {
		"space-before-blocks": ["error", "always"],
		"space-before-function-paren": ["error", "always"],
		"keyword-spacing": [
			"error",
			{
				before: true,
				after: true,
			},
		],
		indent: ["error", "tab", { SwitchCase: 1 }],
		"linebreak-style": 0,
		semi: ["error", "always"],
		"no-console": 0,
	},
};
