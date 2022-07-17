import React from 'react'
import { Card, Image } from 'react-bootstrap'

const Product = ({ title, id, imageUrl, price, unit }) => {

    const flexRowStyle = {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    }

    return (
        <Card style={{margin: "3rem"}}>
            <Card.Header style={flexRowStyle}>
                <h2>
                    {title}
                </h2>
                <h6>
                    {id}
                </h6>
            </Card.Header>
            <Card.Body style={flexRowStyle}>
                <Image  src={imageUrl} style={{width:'150px'}} 
                    onError={(e)=>{e.target.onerror = null; e.target.src='AMEND_MARKET.png'}}/>
                <h4>
                    {`$${price.toFixed(2)} per ${unit}`}
                </h4>
            </Card.Body>
        </Card>
    )
}

export default Product