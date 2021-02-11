import {pipe} from 'ramda';
import {Block} from "./types/block";
import {MessageBuilderProps} from "./types/messageBuilder";
import {appendCustomMessageBlock} from "./utils/appendCustomMessageBlock";
import {parsePrData} from "./utils/parsePrData";
import {prepareSlackPayload} from "./utils/prepareSlackPayload";
import {appendContextMessageBlock} from "./utils/appendContextMessageBlock";
import {appendUserInfoBlock} from "./utils/appendUserInfoBlock";

export const buildMessage: (props: MessageBuilderProps) => Block[] = pipe(
  parsePrData,
  appendUserInfoBlock,
  appendContextMessageBlock,
  appendCustomMessageBlock,
  prepareSlackPayload
)