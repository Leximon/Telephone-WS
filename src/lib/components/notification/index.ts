import { writable } from "svelte/store";

export const notifications = writable(<Notification[]>[])

export function showNotification(type: string, duration: number, message: string, html: boolean) {
    const notification = {
        type,
        start: Date.now(),
        duration,
        message,
        html
    };
    notifications.update(notifications => {
        notifications.push(notification);
        return notifications;
    });
    setTimeout(() => {
        notifications.update(notifications => {
            return notifications.filter(n => n.start !== notification.start);
        });
    }, duration);
            
}

export function showError(message: string, duration = 3000, html = false) {
    showNotification("error", duration, message, html);
}

export function showUnknownError() {
    showNotification("error", 5000, "Ein unerwarteter Fehler ist aufgetreten. Siehe Konsole für mehr Informationen.", false);
}

export function showInfo(message: string, duration = 3000, html = false) {
    showNotification("info", duration, message, html);
}

export type Notification = {
    type: string;
    start: number;
    duration: number;
    message: string;
    html: boolean;
}