const printReceipt = (checkedOutCart) => {
    const htmlResponse = buildReceipt(checkedOutCart.date, checkedOutCart.products, checkedOutCart.cartTotal)
    var mywindow = window.open('', 'PRINT', 'width=400px')
    mywindow.document.write(htmlResponse)
    mywindow.document.close()
    mywindow.print()
    // console.log(htmlResponse)
}


const buildReceipt = (date, products, cartTotal) => {
    let formatDate = new Date(date)
    formatDate = formatDate.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: '2-digit' });

    let productRowHtml = ``
    products.forEach(prod => {
        productRowHtml += `
        <tr>
            <td>${prod.productName}</td>
            <td style="text-align: right">${prod.productWeight} oz</td>
            <td style="text-align: right">$${prod.total.toFixed(2)}</td>
        </tr>
        `
    })
    const receiptHTML = `
<body>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }

        .receipt {
            max-width: 400px;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
        }

        .receipt-header {
            text-align: center;
            margin-bottom: 5px;
        }

        .receipt-total {
            text-align: right;
            font-weight: bold;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 8px;
            text-align: left;
        }

        th {
            border-bottom: 1px solid #ccc;
        }
        tfoot td {
            border-top: 1px solid #ccc;
        }

        .fine-print {
            font-size: 10px;
            text-align: center;
            margin-top: 50px;
        }

        h2,h3,div,p,table {
            font-size: 12px;
        }
        .fine-print p {
            font-size: 8px;
        }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Karla" rel="stylesheet">
    <div class="receipt" style="font-family: Karla;">
        <div class="receipt-header">
            <h2 style="margin-bottom: 0; line-height: 10px;">AMEND MARKET</h2>
            <h3 style="margin: 0;">Refill Receipt</h3>
            <h3 style="margin: 0; line-height: 10px;">${formatDate}</h3>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th style="text-align: right">Weight</th>
                    <th style="text-align: right">Price</th>
                </tr>
            </thead>
            <tbody>
                ${productRowHtml}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Total:</td>
                    <td style="text-align: right">$${cartTotal.toFixed(2)}</td>
                </tr>
            </tfoot>
        </table>
        <div class="fine-print">
            <p>amendmarket.com | @amend.market </p>
        </div>
    </div>
</body>
    `
    return receiptHTML
}

export {
    printReceipt
}
