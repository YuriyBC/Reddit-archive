module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
    "plugins": [
        "react"
    ],
    "parser": "babel-eslint",
    "rules": {
        "indent": [0, 4, {"SwitchCase": 1}],
        "camelcase": [0, {properties: "never"}],
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "no-useless-constructor": ["error"],
        "react/prop-types": 0,
        "react/jsx-indent-props": [2, 'first'],
        "react/jsx-first-prop-new-line": [1, "multiline"],
        "react/jsx-indent": [0, 4],
        "react/no-array-index-key": [0],
        "class-methods-use-this": [0],
        "jsx-a11y/click-events-have-key-events": [0]
    }
};