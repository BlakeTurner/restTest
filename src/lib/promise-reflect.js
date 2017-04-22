// Adapted from http://stackoverflow.com/a/31424853
const reflect = promise => (
  promise
    .then(result => ({ result, status: 'resolved' }))
    .catch(error => ({ error, status: 'rejected' }))
);

export default reflect;
