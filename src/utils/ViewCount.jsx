import React from 'react'

function ViewCount({viewCount}) {

    
  return (
      <span>{Number(viewCount) > 1000000 ?
          `${Math.floor(Number(viewCount) / 1000000)}M`
          : Number(viewCount) > 1000
              ? `${Math.floor(Number(viewCount) / 1000)}M`
              : `${Number(viewCount)}`} views
      </span>
  )
}

export default ViewCount