export interface AppContext {
	appName: string;
	buildDate: string;
}

export const appContext: AppContext = {
	appName: "Membership System",
	buildDate: new Date().toISOString(),
};
