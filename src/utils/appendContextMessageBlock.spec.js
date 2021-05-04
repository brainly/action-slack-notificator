import { appendContextMessageBlock } from './appendContextMessageBlock'

const props = {
  userName: 'Joe',
  userUrl: 'url',
  avatarUrl: 'avatarUrl',
  message: 'some message',
  messageUrl: 'messageUrl',
  messageContent: null,
  blocks: [],
  pullRequestData: null,
}

describe('appendContextMessageBlock', function () {
  it('Should return new block with base message', () => {
    const expectedResults = {
      ...props,
      blocks: [
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: 'Changes: <messageUrl|some message>',
            }
          ]
        },
      ]
    }

    expect(appendContextMessageBlock(props)).toEqual(expectedResults)
  })

  it('Should return new block with message based on PR data', () => {
    const mockProps = {
      ...props,
      pullRequestData: {
        url: 'prUrl',
        title: 'prTitle'
      }
    }
    const expectedResults = {
      ...mockProps,
      blocks: [
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: 'Changes: <messageUrl|some message> \n Pull Request: <prUrl|prTitle>',
            }
          ]
        },
      ]
    }

    expect(appendContextMessageBlock(mockProps)).toEqual(expectedResults)
  })
});