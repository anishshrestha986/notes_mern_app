import { useLayoutEffect } from "react";

const useScrollBlock = () => {
  const blockScroll = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (typeof document === "undefined") return;
      const { body } = document;
      const html = document.documentElement;
      const originalPadding = body.style.paddingRight;
      const originalStyle = body.style.overflow;
      if (!body || !body.style) return;

      const scrollBarWidth = window.innerWidth - html.clientWidth;
      const bodyPaddingRight =
        parseInt(
          window.getComputedStyle(body).getPropertyValue("padding-right")
        ) || 0;

      body.style.overflow = "hidden";
      body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

      return () => {
        body.style.overflow = originalStyle;
        body.style.paddingRight = originalPadding;
      };
    }, []);

  const allowScroll = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      if (typeof document === "undefined") return;

      const html = document.documentElement;
      const { body } = document;

      const originalPadding = body.style.paddingRight;
      const originalStyle = body.style.overflow;

      if (!body || !body.style) return;
      body.style.overflow = "";
      body.style.paddingRight = "";
      return () => {
        body.style.overflow = originalStyle;
        body.style.paddingRight = originalPadding;
      };
    }, []);

  return { blockScroll, allowScroll };
};

export { useScrollBlock };
