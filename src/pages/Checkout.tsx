import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, ChevronRight, Gift, Truck, CreditCard, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCart } from "@/context/CartContext";
import { format } from "date-fns";

const steps = [
  { id: 1, name: "Delivery Details", icon: Truck },
  { id: 2, name: "Delivery Date", icon: Calendar },
  { id: 3, name: "Confirm Order", icon: Check },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const [senderInfo, setSenderInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [recipientInfo, setRecipientInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    let message = `*New Order from ${senderInfo.name || "Customer"}* (${senderInfo.phone || "No phone provided"})\n\n`;
    message += `*Recipient Details:*\nName: ${recipientInfo.name}\nPhone: ${recipientInfo.phone}\n`;
    message += `Address: ${recipientInfo.address}, ${recipientInfo.city}, ${recipientInfo.postalCode}\n`;
    if (deliveryDate) message += `Delivery Date: ${format(deliveryDate, "MMMM d, yyyy")}\n\n`;
    
    message += `*Order Items:*\n`;
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} ($${item.product.price.toFixed(2)} each)\n`;
    });
    
    message += `\n*Total: $${total.toFixed(2)}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Trigger confetti on the original tab
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFD700", "#FFA500"],
    });

    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
  };

  if (items.length === 0 && !isComplete) {
    return (
      <>
        <Navbar />
        <main className="container py-16 text-center">
          <h1 className="font-serif text-2xl font-bold">Your cart is empty</h1>
          <Button
            onClick={() => navigate("/shop")}
            variant="hero"
            className="mt-4"
          >
            Continue Shopping
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  if (isComplete) {
    return (
      <>
        <Helmet>
          <title>Order Confirmed | GiftVelvet</title>
        </Helmet>
        <Navbar />
        <main className="container py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-md text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold">
              <Check className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
              Order Confirmed!
            </h1>
            <p className="mt-4 text-muted-foreground">
              Thank you for your order. Your gift is being prepared with love
              and will be delivered on the selected date.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-card p-4 text-sm">
              <p className="text-muted-foreground">Order Number</p>
              <p className="font-mono text-lg font-bold text-foreground">
                #GV{Date.now().toString().slice(-8)}
              </p>
            </div>
            <Button
              onClick={() => navigate("/")}
              variant="hero"
              size="lg"
              className="mt-8"
            >
              Back to Home
            </Button>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | GiftVelvet</title>
        <meta
          name="description"
          content="Complete your order and send the perfect gift."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background py-8 md:py-12">
        <div className="container">
          {/* Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                        currentStep >= step.id
                          ? "bg-gradient-gold text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{step.name}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <ChevronRight className="mx-2 h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                {currentStep === 1 && (
                  <>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Delivery Details
                    </h2>

                    {/* Sender */}
                    <div className="mt-8">
                      <h3 className="flex items-center gap-2 font-semibold text-foreground">
                        <Gift className="h-4 w-4 text-primary" />
                        Your Information
                      </h3>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="senderName">Full Name</Label>
                          <Input
                            id="senderName"
                            value={senderInfo.name}
                            onChange={(e) =>
                              setSenderInfo({ ...senderInfo, name: e.target.value })
                            }
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="senderEmail">Email</Label>
                          <Input
                            id="senderEmail"
                            type="email"
                            value={senderInfo.email}
                            onChange={(e) =>
                              setSenderInfo({ ...senderInfo, email: e.target.value })
                            }
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="senderPhone">Phone</Label>
                          <Input
                            id="senderPhone"
                            value={senderInfo.phone}
                            onChange={(e) =>
                              setSenderInfo({ ...senderInfo, phone: e.target.value })
                            }
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Recipient */}
                    <div className="mt-8">
                      <h3 className="flex items-center gap-2 font-semibold text-foreground">
                        <Truck className="h-4 w-4 text-primary" />
                        Recipient Information
                      </h3>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="recipientName">Full Name</Label>
                          <Input
                            id="recipientName"
                            value={recipientInfo.name}
                            onChange={(e) =>
                              setRecipientInfo({
                                ...recipientInfo,
                                name: e.target.value,
                              })
                            }
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="recipientPhone">Phone</Label>
                          <Input
                            id="recipientPhone"
                            value={recipientInfo.phone}
                            onChange={(e) =>
                              setRecipientInfo({
                                ...recipientInfo,
                                phone: e.target.value,
                              })
                            }
                            className="mt-2"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={recipientInfo.address}
                            onChange={(e) =>
                              setRecipientInfo({
                                ...recipientInfo,
                                address: e.target.value,
                              })
                            }
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={recipientInfo.city}
                            onChange={(e) =>
                              setRecipientInfo({
                                ...recipientInfo,
                                city: e.target.value,
                              })
                            }
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={recipientInfo.postalCode}
                            onChange={(e) =>
                              setRecipientInfo({
                                ...recipientInfo,
                                postalCode: e.target.value,
                              })
                            }
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="hero"
                      size="lg"
                      className="mt-8 w-full"
                      onClick={() => setCurrentStep(2)}
                    >
                      Continue to Delivery Date
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Select Delivery Date
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Choose when you'd like the gift to arrive.
                    </p>

                    <div className="mt-8 flex justify-center">
                      <CalendarComponent
                        mode="single"
                        selected={deliveryDate}
                        onSelect={setDeliveryDate}
                        disabled={(date) =>
                          date < new Date() ||
                          date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                        }
                        className="rounded-xl border border-border"
                      />
                    </div>

                    {deliveryDate && (
                      <p className="mt-4 text-center text-sm text-muted-foreground">
                        Delivering on{" "}
                        <span className="font-semibold text-foreground">
                          {format(deliveryDate, "MMMM d, yyyy")}
                        </span>
                      </p>
                    )}

                    <div className="mt-8 flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setCurrentStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={() => setCurrentStep(3)}
                        disabled={!deliveryDate}
                      >
                        Continue to Payment
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      Confirm & Place Order
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Check your details and proceed to WhatsApp to finalize your order. You won't be charged here.
                    </p>

                    <div className="mt-8 space-y-4 rounded-lg bg-secondary/50 p-4">
                      <p className="text-sm font-medium">To: {recipientInfo.name}</p>
                      <p className="text-sm">Delivery: {deliveryDate ? format(deliveryDate, "MMMM d, yyyy") : "Not selected"}</p>
                      <p className="text-sm">Total: ${total.toFixed(2)}</p>
                    </div>

                    <div className="mt-8 flex gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setCurrentStep(2)}
                        disabled={isProcessing}
                      >
                        Back
                      </Button>
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Loading...
                          </>
                        ) : (
                          `Checkout via WhatsApp — $${total.toFixed(2)}`
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  Order Summary
                </h3>

                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
