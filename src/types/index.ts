export type FieldValues = Record<string, string | null>;

export interface SheetStyles {
  [key: string]: Array<{
    key: string;
    className?: string;
  }>;
}

export interface SheetData {
  [x: string]: GoogleSheet;
}

export interface GoogleSheet {
  meta: {
    aborted?: boolean;
    cursor?: number;
    delimiter?: string;
    fields: string[];
    linebreak?: string;
    truncated?: boolean;
  };
  data: FieldValues[];
  errors: unknown[];
}
