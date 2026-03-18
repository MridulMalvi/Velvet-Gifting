import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const footerLinks = {
  shop: [
    { name: "All Gifts", path: "/shop" },
    { name: "Best Sellers", path: "/shop?filter=featured" },
    { name: "New Arrivals", path: "/shop" },
    { name: "Gift Cards", path: "/gift-cards" },
  ],
  occasions: [
    { name: "Birthday", path: "/shop?occasion=birthday" },
    { name: "Anniversary", path: "/shop?occasion=anniversary" },
    { name: "Wedding", path: "/shop?occasion=wedding" },
    { name: "Corporate", path: "/shop?occasion=corporate" },
  ],
  support: [
    { name: "Contact Us", path: "/contact" },
    { name: "Track Order", path: "/track" },
    { name: "Shipping Info", path: "/shipping" },
    { name: "Returns", path: "/returns" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: siteConfig.links.instagram, label: "Instagram" },
  { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Facebook, href: siteConfig.links.facebook, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-muted-foreground">
              {siteConfig.description}
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="font-medium text-foreground">
                Subscribe for exclusive offers
              </p>
              <form className="mt-3 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-64"
                />
                <Button type="submit" variant="default">
                  <Mail className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold text-foreground">Shop</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground">
              Occasions
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.occasions.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-foreground">
              Support
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
