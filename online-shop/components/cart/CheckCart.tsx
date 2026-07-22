"use client"
import { useCart } from "./CartContext";
import styles from "./CheckCart.module.css";

export default function CheckCart() {
    const { items } = useCart();

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    return(
        <>
            {items.map((items, index) => 
               <div key={index} className = {styles.row}>
                    <div className = {styles.info}>
                        <span>{items.name}</span>
                    </div>
                    <span className = {styles.price}>{items.price} RON</span>
               </div> 
               
            )}  

            <div className={styles.total}>
                Total: {totalPrice} RON
            </div>
        </>
    )
}