import { Box, Input, Button, VStack } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";

export default function ProfileDetails() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "" });

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists()) setForm(snap.data());
    });
  }, [user]);

  const save = async () => {
    await setDoc(doc(db, "users", user.uid), {
      ...form,
      email: user.email,
    }, { merge: true });
    alert("Profile saved!");
  };

  return (
    <VStack>
      <Input placeholder="Name" value={form.name}
        onChange={(e)=>setForm({...form, name:e.target.value})}/>
      <Input placeholder="Phone" value={form.phone}
        onChange={(e)=>setForm({...form, phone:e.target.value})}/>
      <Button onClick={save}>Save</Button>
    </VStack>
  );
}
