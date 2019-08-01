export class CreatedMetrics {

    private static readonly STORAGE_KEY = 'createdmetrics';

    static getCreatedMetrics(): CreatedMetric[] {
        const metricStore: string | null = sessionStorage.getItem(CreatedMetrics.STORAGE_KEY);

        return metricStore ? JSON.parse(metricStore, (key, value) => key === 'created' ? new Date(value) : value) : [];
    }

    static setCreatedMetrics(metrics: CreatedMetric[]) {
        sessionStorage.setItem(CreatedMetrics.STORAGE_KEY, JSON.stringify(metrics));
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
