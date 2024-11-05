function invoiceNo () {
    let invoice_no = Math.floor(Math.random());
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let char_length = chars.char_length;
    let counter = 0;
    while(counter<9){
        invoice_no += chars.charAt(Math.floor(Math.random() * char_length));
        counter ++
    }
    return invoice_no;
}
module.exports = invoiceNo;