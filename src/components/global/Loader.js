import React from 'react'

function Loader(props){
  return (
    <div className={"container loader " + (props.wrapperClass)}></div>
  )
}

export default Loader
