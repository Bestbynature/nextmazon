"use client"

import React from 'react'
import { useEffect } from 'react'
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/firebase';

const GetProducts = () => {

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products: any = [];
      querySnapshot.forEach((doc) => {
        products.push({...doc.data(), id: doc.id});
      });
      console.log("Current products: ", products.join(", "));
      // return unsubscribe();
    })
  }, [])

  return (
    <div>
      <h1>GetProducts</h1>

    </div>
  )
}

export default GetProducts