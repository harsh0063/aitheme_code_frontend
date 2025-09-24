import { useEffect } from 'react';
import { useGetScriptQuery } from '../service/apislice';

const InjectHeadScripts = () => {
  const { data: response } = useGetScriptQuery();
  const scripts = response?.data?.[2] || {};

  useEffect(() => {
    const injectHTMLString = (htmlString) => {
      if (!htmlString) return;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlString;

      // Inject <script> tags into <head>
      const scriptTags = tempDiv.querySelectorAll('script');
      scriptTags.forEach((script) => {
        const newScript = document.createElement('script');

        if (script.src) {
          newScript.src = script.src;
          newScript.async = true;
        } else {
          newScript.textContent = script.innerHTML;
        }

        // Prevent duplicate script injection
        const existing = Array.from(document.head.querySelectorAll('script')).find(
          (s) => s.src === newScript.src && newScript.src !== ''
        );
        if (!existing) {
          document.head.appendChild(newScript);
        }
      });

      // Inject <noscript> into <body> (at the top)
      const noScriptTags = tempDiv.querySelectorAll('noscript');
      noScriptTags.forEach((noscript) => {
        const cloned = noscript.cloneNode(true);
        const bodyHTML = document.body.innerHTML;

        if (!bodyHTML.includes(noscript.innerHTML)) {
          document.body.insertBefore(cloned, document.body.firstChild);
        }
      });
    };

    Object.values(scripts).forEach((htmlString) => {
      injectHTMLString(htmlString);
    });
  }, [scripts]);

  return null;
};

export default InjectHeadScripts;
