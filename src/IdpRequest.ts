interface IdpRequestConfig {
	scopes: string[];
	redirect_uri: string;
	pkceVerifier?: string;
	challengeMethod?: 'S256' | 'plain';
	responseMode?: 'query' | 'fragment' | 'form_post';
}

interface IdpExport {
	scope: string;
	redirect_uri: string;
	pkceVerifier?: string;
	challengeMethod?: 'S256' | 'plain';
	responseMode?: 'query' | 'fragment' | 'form_post';
}
export class IdpRequest {
	private props: IdpRequestConfig;
	constructor(props: IdpRequestConfig) {
		this.props = props;
	}
	public toJson(): IdpExport {
		const {scopes, redirect_uri, pkceVerifier, challengeMethod, responseMode} = this.props;
		return {
			scope: scopes.join(' '),
			redirect_uri,
			pkceVerifier,
			challengeMethod,
			responseMode,
		};
	}
}
