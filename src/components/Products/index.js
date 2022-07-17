import React from 'react'
import Product from './Product'

import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { FiRefreshCcw } from 'react-icons/fi'

import { refreshProducts } from '../../redux/Products/products.actions'

const Products = ({ appState, refetchProducts }) => {

    const { products } = appState.products

    const handleRefresh = () => {
        refetchProducts()
    }

    if (products) {
        return (
            <div>
                <div style={{margin: "1rem 3rem"}}>
                    <Button onClick={handleRefresh} variant='outline-secondary' className='w-100 d-flex justify-content-center align-items-center' style={{height: '5rem', fontSize: "3rem"}}>
                        <FiRefreshCcw className='h-100'/>
                        <div className='h-100 d-flex justify-content-center align-items-center' style={{marginLeft: '3rem'}}><h2 className='m-0'>Refresh Products</h2></div>
                    </Button>
                </div>
                
                { products.map(prod => (
                    <Product
                        key={prod.id} 
                        title={prod.title} 
                        id={prod.id} 
                        imageUrl={prod.imageUrl} 
                        price={prod.price} 
                        unit={prod.unit}
                    />
                )) }
            </div>
        )        
    } else {
        return
    }
}

const mapStateToProps = (state) => ({
    appState: state
})

const mapDispatchToProps = (dispatch) => ({
    refetchProducts: () => dispatch(refreshProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)