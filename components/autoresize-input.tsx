"use client";

import { useEffect, useRef, TextareaHTMLAttributes } from "react";

interface AutoResizeInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  // 你可以在这里添加更多的props，如果需要的话
}

const AutoResizeInput: React.FC<AutoResizeInputProps> = (props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "inherit";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("input", adjustHeight);
      adjustHeight(); // initial adjustment

      return () => {
        textarea.removeEventListener("input", adjustHeight);
      };
    }
  }, []);

  return (
    <textarea
      ref={textareaRef}
      rows={1}  // 设置默认高度为一行
      {...props} // 将所有的props传递给textarea元素
      style={{ ...props.style, overflow: 'hidden', resize: 'none' }} // 保持overflow和resize的样式，同时允许用户添加更多的样式
    />
  );
};

export default AutoResizeInput;
