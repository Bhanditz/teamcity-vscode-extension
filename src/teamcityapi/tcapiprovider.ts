"use strict";
import { Credential } from "../credentialstore/credential";
import { VsCodeUtils } from "../utils/vscodeutils";
import { Constants } from "../utils/constants";
import { Strings } from "../utils/strings";
import { ProjectItem } from "../remoterun/configexplorer";
import { BuildConfigResolver, XmlRpcBuildConfigResolver } from "./buildconfigresolver";
import { NotificationProvider } from "./notificationprovider";
import { SummaryDataProxy } from "../notifications/summarydata";

export interface TCApiProvider {
    /* async */ checkCredential( cred : Credential ) : Promise<boolean>;
    /* async */ getSuitableBuildConfigs( tcFormatedFilePaths : string[], cred : Credential ) : Promise<ProjectItem[]>;
    /* async */ getTotalNumberOfEvents( cred : Credential ) : Promise<number>;
    /* async */ getSummary( cred : Credential ) : Promise<SummaryDataProxy>;
}

export class TCRestApiProvider implements TCApiProvider {

    /**
     * @param cred Credential of user
     * @return Promise<boolean>: true in case of success, false in case of fail.
     */
    public async checkCredential( cred : Credential ) : Promise<boolean> {
        const url = cred.serverURL + "/app/rest/";
        const p : Promise<boolean> = new Promise((resolve, reject) => {
            VsCodeUtils.makeRequest("GET", url, cred)
            .then((response) => { resolve(true); })
            .catch((err) => {
                if (err.status === Constants.HTTP_STATUS_UNAUTHORIZED) {
                    VsCodeUtils.showErrorMessage(Strings.STATUS_CODE_401);
                } else {
                    VsCodeUtils.showErrorMessage(Strings.UNEXPECTED_EXCEPTION);
                }
                resolve(false);
            });
        });
        return p;
    }

    public async getSuitableBuildConfigs( tcFormatedFilePaths : string[], cred : Credential ) : Promise<ProjectItem[]> {
        //TODO: implement with RestBuildConfigResolver class. API from TeamCity required.
        throw "UnsupportedMethodException.";
    }

    public async getTotalNumberOfEvents( cred : Credential ) : Promise<number> {
        //TODO: implement with RestBuildConfigResolver class. API from TeamCity required.
        throw "UnsupportedMethodException.";
    }

    public async getSummary( cred : Credential ) : Promise<SummaryDataProxy> {
        //TODO: implement with RestBuildConfigResolver class. API from TeamCity required.
        throw "UnsupportedMethodException.";
    }
}

export class TCXmlRpcApiProvider implements TCApiProvider {

    public async checkCredential(cred : Credential) : Promise<boolean> {
        throw "UnsupportedMethodException.";
    }

    public async getSuitableBuildConfigs( tcFormatedFilePaths : string[], cred : Credential ) : Promise<ProjectItem[]> {
        const configResolver : BuildConfigResolver =  new XmlRpcBuildConfigResolver(cred.serverURL);
        return configResolver.getSuitableBuildConfigs(tcFormatedFilePaths, cred);
    }

    /**
     * @return - number of event for existing subscriptions.
     * Subs are created at ModificationCounterSubscription.fromTeamServerSummaryData during NotificationProvider#init
     */
    public async getTotalNumberOfEvents( cred : Credential ) : Promise<number> {
        const notificationProvider : NotificationProvider = await NotificationProvider.getInstance(cred);
        return notificationProvider.getTotalNumberOfEvents();
    }

    public async getSummary( cred : Credential ) : Promise<SummaryDataProxy> {
        const notificationProvider : NotificationProvider = await NotificationProvider.getInstance(cred);
        return notificationProvider.getSummeryData(cred);
    }
}
