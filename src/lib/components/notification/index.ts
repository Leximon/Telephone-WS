import { writable } from "svelte/store";

export const notifications = writable(<Notification[]>[])

export function showNotification(type: string, duration: number, message: string) {
    const notification = {
        type,
        start: Date.now(),
        duration,
        message
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

export function showError(message: string, duration = 3000) {
    showNotification("error", duration, message);
}

export function showUnknownError() {
    showNotification("error", 5000, "Ein unerwarteter Fehler ist aufgetreten. Siehe Konsole für mehr Informationen.");
}

export function showInfo(message: string, duration = 3000) {
    showNotification("info", duration, message);
}

export type Notification = {
    type: string;
    start: number;
    duration: number;
    message: string;
}