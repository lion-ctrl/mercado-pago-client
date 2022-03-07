import { useState, useEffect } from 'react';

export default function useScript(url: string, name: string) {
  const [lib, setLib] = useState<any>({});

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;
    script.id = name;
    script.onload = () => setLib({ [name]: window[name] });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return lib;
}
