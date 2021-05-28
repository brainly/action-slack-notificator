export interface Block {
  type: string;
  elements?: BlockElement[];
  text?: {
    [prop: string]: unknown;
  };
}

export type BlockElement =
  {
    type: string;
    text?: string;
    image_url?:string;
    alt_text?: string;
  } & {
    [prop: string]: unknown;
  };