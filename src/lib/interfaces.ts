export interface JWTPayload {
	nameid: string;
	exp: number;
	iat: number;
}

export interface AuthenticatedUser extends JWTPayload {
	token: string;
}
