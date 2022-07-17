import React from 'react'
import Carts from '../Carts'
import Products from '../Products'
import Orders from '../Orders'

const Content = ({content}) => {
    return (
        <div className='mb-5'>
            <DynamicRender content={content} />
        </div>
    )
}

const DynamicRender = ({ content }) => {
    switch(content) {
        case 'carts':
            return (<Carts></Carts>)
        case 'products':
            return (<Products></Products>)
        case 'orders':
            return (<Orders></Orders>)
        default:
            return (<Carts></Carts>)
    }
}

export default Content