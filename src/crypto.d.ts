declare module 'crypto-browserify' {
    function randomBytes(size: number): Buffer;
    function createHash(type: string): any;
}