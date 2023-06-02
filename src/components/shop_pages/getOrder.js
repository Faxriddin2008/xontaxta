import { collection, doc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import React, { Component } from "react";
import { db } from "../firebase";
import { Navigate } from "../CheckingFunctions";
export async function getOrder() {
  //   const querySnapshot = await getDocs(collection(db, "products"));
  //   return querySnapshot.docs.forEach((doc) => {
  //     return doc
  //   });
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.email : Navigate("/signup");
  // console.log(userEmail);
  const getProductsFromFirebase = [];
  const products = await getDocs(collection(db, `${userEmail}.order`));
  // console.log(products.docChanges());
  products.docChanges().forEach((item) => {
    getProductsFromFirebase.push({
      ...item.doc.data(),
      id: item.doc.id,
    });
    // setSave(getProductsFromFirebase)
    // setLoad(false)
  });
  return getProductsFromFirebase;
}
