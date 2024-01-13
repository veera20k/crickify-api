export function getRandomColor(identifier?: number | string) {
    function hash(str: string): number {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 33) ^ str.charCodeAt(i);
        }
        return hash >>> 0;
    }
    function generateColor(seed: number): string {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[(seed + i) % 16];
        }
        return color;
    }
    if (identifier === undefined) {
        return generateColor(Math.floor(Math.random() * 1000000));
    }
    const seed = hash(String(identifier));
    return generateColor(seed);
}
