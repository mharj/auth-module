import {Account} from './Account';
import {IdentityProvider} from './IdentityProvider';

export class AuthManager {
	private idpList: IdentityProvider[] = [];
	private default: IdentityProvider | undefined;
	public add(idp: IdentityProvider) {
		this.idpList.push(idp);
		this.default = idp;
	}

	public getAuthEndpoint(): Promise<string> {
		if (!this.default) {
			throw new Error('no IDP defined');
		}
		return this.default.getAuthEndpoint();
	}
	public listAccount(): Account[] {
		const accountList: Account[] = [];
		for (const idp of this.idpList) {
			idp.getAccountList().forEach(accountList.push);
		}
		return accountList;
	}
}
