
import { AppLayout } from "@/components/AppLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Laptop, Search, ArrowRight, Calendar } from "lucide-react";

// Mock history data
const historyItems = [
  {
    id: "1",
    product: "Laptop",
    date: "April 10, 2025",
    recommendations: [
      { model: "Acer Swift 3", reason: "Good value for money" },
      { model: "ASUS TUF Gaming F15", reason: "For gaming and work" },
      { model: "Apple MacBook Air M2", reason: "For design and programming" },
    ],
  },
  {
    id: "2",
    product: "Smartphone",
    date: "April 5, 2025",
    recommendations: [
      { model: "Samsung Galaxy S24", reason: "Flagship with excellent camera" },
      { model: "Google Pixel 8", reason: "Clean Android and great photos" },
      { model: "iPhone 15", reason: "Apple ecosystem and good camera" },
    ],
  },
  {
    id: "3",
    product: "Headphones",
    date: "April 1, 2025",
    recommendations: [
      { model: "Sony WH-1000XM5", reason: "Best noise cancellation" },
      { model: "Apple AirPods Pro 2", reason: "For Apple ecosystem" },
      { model: "Bose QuietComfort Ultra", reason: "Supreme comfort" },
    ],
  },
];

const History = () => {
  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Request History</h1>
          <p className="text-gray-500">View your previous requests and received recommendations</p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="laptops">Laptops</TabsTrigger>
            <TabsTrigger value="phones">Smartphones</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {historyItems.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </TabsContent>
          
          <TabsContent value="laptops" className="space-y-4">
            {historyItems
              .filter((item) => item.product === "Laptop")
              .map((item) => (
                <HistoryCard key={item.id} item={item} />
              ))}
          </TabsContent>
          
          <TabsContent value="phones" className="space-y-4">
            {historyItems
              .filter((item) => item.product === "Smartphone")
              .map((item) => (
                <HistoryCard key={item.id} item={item} />
              ))}
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4">
            {historyItems
              .filter((item) => !["Laptop", "Smartphone"].includes(item.product))
              .map((item) => (
                <HistoryCard key={item.id} item={item} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

interface HistoryCardProps {
  item: {
    id: string;
    product: string;
    date: string;
    recommendations: Array<{ model: string; reason: string }>;
  };
}

const HistoryCard = ({ item }: HistoryCardProps) => {
  const getIcon = (product: string) => {
    switch (product) {
      case "Laptop":
        return Laptop;
      default:
        return Search;
    }
  };
  
  const ProductIcon = getIcon(item.product);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-white flex flex-row items-center gap-4">
        <div className="p-2 rounded-md bg-app-accent-light">
          <ProductIcon className="h-5 w-5 text-app-accent" />
        </div>
        <div>
          <CardTitle className="text-lg">{item.product}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Calendar className="h-3 w-3" />
            {item.date}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <h4 className="text-sm font-medium mb-3">Recommendations:</h4>
        <ul className="space-y-3">
          {item.recommendations.map((rec, index) => (
            <li key={index} className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <span className="font-medium">{rec.model}</span>
              <ArrowRight className="h-3 w-3 text-gray-400 mx-1" />
              <span className="text-gray-600 text-sm">{rec.reason}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" className="text-app-accent">
            Continue Conversation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default History;
