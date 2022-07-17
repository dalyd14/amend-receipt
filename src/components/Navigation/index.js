import React from 'react'
import { Col, Container, Row, Stack, Button, Image } from 'react-bootstrap'

const Navigation = ({setCurrentContent}) => {

    return (
        <Container>
            <Row>
                <Col onClick={() => { setCurrentContent('carts') }} style={{width: '50%', cursor: 'pointer'}}>
                    <Image draggable="false" src="AMEND_MARKET_crop.png" style={{width: '100%'}} />
                </Col>
                <Col>
                    <Stack gap={2} className='h-100 d-flex justify-content-center'>
                        <Button style={{height: '40%', backgroundColor: "#F6BD60", color: 'black', border: 'none', fontSize: '3rem'}} size="lg" onClick={() => {
                                setCurrentContent('products')
                            }} >View Products</Button>
                        <Button disabled style={{ height: '40%', backgroundColor: "#F7EDE2", color: 'black', border: 'none', fontSize: '3rem'}} variant="info" size="lg" onClick={() => {
                                setCurrentContent('orders')
                            }} >View Orders</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default Navigation