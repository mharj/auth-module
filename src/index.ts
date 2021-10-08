import {Account} from './Account';
import {IdentityProvider} from './IdentityProvider';
import {IdpRequest} from './IdpRequest';
import {base64URLEncode, sha256} from './util';

export class AuthManager {
	private idpList: IdentityProvider[] = [];
	private default: string | undefined;
	public add(idp: IdentityProvider) {
		this.idpList.push(idp);
		this.default = idp.getName();
	}

	public getAuthEndpoint(): Promise<string> {
		if (!this.default) {
			throw new Error('no IDP defined');
		}
		const defaultIdp = this.idpList.find((idp) => idp.getName() === this.default);
		if (!defaultIdp) {
			throw new Error('no IDP found');
		}
		return defaultIdp.getAuthEndpoint();
	}
	public listAccount(): Account[] {
		const accountList: Account[] = [];
		for (const idp of this.idpList) {
			idp.getAccountList().forEach(accountList.push);
		}
		return accountList;
	}
	public async loginUri(request: IdpRequest, nonce?: string): Promise<string> {
		const {redirect_uri, scope, pkceVerifier, challengeMethod, responseMode} = request.toJson();
		const idp = this.getDefault();
		const oauth: any = {
			client_id: idp.getClientId(),
			redirect_uri,
			response_mode: responseMode || idp.getDefaultResponseMode(),
			response_type: 'code',
			scope,
		};
		if (nonce) {
			oauth.nonce = nonce;
		}
		if (pkceVerifier && challengeMethod) {
			if (challengeMethod === 'S256') {
				oauth.code_challenge = base64URLEncode(sha256(pkceVerifier));
				oauth.code_challenge_method = 'S256';
			} else {
				oauth.code_challenge = pkceVerifier;
				oauth.code_challenge_method = 'plain';
			}
		}
		return `${await idp.getAuthEndpoint()}?${new URLSearchParams(oauth).toString()}`;
	}
	public toJson() {
		return {
			idpList: this.idpList.map((idp) => ({name: idp.getName(), props: idp.toJson()})),
		};
	}
	private getDefault(): IdentityProvider {
		if (!this.default) {
			throw new Error('no IDP defined');
		}
		const defaultIdp = this.idpList.find((idp) => idp.getName() === this.default);
		if (!defaultIdp) {
			throw new Error('no IDP found');
		}
		return defaultIdp;
	}
}
