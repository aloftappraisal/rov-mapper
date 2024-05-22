export function makeColor(colorValue: string): {
    toColorCode: () => string;
    toHex: () => string;
} {
    return {
        toColorCode: () => `#${colorValue}`,
        toHex: () => `0x${colorValue}`,
    };
}
