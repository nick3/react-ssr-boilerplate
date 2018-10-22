/**
 *
 * Asynchronously loads the component for UserHub
 *
 */
import React from 'react';
import Loadable from 'react-loadable';
import PropTypes from 'prop-types';

function Loading(props) {
  if (props.error) {
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  }
  return <div>Loading...</div>;
}

Loading.propTypes = {
  error: PropTypes.object,
  retry: PropTypes.func
};

export default Loadable({
  loader: () => import('./indexNew'),
  loading: Loading
});
