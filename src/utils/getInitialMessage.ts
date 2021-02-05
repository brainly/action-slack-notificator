export function getInitialMessage(message?: string) {
  if (!message) {
    return {blocks: []};
  }

  try {
    return JSON.parse(message);
  } catch {
    return {
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: message
          }
        }
      ]
    }
  }
}