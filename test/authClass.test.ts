process.env.NODE_ENV = 'test';
import {expect} from 'chai';
import {IdentityProvider} from '../src/IdentityProvider';
import {AuthManager} from '../src/';

class TestIdp extends IdentityProvider {
	public getName(): string {
		return 'test-idp';
	}
	public getAuthEndpoint(): Promise<string> {
		return Promise.resolve('/auth/login');
	}
	public getTokenEndpoint(): Promise<string> {
		return Promise.resolve('/auth/token');
	}
	public toJson(): object {
		throw new Error('Method not implemented.');
	}
}

describe('auth class', () => {
	before(async function () {
		// nothing yet
	});
	describe('jwtVerifyPromise', () => {
		it('should fail internal jwtVerifyPromise with broken data', async () => {
			const mgr = new AuthManager();
			mgr.add(new TestIdp());
			expect(await mgr.getAuthEndpoint()).to.be.eq('/auth/login');
		});
	});
});
