import { Injectable, signal, computed, effect } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class BackendStatusService {
    private readonly POLL_INTERVAL_MS = 2500;
    private readonly POLL_TIMEOUT_MS = 2000;

    private readonly _isAwake = signal<boolean>(false);
    /**
     * Whether the backend is awake and ready to handle requests.
     */
    readonly isAwake = computed(() => this._isAwake());

    private pollIntervalId: number | null = null;
    private inFlight: boolean = false;

    constructor(private readonly apiService: ApiService) {}

    /**
     * Starts polling the backend status endpoint until it's awake.
     * Polls every 2.5 seconds with a 2-second timeout.
     */
    startChecking(): void {
        void this.checkOnce();
        this.pollIntervalId = window.setInterval(() => void this.checkOnce(), this.POLL_INTERVAL_MS);
    }

    /**
     * Stops checking the backend status.
     */
    stopChecking(): void {
        if (this.pollIntervalId) {
            clearInterval(this.pollIntervalId);
            this.pollIntervalId = null;
        }
    }

    /**
     * Resets the backend status to not awake.
     */
    reset(): void {
        this.stopChecking();
        this._isAwake.set(false);
    }

    /**
     * Performs a single check of the backend status.
     */
    private async checkOnce(): Promise<void> {
        if (this.inFlight) {
            return; // Avoid overlapping checks
        }
        this.inFlight = true;

        try {
            const response = await this.apiService.checkStatus(this.POLL_TIMEOUT_MS);
            if (response.awake) {
                this._isAwake.set(true);
                this.stopChecking(); // Stop further checks if awake
            }
        } catch {
            this._isAwake.set(false);
        } finally {
            this.inFlight = false;
        }
    }
}
