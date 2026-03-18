import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, Package, Truck, CheckCircle, Gift } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockOrderStatuses = [
  { status: "Processing", icon: Package, complete: true },
  { status: "Wrapped", icon: Gift, complete: true },
  { status: "Out for Delivery", icon: Truck, complete: false },
  { status: "Delivered", icon: CheckCircle, complete: false },
];

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");
  const [showTracking, setShowTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setShowTracking(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Track Your Order | GiftVelvet</title>
        <meta
          name="description"
          content="Track your GiftVelvet order in real-time. See when your gift will arrive."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Track Your <span className="text-gradient-gold">Order</span>
            </h1>
            <p className="mt-4 text-muted-foreground">
              Enter your order number to see the status of your gift.
            </p>

            <form
              onSubmit={handleTrack}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Input
                placeholder="Enter order number (e.g., GV12345678)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="hero" size="lg">
                <Search className="mr-2 h-4 w-4" />
                Track
              </Button>
            </form>
          </motion.div>

          {showTracking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono text-lg font-bold text-foreground">
                    #{orderNumber || "GV12345678"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Estimated Delivery
                  </p>
                  <p className="font-semibold text-foreground">Dec 28, 2024</p>
                </div>
              </div>

              <div className="mt-8">
                <div className="relative">
                  {mockOrderStatuses.map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === mockOrderStatuses.length - 1;

                    return (
                      <div key={step.status} className="flex items-start gap-4">
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              step.complete
                                ? "bg-gradient-gold text-primary-foreground"
                                : "border-2 border-border bg-background text-muted-foreground"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          {!isLast && (
                            <div
                              className={`h-12 w-0.5 ${
                                step.complete
                                  ? "bg-primary"
                                  : "bg-border"
                              }`}
                            />
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <p
                            className={`font-medium ${
                              step.complete
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {step.status}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {step.complete
                              ? "Completed"
                              : "Pending"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
