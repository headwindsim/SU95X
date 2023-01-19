import { FbwAircraftSentryClient } from './FbwAircraftSentryClient';

declare const process: any;

new FbwAircraftSentryClient().onInstrumentLoaded({
    dsn: process.env.SENTRY_DSN,
    buildInfoFilePrefix: 'SU95X',
    root: false,
    enableTracing: false,
});
