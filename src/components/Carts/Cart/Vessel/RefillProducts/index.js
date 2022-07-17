import React from 'react'
import { Card, Container } from 'react-bootstrap'

import { connect } from 'react-redux'

// import amendLogo from '../../../../../images/AMEND_MARKET.png'

const RefillProducts = ({ appState, updatePickedProduct, handleClose }) => {

    const { products } = appState.products

    return (
        <Container className='d-flex flex-row flex-wrap justify-content-start'>
            {
                products.map(prod => {
                    return (
                        <Card key={prod.id} className='mb-3' style={{ width: '10rem' }}
                            onClick={() => {
                                updatePickedProduct(prod.id)
                                handleClose()
                            }}>
                            <Card.Img 
                                variant="top" 
                                src={prod.imageUrl} 
                                onError={(e)=>{e.target.onerror = null; e.target.src='AMEND_MARKET.png'}}
                                />
                            <Card.Body className='py-0'>
                                <Card.Title style={{ fontSize: '.7rem' }} className='d-flex flex-column'>
                                    <span>{prod.title}</span>
                                    <span>{`$${prod.price.toFixed(2)} /${prod.unit}`}</span>
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </Container>
    )
}

const mapStateToProps = (state) => ({
    appState: state
})

export default connect(mapStateToProps)(RefillProducts)