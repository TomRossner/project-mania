// Regex patterns
const REGEX_PATTERNS = {
    EMAIL: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
    PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
    NAME: /([a-zA-Z]{3,30}\s*)+/,
}

// Pattern types
export const PATTERN_TYPES = {
    EMAIL: 'email',
    PASSWORD: 'password',
    NAME: 'name'
}



// Check regex pattern
export const checkPattern = (type, input) => {
    
    const {EMAIL, PASSWORD, NAME} = REGEX_PATTERNS;

    switch(type) {
        case PATTERN_TYPES.EMAIL:
            return input.match(EMAIL);
        case PATTERN_TYPES.PASSWORD:
            return input.match(PASSWORD);
        case PATTERN_TYPES.NAME:
            return input.match(NAME);
        default:
            return false;
    }
}