import React, { useMemo } from 'react';
import { WebView as RNWebView } from 'react-native-webview';
import { useColorScheme } from '~/lib/rnr/useColorScheme';

interface WebViewProps {
  contentHtml: string;
  className?: string;
}

export function WebView({ contentHtml, className = 'flex-1' }: WebViewProps) {
  const { isDarkColorScheme } = useColorScheme();

  const styledHtml = useMemo(() => {
    if (!contentHtml) return '';

    // Theme colors based on the app's theme
    const backgroundColor = isDarkColorScheme ? 'hsl(240 10% 3.9%)' : 'hsl(0 0% 100%)';
    const textColor = isDarkColorScheme ? 'hsl(0 0% 98%)' : 'hsl(240 10% 3.9%)';
    const linkColor = isDarkColorScheme ? 'hsl(217.2 91.2% 59.8%)' : 'hsl(221.2 83.2% 53.3%)';
    const borderColor = isDarkColorScheme ? 'hsl(240 3.7% 15.9%)' : 'hsl(240 5.9% 90%)';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: ${backgroundColor};
            color: ${textColor};
            padding: 16px;
            margin: 0;
            font-size: 16px;
            line-height: 1.5;
          }
          a {
            color: ${linkColor};
            text-decoration: none;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 24px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.25;
          }
          h1 {
            font-size: 2em;
          }
          h2 {
            font-size: 1.5em;
          }
          p {
            margin-top: 0;
            margin-bottom: 16px;
          }
          ul, ol {
            padding-left: 24px;
            margin-top: 0;
            margin-bottom: 16px;
          }
          li {
            margin-bottom: 8px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 16px;
          }
          th, td {
            border: 1px solid ${borderColor};
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: ${isDarkColorScheme ? 'hsl(240 5% 10%)' : 'hsl(0 0% 96%)'};
          }
          code {
            font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
            background-color: ${isDarkColorScheme ? 'hsl(240 5% 10%)' : 'hsl(0 0% 96%)'};
            padding: 2px 4px;
            border-radius: 3px;
          }
          @media (max-width: 768px) {
            body {
              padding: 12px;
              font-size: 15px;
            }
            h1 {
              font-size: 1.8em;
            }
            h2 {
              font-size: 1.3em;
            }
          }
        </style>
      </head>
      <body>
        ${contentHtml}
      </body>
      </html>
    `;
  }, [contentHtml, isDarkColorScheme]);

  return (
    <RNWebView
      source={{ html: styledHtml }}
      className={className}
      originWhitelist={['*']}
      showsVerticalScrollIndicator={false}
    />
  );
}
