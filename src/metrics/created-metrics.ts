const w = (window as any); // tslint:disable-line:no-any

const logError = w.frontendlogger ? (melding: string, error: Error) => {
    w.frontendlogger.error({
        userMessage: melding,
        message: error.message,
        name: error.name,
        stacktrace: error.stack,
    });
} : () => { return; };

export class CreatedMetrics {

    private static readonly STORAGE_KEY = 'createdmetrics';

    static getCreatedMetrics(): CreatedMetric[] {
        const metricStore: string | null = sessionStorage.getItem(CreatedMetrics.STORAGE_KEY);

        return metricStore ? JSON.parse(metricStore, (key, value) => key === 'created' ? new Date(value) : value) : [];
    }

    static setCreatedMetrics(metrics: CreatedMetric[]) {
        try {
            sessionStorage.setItem(CreatedMetrics.STORAGE_KEY, JSON.stringify(metrics));
        } catch (e) {
            const feilmelding = 'Lagring til sessionStorage feilet ifm. å forhindre duplikate metrikker';
            console.error(feilmelding, e);
            logError(feilmelding, e);
            throw e;
        }
    }

    static lessThenThreeSecondsAgo(metric: CreatedMetric) {
        return ((new Date().getTime() - metric.created.getTime()) / 1000) < 3;
    }

    deleteOutdated(metrics: CreatedMetric[]) {
        return metrics.filter((m: CreatedMetric) => CreatedMetrics.lessThenThreeSecondsAgo(m));
    }

    fetchAndRefreshCreatedMetrics(): CreatedMetric[] {
        const createdMetrics: CreatedMetric[] = CreatedMetrics.getCreatedMetrics();

        const refreshedCreatedMetrics = this.deleteOutdated(createdMetrics);

        return refreshedCreatedMetrics;
    }

    alreadyCreated(name: string): boolean {
        const createdMetrics = this.fetchAndRefreshCreatedMetrics();

        return !!createdMetrics.find((m: CreatedMetric) => m.name === name);
    }

    registerCreatedMetric(name: string): void {
        const createdMetrics = this.fetchAndRefreshCreatedMetrics();

        const updatedCreatedMetrics = createdMetrics.concat({created: new Date(), name});

        CreatedMetrics.setCreatedMetrics(updatedCreatedMetrics);
    }

}

interface CreatedMetric {
    created: Date;
    name: string;
}
