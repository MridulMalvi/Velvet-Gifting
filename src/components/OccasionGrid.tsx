import { Link } from "react-router-dom";
import { Cake, Heart, Gem, Briefcase, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const occasions = [
  {
    id: "birthday",
    name: "Birthday",
    icon: Cake,
    gradient: "from-pink-400 to-rose-500",
    description: "Celebrate another year",
  },
  {
    id: "anniversary",
    name: "Anniversary",
    icon: Heart,
    gradient: "from-red-400 to-pink-500",
    description: "Cherish the moments",
  },
  {
    id: "wedding",
    name: "Wedding",
    icon: Gem,
    gradient: "from-amber-400 to-yellow-500",
    description: "Say 'I do' in style",
  },
  {
    id: "corporate",
    name: "Corporate",
    icon: Briefcase,
    gradient: "from-blue-400 to-indigo-500",
    description: "Professional gifting",
  },
  {
    id: "just-because",
    name: "Just Because",
    icon: Sparkles,
    gradient: "from-purple-400 to-violet-500",
    description: "No reason needed",
  },
];

export default function OccasionGrid() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Shop by <span className="text-gradient-gold">Occasion</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Find the perfect gift for every celebration. Browse our curated
            collections designed for life's special moments.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {occasions.map((occasion, index) => {
            const Icon = occasion.icon;
            return (
              <motion.div
                key={occasion.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/shop?occasion=${occasion.id}`}
                  className="group flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-elegant lg:p-8"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${occasion.gradient} shadow-md transition-transform duration-300 group-hover:scale-110 lg:h-20 lg:w-20`}
                  >
                    <Icon className="h-8 w-8 text-white lg:h-10 lg:w-10" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                    {occasion.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {occasion.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
