'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"

const handleAddEvent = async () => {
  const res = await fetch("/api/add-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_name: "AddToCart", event_time: new Date().toISOString()}),
  });
}

const handlePurchaseEvent = async () => {
  const res = await fetch("/api/purchase-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_name: "Purchase", event_time: new Date().toISOString()}),
  });
}

const handleContactEvent = async () => {
  const res = await fetch("/api/contact-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_name: "contact", event_time: new Date().toISOString()}),
    
  });
}
const Page = () => {
  return (
    <div>
      <div className="text-center text-2xl font-bold">Welcome to Test App!</div>
      <div className="mt-6 flex justify-center gap-10 p-4">
        <Link href="/add" onClick={handleAddEvent}><Button>Add to Cart</Button></Link>
        <Link href="/purchase"><Button onClick={handlePurchaseEvent}>Purchase</Button></Link>
        <Link href="/contact"><Button onClick={handleContactEvent}>Contact</Button></Link>
      </div>
    </div>

  )
}

export default Page
