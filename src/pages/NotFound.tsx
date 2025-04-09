
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-app-accent">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Sorry, we couldn't find the page you were looking for. It might have been moved or deleted.
        </p>
        <Button asChild>
          <Link to="/chat">Return to Chat</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
