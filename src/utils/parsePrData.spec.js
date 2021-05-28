import { parsePrData } from './parsePrData'

const props = {
  userName: 'Joe',
  userUrl: 'url',
  avatarUrl: 'avatarUrl',
  message: 'some message',
  messageUrl: 'messageUrl',
  messageContent: 'some message Content',
  blocks: []
}

describe('parsePrData', function () {
  it('Should pass down rest props and return null for pullRequestData', () => {
    expect(parsePrData(props)).toEqual({
      ...props,
      pullRequestData: null,
    })
  })

  it('Should parse pullRequestData', () => {
    const mockProps = {
      ...props,
      pullRequestData: '[{"hello": "world"}]'
    }

    expect(parsePrData(mockProps)).toEqual({
      ...props,
      pullRequestData: [{hello: "world"}]
    })
  })
});