"use client";

import CircularLoading from "@/core/components/ui/circular-loading";
import dynamic from "next/dynamic";

type EditorClientProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
  onChange?: (value: string) => void;
};

const Editor = dynamic(() => import("./Editor"), {
  ssr: false,
  loading: () => <CircularLoading />,
});

const EditorClient = (props: EditorClientProps) => {
  return <Editor {...props} />;
};

export default EditorClient;
