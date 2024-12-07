import { useState } from "react";

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      setIsCopied(false);
      return false;
    }
  };

  return { isCopied, error, copyToClipboard };
};

export default useCopyToClipboard;
