declare global {
	declare namespace App {
	}

	namespace NodeJS {
		interface ProcessEnv {
			DB_CONN_STRING: string;
		}
	}
}