import { Button } from "@/components/ui/button";

export default function LinkButton({ title, url }) {
  return (
    <Button 
      asChild 
      variant="outline" 
      className="w-full mb-3 py-6 rounded-xl border-2 border-green-200 text-green-900 hover:bg-green-50 hover:text-green-900 font-semibold text-base transition-colors"
    >
      <a href={url}>{title}</a>
    </Button>
  );
}