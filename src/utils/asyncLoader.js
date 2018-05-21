import React from 'react';

const asyncComponent = loadComponent => (
    class AsyncComponent extends React.Component {
        state = {
            Component: null,
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({Component});
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const {Component} = this.state;
            const style = {
                width: '24px',
                height: '24px',
                paddingLeft: '50vw',
                paddingTop: '50vh',
                margin: '-12px 0 0 -12px'
            }
            return (Component) ? (<div className="animated fadeInRight"><Component {...this.props} /></div>) :
                (<div style={style}>
                    <img src={require('../common/img/loading.gif')} alt="loading..."/>
                </div>);
        }
    }
);

export default asyncComponent;