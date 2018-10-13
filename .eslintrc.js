module.exports = {
    "extends": "standard",
    "env": {
        "browser": true,
        "node": true,
        "jest": true
    },
    "rules": {
        "semi": [2, "always"],
        "space-before-function-paren": [0],
        "complexity": ["error", 7],
        "max-params": ["error", 3]
    }
};
