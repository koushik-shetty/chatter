const swears = [
    'IDIOT', 'STUPID', 'MORON',
]

export function swearDetector(message) {
    if (message && message.payload) {
        return String(message.payload).split(" ").every(word => {
            return !swears.includes(word.toUpperCase());
        });
    }
    return false;
}

export const validators = [
    swearDetector,
];

export function runAgainstValidators(message, validators) {
    return validators.every(validator => validator(message));
}