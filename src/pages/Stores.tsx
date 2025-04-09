
import { useState, useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock store data
const storesData = [
  {
    id: "1",
    name: "ТехноМаг",
    address: "ул. Ленина, 45",
    phone: "+7 (999) 123-45-67",
    hours: "10:00 - 21:00",
    rating: 4.8,
    products: ["Acer Swift 3", "ASUS TUF Gaming F15"],
    coordinates: { lat: 55.751244, lng: 37.618423 },
  },
  {
    id: "2",
    name: "КомпМаркет",
    address: "пр. Мира, 112",
    phone: "+7 (999) 765-43-21",
    hours: "09:00 - 20:00",
    rating: 4.5,
    products: ["ASUS TUF Gaming F15", "Apple MacBook Air M2"],
    coordinates: { lat: 55.759244, lng: 37.623423 },
  },
  {
    id: "3",
    name: "ДиджиталШоп",
    address: "ул. Гагарина, 23",
    phone: "+7 (999) 555-66-77",
    hours: "10:00 - 22:00",
    rating: 4.7,
    products: ["Acer Swift 3", "Apple MacBook Air M2"],
    coordinates: { lat: 55.741244, lng: 37.613423 },
  },
];

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  
  // Map would be implemented here in a real application using Mapbox or Google Maps
  // For this demo, we'll just show a placeholder and stores list
  
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 md:p-6 bg-white border-b border-gray-200">
          <h1 className="text-2xl font-semibold">Карта магазинов</h1>
          <p className="text-gray-500">Найдите ближайшие магазины с рекомендованными товарами</p>
        </div>
        
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="md:w-1/2 p-4 md:p-6 overflow-y-auto">
            <Tabs defaultValue="all" className="w-full mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Все магазины</TabsTrigger>
                <TabsTrigger value="acer">Acer Swift 3</TabsTrigger>
                <TabsTrigger value="asus">ASUS TUF Gaming</TabsTrigger>
                <TabsTrigger value="apple">MacBook Air</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {storesData.map((store) => (
                  <StoreCard
                    key={store.id}
                    store={store}
                    isSelected={selectedStore === store.id}
                    onSelect={() => setSelectedStore(store.id)}
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="acer" className="space-y-4">
                {storesData
                  .filter((store) => store.products.includes("Acer Swift 3"))
                  .map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      isSelected={selectedStore === store.id}
                      onSelect={() => setSelectedStore(store.id)}
                    />
                  ))}
              </TabsContent>
              
              <TabsContent value="asus" className="space-y-4">
                {storesData
                  .filter((store) => store.products.includes("ASUS TUF Gaming F15"))
                  .map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      isSelected={selectedStore === store.id}
                      onSelect={() => setSelectedStore(store.id)}
                    />
                  ))}
              </TabsContent>
              
              <TabsContent value="apple" className="space-y-4">
                {storesData
                  .filter((store) => store.products.includes("Apple MacBook Air M2"))
                  .map((store) => (
                    <StoreCard
                      key={store.id}
                      store={store}
                      isSelected={selectedStore === store.id}
                      onSelect={() => setSelectedStore(store.id)}
                    />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:w-1/2 p-4 md:p-6">
            <div className="w-full h-full min-h-[400px] rounded-lg bg-gray-200 flex items-center justify-center">
              <div className="text-center p-6">
                <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-700">Интерактивная карта</h3>
                <p className="text-gray-500 mt-2">
                  Здесь будет отображена карта с расположением магазинов
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface StoreCardProps {
  store: {
    id: string;
    name: string;
    address: string;
    phone: string;
    hours: string;
    rating: number;
    products: string[];
  };
  isSelected: boolean;
  onSelect: () => void;
}

const StoreCard = ({ store, isSelected, onSelect }: StoreCardProps) => {
  return (
    <Card
      className={`overflow-hidden cursor-pointer transition-all ${
        isSelected ? "border-app-accent ring-2 ring-app-accent-light" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader className="bg-white pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{store.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {store.address}
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 font-medium">{store.rating}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-app-text-light" />
            <span>{store.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-app-text-light" />
            <span>{store.hours}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-2">Доступные товары:</p>
          <div className="flex flex-wrap gap-2">
            {store.products.map((product, index) => (
              <Badge key={index} variant="secondary">
                {product}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm" className="text-xs">
            <ExternalLink className="h-3 w-3 mr-1" />
            Построить маршрут
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Stores;
