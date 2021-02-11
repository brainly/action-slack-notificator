import {MessageBuilderPropsWithParsedPR} from "../types/messageBuilder";

export function appendUserInfoBlock(props: MessageBuilderPropsWithParsedPR): MessageBuilderPropsWithParsedPR {
  const {userName, userUrl, avatarUrl, pullRequestData} = props;
  const userData = pullRequestData
    ? {
      login: userName,
      url: userUrl,
      avatarUrl: avatarUrl,
      } :
      {
        ...pullRequestData.user
      }


  return {
    ...props,
    blocks: [
      ...props.blocks,
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