import { appendUserInfoBlock } from './appendUserInfoBlock'

const props = {
  userName: 'Joe',
  userUrl: 'url',
  avatarUrl: 'avatarUrl',
  message: 'some message',
  messageUrl: 'messageUrl',
  messageContent: 'some message Content',
  blocks: [
    {
      type: 'context',
      elements: [],
    }
  ],
  pullRequestData: null,
}

describe('appendUserInfoBlock', function () {
  it('Should pass down props and append user info block', () => {
    const expectedResult = {
      ...props,
      blocks: [
        ...props.blocks,
        {
          type: 'context',
          elements: [
            {
              type: 'image',
              image_url: 'avatarUrl',
              alt_text: 'avatar'
            },
            {
              type: 'mrkdwn',
              text: `<url|*Joe*> :wave:`
            }
          ]
        }
      ]
    };

    expect(appendUserInfoBlock(props)).toEqual(expectedResult)
  })

  it('Should pass down props and append user info block from pullRequestData', () => {
    const mockProps = {
      ...props,
      pullRequestData: {
        user: {
          login: 'prLogin',
          url: 'prUrl',
          avatarUrl: 'prAvatarUrl'
        }
      }
    }

    const expectedResult = {
      ...mockProps,
      blocks: [
        ...props.blocks,
        {
          type: 'context',
          elements: [
            {
              type: 'image',
              image_url: 'prAvatarUrl',
              alt_text: 'avatar'
            },
            {
              type: 'mrkdwn',
              text: `<prUrl|*prLogin*> :wave:`
            }
          ]
        }
      ]
    };

    expect(appendUserInfoBlock(mockProps)).toEqual(expectedResult)
  })
});