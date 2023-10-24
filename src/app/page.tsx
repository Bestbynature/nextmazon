import { db } from '@/firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import ProductCard from '@/components/productCard';
import Image from 'next/image';

export default async function Home() {

  
  // useEffect(() => {
    const getProducts = async () => {
      "use server"
      let products: any = [];
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        products.push({...doc.data(), id: doc.id});
      });
      console.log("Current products: ", products.join(", "));
      return products;
      // return unsubscribe();
    })
  }
  let products = getProducts();
  // }, [])
  return (
    <div>
       <ProductCard products={()=>getProducts()}/>
    </div>
  );
}
