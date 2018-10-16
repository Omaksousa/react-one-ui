const React = require('react');
const { Dom, serviceWorker, isWeb, Expo } = require('react-one-ui');
const App = require('./demo').default;

if (isWeb) {
    Dom.render(<App />, document.getElementById('root'));
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();

    /// Enabling hot reloading
    if (module.hot) {
        console.log('Connected');
        module.hot.accept('./demo', () => {
            const Root = require('./demo').default;
            console.log(`%c ==========  Recived update in ${Date()}`, 'background: #222; color: #bada55');
            Dom.render(<Root />, document.getElementById('root'));
        });
    }
} else {
    // eslint-disable-next-line
    __DEV__ && Expo.KeepAwake.activate();
    Expo.registerRootComponent(App);
}
