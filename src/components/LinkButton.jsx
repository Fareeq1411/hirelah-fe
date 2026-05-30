import { Button } from "@/components/ui/button";

export default function LinkButton({ title, url }) {
  return (
    <Button 
      asChild 
      variant="outline" 
      className="w-full mb-3 py-6 rounded-xl border-1 font-semibold text-base transition-colors"
    >
      <a href={url}>{title}</a>
    </Button>
  );
}