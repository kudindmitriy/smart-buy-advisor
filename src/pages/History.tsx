
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
    product: "Ноутбук",
    date: "10 апреля 2025",
    recommendations: [
      { model: "Acer Swift 3", reason: "Хорошее соотношение цена-качество" },
      { model: "ASUS TUF Gaming F15", reason: "Для игр и работы" },
      { model: "Apple MacBook Air M2", reason: "Для дизайна и программирования" },
    ],
  },
  {
    id: "2",
    product: "Смартфон",
    date: "5 апреля 2025",
    recommendations: [
      { model: "Samsung Galaxy S24", reason: "Флагман с отличной камерой" },
      { model: "Google Pixel 8", reason: "Чистый Android и отличные фото" },
      { model: "iPhone 15", reason: "Экосистема Apple и хорошая камера" },
    ],
  },
  {
    id: "3",
    product: "Наушники",
    date: "1 апреля 2025",
    recommendations: [
      { model: "Sony WH-1000XM5", reason: "Лучшее шумоподавление" },
      { model: "Apple AirPods Pro 2", reason: "Для экосистемы Apple" },
      { model: "Bose QuietComfort Ultra", reason: "Комфорт на высоте" },
    ],
  },
];

const History = () => {
  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">История запросов</h1>
          <p className="text-gray-500">Просмотр ваших предыдущих запросов и полученных рекомендаций</p>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Все запросы</TabsTrigger>
            <TabsTrigger value="laptops">Ноутбуки</TabsTrigger>
            <TabsTrigger value="phones">Смартфоны</TabsTrigger>
            <TabsTrigger value="other">Прочее</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {historyItems.map((item) => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </TabsContent>
          
          <TabsContent value="laptops" className="space-y-4">
            {historyItems
              .filter((item) => item.product === "Ноутбук")
              .map((item) => (
                <HistoryCard key={item.id} item={item} />
              ))}
          </TabsContent>
          
          <TabsContent value="phones" className="space-y-4">
            {historyItems
              .filter((item) => item.product === "Смартфон")
              .map((item) => (
                <HistoryCard key={item.id} item={item} />
              ))}
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4">
            {historyItems
              .filter((item) => !["Ноутбук", "Смартфон"].includes(item.product))
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
      case "Ноутбук":
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
        <h4 className="text-sm font-medium mb-3">Рекомендации:</h4>
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
            Продолжить диалог
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default History;
