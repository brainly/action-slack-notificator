import {MessageBuilderPropsWithParsedPR} from "../types/messageBuilder";

export function appendContextMessageBlock(props: MessageBuilderPropsWithParsedPR): MessageBuilderPropsWithParsedPR {
  const {message, messageUrl, pullRequestData} = props;
  const baseMessage = `Changes: <${messageUrl}|${message.replace(/\n/gm, ', ')}>`;
  const builtMessage = pullRequestData
    ? `${baseMessage} \n Pull Request: <${pullRequestData.url}|${pullRequestData.title}>`
    : baseMessage

  return {
    ...props,
    blocks: [
      ...props.blocks,
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
}