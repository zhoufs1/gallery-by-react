import React from 'react';
import Loadable from 'react-loadable';
import {ActivityIndicator} from 'antd-mobile';

const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return (<div style={{
            display: 'flex',
            justifyContent: 'flex-start'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '50% auto'
            }}>
                <ActivityIndicator size="large"/>
                <span style={{marginTop: 8}}>加载中...</span>
            </div>
        </div>);
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
const AsyncComponent = (routeComponent) => Loadable({
    loader: () => routeComponent,
    loading: MyLoadingComponent
});

export default AsyncComponent;