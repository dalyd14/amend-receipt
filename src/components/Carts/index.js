import React, { useState } from 'react'
import { Col, Container, Row, Stack, Button } from 'react-bootstrap'
import ShortUniqueId from 'short-unique-id';

import Cart from './Cart'
import Checkout from './Checkout'

import { connect } from 'react-redux'
import { addCart } from '../../redux/Cart/cart.actions'

const Carts = ({ appState, addNewCart }) => {

    function handleAddCart() {
        const uid = new ShortUniqueId({ length: 16 });
        const cart = {
            cartName: "New Cart",
            customer: null, 
            email: null,
            cartID: uid(),
            vessels: []
        }
        addNewCart(cart)
    }

    const [show, setShow] = useState(false);

    function handleModalDisplay() {
        setShow(!show);
    }

    return (
        <>
            <Checkout show={show} handleModalDisplay={handleModalDisplay} />
            <Container>
                <Row>
                    <Col>
                        <Button style={{height: '150px', width: '100%', backgroundColor: "#84A59D", color: 'black', border: 'none', fontSize: '4rem'}} size="lg"
                            onClick={handleAddCart}>
                            New Cart
                        </Button>
                    </Col>
                    <Col>
                        <Button style={{height: '150px', width: '100%', backgroundColor: "#F5CAC3", color: 'black', border: 'none', fontSize: '4rem'}} size="lg"
                            onClick={handleModalDisplay}>
                            Checkout
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                {
                    appState.cart.carts.map((cart) => {
                        return <Cart key={cart.cartID} cart={cart}></Cart>
                    })
                }
            </Container>
        </>
    )
}

const mapStateToProps = (state) => ({
    appState: state
})

const mapDispatchToProps = (dispatch) => ({
    addNewCart: (cart) => dispatch(addCart(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(Carts)