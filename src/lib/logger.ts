/**
 * Structured logger — replaces raw console.log/console.error throughout the app.
 *
 * In development: logs to console with labels.
 * In production: could be extended to send to a logging service
 * (e.g., Sentry, LogRocket, Datadog) without changing any call sites.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

const isDev = process.env.NODE_ENV === "development";

function formatMessage(level: LogLevel, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

export const logger = {
  info(message: string, ...args: unknown[]) {
    if (isDev) {
      console.log(formatMessage("info", message), ...args);
    }
  },

  warn(message: string, ...args: unknown[]) {
    console.warn(formatMessage("warn", message), ...args);
  },

  error(message: string, ...args: unknown[]) {
    console.error(formatMessage("error", message), ...args);
    // Production: send to error tracking service
    // e.g., Sentry.captureException(args[0]);
  },

  debug(message: string, ...args: unknown[]) {
    if (isDev) {
      console.debug(formatMessage("debug", message), ...args);
    }
  },
};
