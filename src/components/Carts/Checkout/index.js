import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, ListGroup, Container, Col, Row } from 'react-bootstrap'

import { connect } from 'react-redux'

import { sendOrder } from '../../../utilities/apiRequests'
import { printReceipt } from '../../../utilities/printReceipt'

const Checkout = ({ appState, handleModalDisplay, show }) => {

    const { products } = appState.products
    const { carts } = appState.cart

    const [checkoutCart, setCheckoutCart] = useState({})
    const [printReceiptBool, setPrintReceiptBool] = useState(false)

    const handleCheckoutChange = (cart) => {
        let cartTotal = 0
        if (cart.vessels?.length) {
            cart.vessels.forEach(vessel => {
                if (vessel.product) {
                    const vesselProd = products.find(prod => prod.id === vessel.product)
                    if (vesselProd) {
                        let vesselTotal, productWeight = 0
                        if (vessel.isEach) {
                            vesselTotal = vessel.productTotalOverride || (vessel.quantity * vesselProd.price)
                            cartTotal += vesselTotal
                        } else {
                            productWeight = vessel.finalWeight - vessel.tare
                            vesselTotal = vessel.productTotalOverride || (productWeight * vesselProd.price)
                            cartTotal += vesselTotal                        
                        }
                    }
                }
            })
            setCheckoutCart({ ...cart, cartTotal })
        } else {
            setCheckoutCart({ ...cart })
        }
    }

    const handleCheckout = () => {
        let checkedOutCart = { ...checkoutCart }
        // customer
        // email
        // cartTotal
        // cartID
        // cartName
        // date
        // vesselNumber
        // products [
        //      vesselID
        //      productID
        //      productWeight
        //      quantity
        //      isEach: bool
        //      productName
        //      total
        // ]

        let dateTime = new Date()

        dateTime = `${dateTime.getMonth()+1}/${dateTime.getDate()}/${dateTime.getFullYear()} ${dateTime.toLocaleTimeString()}`    

        checkedOutCart.date = dateTime
        checkedOutCart.vessels = checkedOutCart.vessels.filter(ves => ves.product)
        checkedOutCart.vesselNumber = checkedOutCart.vessels?.length || 0
        checkedOutCart.byoVesselsNumber = checkedOutCart.vessels?.filter(vessel => vessel.isByob).length || 0
        checkedOutCart.productString = '['
        checkedOutCart.products = checkedOutCart.vessels.map((vessel, index) => {
            let vesselTotal, productWeight = 0
            if (vessel.product) {
                const vesselProd = products.find(prod => prod.id === vessel.product)
                if (vesselProd) {
                    if (vessel.isEach) {
                        vesselTotal = vessel.productTotalOverride || (vessel.quantity * vesselProd.price)
                    } else {
                        productWeight = vessel.finalWeight - vessel.tare
                        vesselTotal = vessel.productTotalOverride || (productWeight * vesselProd.price)                        
                    }
                }
                checkedOutCart.productString += `["${vessel.vesselID}","${checkedOutCart.cartID}","${vessel.product}","${dateTime}","${vesselProd.title}",${vessel.isEach || false},${productWeight},${vessel.isEach ? vessel.quantity : null},${vesselTotal}, "${vessel.isByob ? 'TRUE' : 'FALSE'}"]${(checkedOutCart.vessels.length - 1) > index ? ',' : ''}`
                return {
                    vesselID: vessel.vesselID,
                    productID: vessel.product,
                    date: dateTime,
                    productWeight,
                    quantity: vessel.isEach ? vessel.quantity : null,
                    isEach: vessel.isEach,
                    productName: vesselProd.title,
                    total: vesselTotal
                }
            }
            return false
        })
        checkedOutCart.productString += ']'

        delete checkedOutCart.vessels
        
        if (printReceiptBool) {
            printReceipt(checkedOutCart)
            setPrintReceiptBool(false)
        }
        sendOrder(checkedOutCart)
    }

    return (
        <Modal show={show} onHide={() => {handleCheckoutChange({}); handleModalDisplay(); setPrintReceiptBool(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>Choose A Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form className='pb-3' style={Object.keys(checkoutCart).length ? ({borderBottom: '1px solid #dee2e6'}) : null}>
                {
                    carts.map(cart => {
                        let cartTotal = 0
                        if (cart.vessels.length) {
                            cart.vessels.forEach(vessel => {
                                if (vessel.product) {
                                    const vesselProd = products.find(prod => prod.id === vessel.product)
                                    if (vesselProd) {
                                        cartTotal += vessel.productTotalOverride || ((vessel.finalWeight - vessel.tare) * vesselProd.price)
                                    }
                                }
                            })
                        }
                        return(
                            <Form.Check
                                className='mb-2'
                                key={cart.cartID}
                                type='radio'
                                name="carts"
                                id={cart.cartID}
                                label={`${cart.cartName}${cart.customer ? ' - ' + cart.customer : ''}: $${cartTotal.toFixed(2)}`}
                                onChange={() => {handleCheckoutChange(cart)}}
                            />
                        )
                    })
                }
                </Form>
                {
                  Object.keys(checkoutCart).length ? (
                        <ListGroup className='pt-3 mx-3' variant="flush">
                            <ListGroup.Item>
                                <Container>
                                    <Row>
                                        <Col style={{fontWeight: 'bold'}} sm={3}>Name: </Col>
                                        <Col>{checkoutCart.customer}</Col>                                        
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Container>
                                    <Row>
                                        <Col style={{fontWeight: 'bold'}} sm={3}>Email: </Col>
                                        <Col>{checkoutCart.email}</Col>                                        
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Container>
                                    <Row>
                                        <Col style={{fontWeight: 'bold'}} sm={3}>Vessels: </Col>
                                        <Col>{checkoutCart.vessels?.length || 0}</Col>                                        
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Container>
                                    <Row>
                                        <Col style={{fontWeight: 'bold'}} sm={3}>BYO's: </Col>
                                        <Col>{checkoutCart.vessels?.filter(vessel => vessel.isByob).length || 0}</Col>                                        
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Container>
                                    <Row>
                                        <Col style={{fontWeight: 'bold'}} sm={3}>Total: </Col>
                                        <Col>{`$${(checkoutCart.cartTotal || 0).toFixed(2)}`}</Col>                                        
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                        </ListGroup>
                    ) : null
                }
          </Modal.Body>
          <Modal.Footer>
            <Form.Check
                disabled={!Object.keys(checkoutCart).length}
                type="checkbox"
                defaultChecked={printReceiptBool}
                label="Print Receipt"
                onChange={(e) => { setPrintReceiptBool(e.target.checked) }}
            />
            <Button 
                variant="primary"
                disabled={!Object.keys(checkoutCart).length}
                onClick={() => { handleCheckout(); handleModalDisplay(); handleCheckoutChange({})}}>
              Checkout
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }

const mapStateToProps = (state) => ({
    appState: state
})

export default connect(mapStateToProps)(Checkout)