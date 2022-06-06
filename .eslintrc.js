module.exports = {
    globals: {
        NodeJS: true
    },
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        'no-useless-constructor': 'off',
        curly: ['error', 'multi', 'consistent'],
        indent: ['error', 4],
        '@typescript-eslint/member-ordering': ['error', { default: ['signature', 'constructor', 'method', 'field'] }]
    },
    overrides: [
        {
            files: ['*.spec.ts'],
            rules: {
                'no-unused-expressions': 'off'
            }
        }
    ]
}
