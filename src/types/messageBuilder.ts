import {Block} from "./block";

export interface MessageBuilderProps {
  userName: string;
  userUrl: string;
  avatarUrl: string;
  message: string;
  messageUrl: string;
  messageContent: string;
  blocks: Block[];
  pullRequestData?: string | undefined;
}

export interface ParsedPrData {
  title: string;
  url: string;
  user: {
    url: string;
    login: string;
    avatarUrl: string;
  }
}

export interface MessageBuilderPropsWithParsedPR {
  userName: string;
  userUrl: string;
  avatarUrl: string;
  message: string;
  messageUrl: string;
  messageContent: string;
  blocks: Block[];
  pullRequestData: ParsedPrData | null;
}
