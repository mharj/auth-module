process.env.NODE_ENV = 'test';
import {expect} from 'chai';
import {IdentityProvider} from '../src/IdentityProvider';
import {AuthManager} from '../src/';
import {IdpRequest} from '../src/IdpRequest';

class TestIdp extends IdentityProvider {
	private props = {
		token_endpoint: '/auth/token',
		authorization_endpoint: '/auth/login',
	};
	public getName(): string {
		return 'test-idp';
	}
	public getClientId(): string {
		return 'ae34381d-b19c-4d27-bbe6-c565ff022cb8';
	}
	public getDefaultResponseMode() {
		return 'fragment';
	}
	public getAuthEndpoint(): Promise<string> {
		return Promise.resolve(this.props.authorization_endpoint);
	}
	public getTokenEndpoint(): Promise<string> {
		return Promise.resolve(this.props.token_endpoint);
	}
	public toJson(): object {
		return this.props;
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
			expect(mgr.toJson()).to.be.eql({
				idpList: [
					{
						name: 'test-idp',
						props: {
							token_endpoint: '/auth/token',
							authorization_endpoint: '/auth/login',
						},
					},
				],
			});
			console.log(await mgr.loginUri(new IdpRequest({scopes: ['openid'], redirect_uri: 'http:/localhost'})));
		});
	});
});
