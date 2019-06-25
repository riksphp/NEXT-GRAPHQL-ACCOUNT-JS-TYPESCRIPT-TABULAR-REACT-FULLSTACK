import App, { Container, DefaultAppIProps } from "next/app";
import Head from "next/head";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";

interface ApolloAppIProps extends DefaultAppIProps {
    apolloClient: any
}

class opsMasterApp extends App<ApolloAppIProps> {
    render() {
        const { Component, pageProps, apolloClient } = this.props;

        return (
            <>
                <Head>
                    <link rel="icon" href="data:;base64,iVBORw0KGgo=" />  
                </Head>

                <Container>
                    <ApolloProvider client={apolloClient}>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </Container>
            </>
        );
    }
}

export default withApolloClient(opsMasterApp);