import { IonicNativePlugin } from '@ionic-native/core';

export class ForegroundServiceMock extends IonicNativePlugin {
    /**
     * Enables the foreground service
     *
     * @param title (content title) A brief headline for the notification
     * @param text (content text) Supporting information
     * @param icon The drawable icon can be any drawable image that exists in the resource
     * folder. This means you must copy the icon you want to use into the platforms/android/app/src/main/res/drawable
     * folder set. If no icon can be found using the icon name parameter, a default star icon will be used.
     *
     * For an example, if the `fsicon.png` (see xml below) resides here: ```src/assets/icon/fsicon.png```.
     * Then ```icon``` parameter value would be ```'drawable/fsicon'```. In order for this example to work,
     * the following xml snippet must be in ```config.xml```.
     *
     * ```
     * <platform name="android">
     *   <resource-file src="www/assets/icon/fsicon.png" target="app/src/main/res/drawable/fsicon.png" />
     *   ...
     * ```
     * @param importance Notification importance dictates how the notification is initially presented:
     *
     * Value | Importance | Description | Examples
     * --- | --- | --- | ---
     * 1|IMPORTANCE_LOW|Does not make a sound or heads-up display (plugin's default)|New content the
     * user has subscribed to, social network invitations
     * 2|IMPORTANCE_DEFAULT|Makes a sound, but no heads-up display|Traffic alerts, task reminders
     * 3|IMPORTANCE_HIGH|Makes a sound and heads-up display|Text messages, alarms, phone calls
     *
     * @param id The notification id is a customizable integer that is used to reference the
     *  notification that will be launched. This is customizable to avoid conflicting with any other
     *  notifications. If this is not included, a [*unique*] default id will be used.
     *
     * @see https://material.io/design/platform-guidance/android-notifications.html
     */
    start(title: string, text: string, icon?: string, importance?: 1 | 2 | 3, id?: number): void {
        return;
    }
    /**
     * Disables the foreground service
     */
    stop(): void {
        return;
    }
}
