declare module 'react-quill-new' {
  import * as React from 'react';

  export interface ReactQuillProps {
    theme?: string;
    value?: string;
    onChange?: (value: string) => void;
    modules?: Record<string, any>;
    placeholder?: string;
    className?: string;
  }

  const ReactQuill: React.FC<ReactQuillProps>;
  export default ReactQuill;
}