import { collection, doc, getDocs } from "firebase/firestore";
import { useState } from "react";
import React, { Component } from "react";
import { db } from ".";
export async function getUsersFromFirebase() {
//   const querySnapshot = await getDocs(collection(db, "products"));
//   return querySnapshot.docs.forEach((doc) => {
//     return doc
//   });
const getUserssFromFirebase = []
const products = await getDocs(collection(db, 'users'))
products.docChanges().forEach(item => {
    getUserssFromFirebase.push({
        ...item.doc.data(),
        id: item.doc.id
    })
})
return getUserssFromFirebase
}
