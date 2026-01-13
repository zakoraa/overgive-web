import { richTextExtensions } from "./editor-extensions";

export const buildExtensions = (options?: {
    placeholder?: string;
    limit?: number;
}) => {
    return [
        ...richTextExtensions(options?.limit),
    ];
};
