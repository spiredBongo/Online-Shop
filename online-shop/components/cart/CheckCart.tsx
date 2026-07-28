"use client"
import { useCart } from "./CartContext";
import styles from "./CheckCart.module.css";


export default function CheckCart() {
    const { items, increaseQuantity, decreaseQuantity } = useCart();

    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return(
        <>
            {items.map((item, index) => 
               <div key={index} className = {styles.row}>
                    <div className = {styles.info}>
                        <button className={styles.button} onClick={() => increaseQuantity(item.product.id)}> + </button>
                        <button className={styles.button} onClick={() => decreaseQuantity(item.product.id)}> - </button>
                        <span>{item.product.name}</span>

                    </div>
                    <span className = {styles.price}>{item.product.price} RON</span>
                    <span>{item.quantity}</span>
               </div> 
               
            )}  

            <div className={styles.total}>
                Total: {totalPrice.toFixed(2)} RON
            </div>
        </>
    )
}