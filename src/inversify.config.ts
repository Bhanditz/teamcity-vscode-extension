"use strict";

import {Container} from "inversify";
import {TYPES} from "./bll/utils/constants";
import {Settings} from "./bll/entities/settings";
import {SettingsImpl} from "./bll/entities/settingsimpl";
import {CredentialsStore} from "./bll/credentialsstore/credentialsstore";
import {CredentialsStoreImpl} from "./bll/credentialsstore/credentialsstoreimpl";
import {ExtensionManager} from "./extensionmanager";
import {ExtensionManagerImpl} from "./extensionmanagerimpl";
import {CommandHolder} from "./commandholder";
import {CommandHolderImpl} from "./commandholderimpl";
import {NotificationWatcherImpl} from "./bll/notifications/notificationwatcherimpl";
import {NotificationWatcher} from "./bll/notifications/notificationwatcher";
import {RemoteLogin} from "./dal/remotelogin";
import {RemoteLoginImpl} from "./dal/remoteloginimpl";
import {RemoteBuildServer} from "./dal/remotebuildserver";
import {RemoteBuildServerImpl} from "./dal/remotebuldserverimpl";
import {WebLinks} from "./dal/weblinks";
import {WebLinksImpl} from "./dal/weblinksimpl";

export const myContainer = new Container();
myContainer.bind<Settings>(TYPES.Settings).to(SettingsImpl);
myContainer.bind<CredentialsStore>(TYPES.CredentialsStore).to(CredentialsStoreImpl);
myContainer.bind<ExtensionManager>(TYPES.ExtensionManager).to(ExtensionManagerImpl);
myContainer.bind<CommandHolder>(TYPES.CommandHolder).to(CommandHolderImpl);
myContainer.bind<NotificationWatcher>(TYPES.NotificationWatcher).to(NotificationWatcherImpl);
myContainer.bind<RemoteLogin>(TYPES.RemoteLogin).to(RemoteLoginImpl);
myContainer.bind<RemoteBuildServer>(TYPES.RemoteBuildServer).to(RemoteBuildServerImpl);
myContainer.bind<WebLinks>(TYPES.WebLinks).to(WebLinksImpl);
