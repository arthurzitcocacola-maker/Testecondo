/**
 * Discord Logger Service
 * Sends application events and logs to a Discord webhook
 */

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1517841721914953819/OZeOkriO7FFA2WcqmPiqQfH3rGl_PBKm1gKSIX_KaIg39a41VrkltnTPNBuq7XKOue3r';

interface LogEvent {
  type: 'info' | 'warning' | 'error' | 'action';
  message: string;
  details?: Record<string, unknown>;
  timestamp?: string;
}

/**
 * Send a log event to Discord webhook
 */
export async function sendToDiscord(event: LogEvent): Promise<void> {
  try {
    // Determine embed color based on event type
    const colorMap: Record<string, number> = {
      info: 3447003,      // Blue
      warning: 15105570,  // Yellow
      error: 15158332,    // Red
      action: 3066993,    // Green
    };

    const embed = {
      title: `${event.type.toUpperCase()} - Roblox Condo`,
      description: event.message,
      color: colorMap[event.type],
      timestamp: event.timestamp || new Date().toISOString(),
      fields: event.details
        ? Object.entries(event.details).map(([key, value]) => ({
            name: key,
            value: String(value),
            inline: true,
          }))
        : [],
      footer: {
        text: 'Roblox Condo Logger',
      },
    };

    const payload = {
      embeds: [embed],
      username: 'Roblox Condo Logger',
      avatar_url: 'https://www.roblox.com/favicon.ico',
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error('Failed to send log to Discord:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending log to Discord:', error);
  }
}

/**
 * Log an info event
 */
export function logInfo(message: string, details?: Record<string, unknown>): void {
  sendToDiscord({
    type: 'info',
    message,
    details,
  });
}

/**
 * Log a warning event
 */
export function logWarning(message: string, details?: Record<string, unknown>): void {
  sendToDiscord({
    type: 'warning',
    message,
    details,
  });
}

/**
 * Log an error event
 */
export function logError(message: string, details?: Record<string, unknown>): void {
  sendToDiscord({
    type: 'error',
    message,
    details,
  });
}

/**
 * Log a user action
 */
export function logAction(message: string, details?: Record<string, unknown>): void {
  sendToDiscord({
    type: 'action',
    message,
    details,
  });
}

/**
 * Log token generation
 */
export function logTokenGenerated(gameId: string, gameName: string): void {
  logAction('Token Generated', {
    gameId,
    gameName,
    userAgent: navigator.userAgent,
  });
}

/**
 * Log game access attempt
 */
export function logGameAccess(gameId: string, gameName: string, success: boolean): void {
  logAction(`Game Access ${success ? 'Allowed' : 'Blocked'}`, {
    gameId,
    gameName,
    success,
  });
}

/**
 * Log language selection
 */
export function logLanguageSelected(language: string): void {
  logAction('Language Selected', {
    language,
  });
}

/**
 * Log page view
 */
export function logPageView(path: string): void {
  logInfo('Page View', {
    path,
    referrer: document.referrer || 'direct',
  });
}
