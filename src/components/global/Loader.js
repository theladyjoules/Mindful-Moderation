import React from 'react'

function Loader(props){
  return (
    <div className={"loader " + (props.wrapperClass)}>
      Loading...
    </div>
  )
}

export default Loader
