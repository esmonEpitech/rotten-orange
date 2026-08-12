import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";



interface RootLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({children} : RootLayoutProps ){
    return (
      <div className="min-h-screen flex flex-col">
            <Navbar />
           
            <main className="flex-1">
             {children} 
            </main>

            <Footer />
      </div>
    );
}