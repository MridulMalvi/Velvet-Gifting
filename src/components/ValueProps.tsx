import { Truck, Package, PenTool } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Truck,
    title: "Same Day Delivery",
    description: "Order before 2 PM for same-day delivery in select areas.",
  },
  {
    icon: Package,
    title: "Premium Packaging",
    description: "Every gift is wrapped with love and premium materials.",
  },
  {
    icon: PenTool,
    title: "Handwritten Notes",
    description: "Add a personal touch with our handwritten message service.",
  },
];

export default function ValueProps() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
