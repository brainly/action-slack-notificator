import * as core from '@actions/core';
import {context} from '@actions/github';
import * as fetch from 'node-fetch';
import {buildMessage} from "./messageBuilder";

async function main() {
  const webhookUrl = core.getInput('webhookUrl');
  const messageContent = core.getInput('messageContent');
  const pullRequestData = core.getInput('pullRequestData');

  try {
    const {login, avatar_url, html_url} = context.payload.sender;
    const {id, url} = context.payload.head_commit;


    const contextMessage = buildMessage({
      userName: login,
      userUrl: html_url,
      avatarUrl: avatar_url,
      message: `Commit hash: ${id}`,
      messageUrl: url,
      blocks: [],
      messageContent,
      pullRequestData,
    });

    await fetch(webhookUrl, {
      method: 'post',
      body: JSON.stringify(contextMessage)
    })
  } catch (e) {
    console.error(e)
    throw e;
  }
}

main().catch(err => `slack notificator action failed: ${err}`);
