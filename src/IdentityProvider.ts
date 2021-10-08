import {Account} from './Account';

export abstract class IdentityProvider {
	protected accounts: Account[] = [];
	public abstract getName(): string;
	public abstract getClientId(): string;
	public abstract getDefaultResponseMode(): string;
	public abstract toJson(): object;
	public abstract getAuthEndpoint(): Promise<string>;
	public abstract getTokenEndpoint(): Promise<string>;
	public getAccountList() {
		return this.accounts;
	}
}
