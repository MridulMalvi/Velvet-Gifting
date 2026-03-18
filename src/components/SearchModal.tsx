import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products } from "@/data/products";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) =>
      query.length > 1 &&
      (product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.occasionTags.some((tag) =>
          tag.toLowerCase().includes(query.toLowerCase())
        ))
  );

  const handleSelectProduct = (productId: string) => {
    onOpenChange(false);
    setQuery("");
    navigate(`/product/${productId}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[10%] translate-y-0 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Search Gifts</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for the perfect gift..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            autoFocus
          />
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelectProduct(product.id)}
                className="flex w-full items-center gap-4 rounded-lg p-3 text-left transition-colors hover:bg-secondary"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {query.length > 1 && filteredProducts.length === 0 && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            No gifts found for "{query}"
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
