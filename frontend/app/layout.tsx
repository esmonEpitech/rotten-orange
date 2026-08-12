
import "./global.css"
import {Bungee} from "next/font/google"

import {Alfa_Slab_One} from "next/font/google"


const bungee = Bungee({
  subsets: ["latin"],
  weight: "400",
})

const aso = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
})

export {aso}
export {bungee}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({children} : RootLayoutProps ){
    return (
       <html lang="en">
       <body className="bg-gray-50 text-gray-900 antialiased">
            {/* <Navbar /> */}
           
            <main>
             {children} 
            </main>

       </body>
       </html>
    );
}