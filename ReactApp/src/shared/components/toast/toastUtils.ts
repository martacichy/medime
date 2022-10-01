
import { toast } from "react-toastify";

export function getDefaultToastConfiguration() {
    return {
        autoClose: 5000,
        draggable: false,
        position: toast.POSITION.BOTTOM_RIGHT,
        closeOnClick: true,
        pauseOnHover: false,
    };
}

type autoCloseType = number | false | undefined;
interface HandlePromiseMessages {
    pending: string;
    resolve: string;
    reject: string;
}
interface HandlePromiseOptions {
    autoClose?: autoCloseType;
    messages: HandlePromiseMessages;
}

export function handlePromise<Type>(promise: Promise<Type>, { messages, autoClose = false }: HandlePromiseOptions) {
    const toastId = toast(messages.pending, {
        type: "info",
        autoClose: autoClose,
    });

    return promise
        .then(response => {
            toast.update(toastId, {
                render: messages.resolve,
                type: "success",
                autoClose: 5000,
            });
            return response;
        })
        .catch(error => {
            toast.update(toastId, {
                render: error || messages.reject || "Wystąpił błąd podczas wykonywania operacji",
                type: "error",
                autoClose: 5000,
            });
        });
}

export function toastErrorWithConsoleOutput(error?: Error, customMessage?: string) {
    showError(customMessage || error?.message);
    console.error(error, customMessage);
}

export function showError(message?: string, autoClose: autoCloseType = 5000) {
    toast(message || "Wystąpił nieoczekiwany błąd.", {
        type: "error",
        autoClose: autoClose,
    });
}

export function showWarning(message?: string, autoClose: autoCloseType = 5000) {
    toast(message || "Ostrzeżenie", {
        type: "warning",
        autoClose: autoClose,
    });
}

export function showSuccess(message?: string) {
    toast(message || "Sukces", {
        type: "success",
    });
}

export function showInfo(message: string) {
    toast(message, {
        type: "info",
    });
}