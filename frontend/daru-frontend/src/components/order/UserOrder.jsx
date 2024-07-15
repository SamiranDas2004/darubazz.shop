import React from 'react'
import { useSelector } from 'react-redux'

function UserOrder() {
    const products = useSelector(state => state.products);
    console.log(products);
  return (
    <div>UserOrder</div>
  )
}

export default UserOrder