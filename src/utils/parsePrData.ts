import {MessageBuilderProps, MessageBuilderPropsWithParsedPR} from "../types/messageBuilder";

export function parsePrData(props: MessageBuilderProps): MessageBuilderPropsWithParsedPR {
  const {pullRequestData} = props;

  try {
    const parsedData = JSON.parse(pullRequestData);
    return {
      ...props,
      pullRequestData: parsedData,
    }
  } catch {
    return {
      ...props,
      pullRequestData: null,
    };
  }
}