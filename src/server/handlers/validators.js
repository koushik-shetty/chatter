const swears = [
    'IDIOT', 'STUPID', 'MORON',
]

export function hasNoSwearDetector(message) {
    if (message && message.payload) {
        if (message.payload.text){
            return swears.every(swear => !message.payload.text.toUpperCase().includes(swear))
        }
        return true;
    }
    return false;
}

export const validators = [
    hasNoSwearDetector,
];

export function runAgainstValidators(message, validators) {
    return validators.every(validator => validator(message));
}