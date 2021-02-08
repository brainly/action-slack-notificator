import {BlockElement, Block} from '../types/block';
import {pipe} from 'ramda';

interface ContextMessageProps {
  userName: string;
  userUrl: string;
  avatarUrl: string;
  message: string;
  messageUrl: string;
  pullRequestData?: string | undefined
}

function getContextInfoMessage({
  message,
  messageUrl,
  pullRequestData,
  blocks,
}: {
  message: string,
  messageUrl: string,
  pullRequestData?: string | undefined,
  blocks: BlockElement[]
}) {
  const baseMessage = `Changes: <${messageUrl}|${message.replace(/\n/gm, ', ')}>`

  let builtMessage = baseMessage;

  try {
    const parsedPRData = JSON.parse(pullRequestData);
    builtMessage = `${baseMessage} \n Pull Request: <${parsedPRData.url}|${parsedPRData.title}>`
  } catch {}

  return [
    ...blocks,
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: builtMessage,
        }
      ]
    },
  ]
}


export function getContextUserInfo({
  userName,
  userUrl,
  avatarUrl,
  message,
  messageUrl,
  pullRequestData
}: ContextMessageProps) {
  let userData = {
    login: userName,
    url: userUrl,
    avatarUrl: avatarUrl,
  }

  try {
    const parsedPRData = JSON.parse(pullRequestData);
    userData = parsedPRData.user;
  } catch {}

  return {
    message,
    messageUrl,
    pullRequestData,
    blocks: [
      {
        type: 'context',
        elements: [
          {
            type: 'image',
            image_url: userData.avatarUrl || avatarUrl,
            alt_text: 'avatar'
          },
          {
            type: 'mrkdwn',
            text: `<${userData.url}|*${userData.login}*> :wave:`
          }
        ]
      }
    ]
  }
}

export const getContextMessage: (props: ContextMessageProps) => Block[] = pipe(
  getContextUserInfo,
  getContextInfoMessage
)