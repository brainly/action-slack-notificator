import { appendCustomMessageBlock } from './appendCustomMessageBlock'

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

describe('appendCustomMessageBlock', function () {
  it('Should return props if messageContent doesn\'t exist', () => {
    expect(appendCustomMessageBlock(props)).toEqual(props)
  })

  it('Should return new block with string message', () => {
    const mockProps = {
      ...props,
      messageContent: 'string'
    }

    const expectedResults = {
      ...mockProps,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'string'
          }
        }
      ]
    }

    expect(appendCustomMessageBlock(mockProps)).toEqual(expectedResults)
  })
});