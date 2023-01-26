const getError = (err) => 
err.response && err.response.data && err.response.data.message ? ree.response.data.message : err.message

export {getError}
