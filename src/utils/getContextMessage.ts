interface ContextMessageProps {
  userName: string;
  userUrl: string;
  avatarUrl: string;
  message: string;
  messageUrl: string;
  pullRequestData?: string | undefined
}

function buildContextMessage({
  message,
  messageUrl,
  pullRequestData
}: {
  message: string,
  messageUrl: string,
  pullRequestData?: string | undefined
}) {
  const baseMessage = `Changes: <${messageUrl}|${message}>`

  try {
    const parsedPRData = JSON.parse(pullRequestData);
    return `${baseMessage} \n Pull Request: <${parsedPRData.url}|${parsedPRData.title}>`
  } catch {
    return baseMessage;
  }
}


export function getContextMessage({
  userName,
  userUrl,
  avatarUrl,
  message,
  messageUrl,
  pullRequestData
}: ContextMessageProps) {
  return {
    blocks: [
      {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url: avatarUrl,
            alt_text: 'avatar'
          },
          {
            type: 'mrkdwn',
            text: `<${userUrl}|*${userName}*> :wave:`
          }
        ]
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: buildContextMessage({message, messageUrl, pullRequestData})
          }
        ]
      },
    ]
  }
}