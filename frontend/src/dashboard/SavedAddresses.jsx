import { Input, Button, VStack } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export default function SavedAddress() {
  const { user } = useAuth();
  const [addr, setAddr] = useState({ line1:"", city:"", state:"", pincode:"" });

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists() && snap.data().address)
        setAddr(snap.data().address);
    });
  }, [user]);

  const save = async () => {
    await setDoc(doc(db, "users", user.uid), {
      address: addr
    }, { merge: true });
    alert("Address saved!");
  };

  return (
    <VStack>
      <Input placeholder="Address" value={addr.line1}
        onChange={(e)=>setAddr({...addr, line1:e.target.value})}/>
      <Input placeholder="City" value={addr.city}
        onChange={(e)=>setAddr({...addr, city:e.target.value})}/>
      <Input placeholder="State" value={addr.state}
        onChange={(e)=>setAddr({...addr, state:e.target.value})}/>
      <Input placeholder="Pincode" value={addr.pincode}
        onChange={(e)=>setAddr({...addr, pincode:e.target.value})}/>
      <Button onClick={save}>Save Address</Button>
    </VStack>
  );
}
