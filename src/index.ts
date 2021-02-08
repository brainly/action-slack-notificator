import * as core from '@actions/core';
import {context} from '@actions/github';
import * as fetch from 'node-fetch';
import {getInitialMessage} from "./utils/getInitialMessage";
import {getContextMessage} from "./utils/getContextMessage";

async function main() {
  const webhookUrl = core.getInput('webhookUrl');
  const messageContent = core.getInput('messageContent');
  const pullRequestData = core.getInput('pullRequestData');

  try {
    const {login, avatar_url, html_url} = context.payload.sender;
    const {message, url} = context.payload.head_commit;

    const initialMessage = getInitialMessage(messageContent);
    const contextMessage = getContextMessage({
      userName: login,
      userUrl: html_url,
      avatarUrl: avatar_url,
      message: message,
      messageUrl: url,
      pullRequestData,
    });

    const body = {
      blocks: [...contextMessage, ...initialMessage.blocks]
    }

    await fetch(webhookUrl, {
      method: 'post',
      body: JSON.stringify(body)
    })
  } catch (e) {
    console.error(e)
    throw e;
  }
}

main().catch(err => `slack notificator action failed: ${err}`);
