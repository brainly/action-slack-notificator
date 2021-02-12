import {MessageBuilderPropsWithParsedPR} from "../types/messageBuilder";
import {Block} from "../types/block";

export function prepareSlackPayload({blocks}: MessageBuilderPropsWithParsedPR): {blocks: Block[]} {
  return {blocks};
}