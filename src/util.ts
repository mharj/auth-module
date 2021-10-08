import * as cryptoBrowserify from 'crypto-browserify';

export const sha256 = (buffer: string) => {
	return cryptoBrowserify.createHash('sha256').update(buffer).digest();
};

export const base64URLEncode = (str: Buffer) => {
	return str.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};