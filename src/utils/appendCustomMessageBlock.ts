import {MessageBuilderPropsWithParsedPR} from "../types/messageBuilder";

export function appendCustomMessageBlock(props: MessageBuilderPropsWithParsedPR): MessageBuilderPropsWithParsedPR {
  const {messageContent} = props;

  if (!messageContent) {
    return props;
  }

  try {
    const {blocks} = JSON.parse(messageContent);
    return {
      ...props,
      blocks: [
        ...props.blocks,
        ...blocks
      ]
    };
  } catch {
    return {
      blocks: [...props.blocks, {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: messageContent
        }
      }],
      ...props
    }
  }
}
