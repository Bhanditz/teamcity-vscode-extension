"use strict";

export interface Settings {
    loggingLevel: string;

    /**
     * showSignInWelcome field has only a getter
     * To change this value use setShowSignInWelcome method
     */
    showSignInWelcome: boolean;
    shouldStoreCredentials(): boolean;
    setShowSignInWelcome(newValue: boolean): Promise<void>;
}
