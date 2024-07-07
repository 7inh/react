export class ErrorHandler {
    static handle(error: any): void {
        if (error.response) {
            this.handleServerError(error.response);
        } else if (error.request) {
            this.handleNetworkError(error.request);
        } else {
            this.handleClientError(error.message);
        }
    }

    static handleServerError(response: any): void {
        console.error("Server Error:", response.status, response.data);
        if (response.status === 401) {
            console.error("Unauthorized access - logging out");
        }
    }

    static handleNetworkError(request: any): void {
        console.error("Network Error:", request);
    }

    static handleClientError(message: string): void {
        console.error("Client Error:", message);
    }
}
