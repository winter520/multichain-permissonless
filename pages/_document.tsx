import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';
// import Header from '@/components/Header'
import './i18n'
class MyDocument extends Document {
  static async getInitialProps(ctx:any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }
  render() {
    console.log(CssBaseline)
    return (
      <Html lang="en">
        {/* <Head>{CssBaseline.flush()}</Head> */}
        <Head>
          {CssBaseline.flush()}
          <title>Multichain - Cross Chain Router Protocol</title>
          
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          <meta name="title" content="Multichain APP" />
          <meta name="keywords" content="Multichain, Multichain APP, Multichain router, Multichain bridge"/>
          <meta name="description" content="Unified cross-chain interface, average transaction speed within 100 secs, no-slippage swap"/>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
