const React = require('React');

const App = (props) => {
    const appName = props.appName || 'app'
    return (
        <div style={{ width: 400, margin: '0 auto 100px' }}>
            <div>{appName}</div>
            <div>444</div>
        </div>
    )
};
App.propTypes = {
    appName: React.PropTypes.string
}

module.exports = App;
