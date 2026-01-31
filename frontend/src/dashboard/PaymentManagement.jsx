import { Box, Radio, RadioGroup, Button } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";

export default function PaymentManagement() {
  const { user } = useAuth();
  const [method, setMethod] = useState("COD");

  const save = async () => {
    await setDoc(doc(db, "users", user.uid), {
      paymentMethod: method
    }, { merge: true });
    alert("Payment preference saved!");
  };

  return (
    <Box>
      <RadioGroup value={method} onChange={setMethod}>
        <Radio value="COD">Cash on Delivery</Radio>
      </RadioGroup>
      <Button mt={4} onClick={save}>Save</Button>
    </Box>
  );
}
