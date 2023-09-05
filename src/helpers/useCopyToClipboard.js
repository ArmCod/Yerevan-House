import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
function useCopyToClipboard() {
  const [copiedText, setCopiedText] = useState(null);
  const { t } = useTranslation();

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      Swal.fire({
        position: "center",
        icon: "success",
        title: t("copylickboard"),
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}

export default useCopyToClipboard;
