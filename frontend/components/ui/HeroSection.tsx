"use client";

import React from "react";
import { bungee } from "@/app/layout"
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#591F0A] to-[#D65108] text-white py-20 px-8   max-w-none shadow-xl overflow-hidden">
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#EFA00B] rounded-full blur-3xl opacity-20 w-full"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="relative z-10 max-w-2xl">
        <span className="text-[#EFA00B] text-sm font-bold uppercase tracking-wider bg-orange-950/40 px-3 py-1 rounded-full">
          Du Nouveau sur Rotten Oranges 
        </span>
        <h1 className= {`${bungee.className} text-4xl md:text-5xl font-black mt-4 mb-6 leading-tight`}>
          Découvrez, Notez et Partagez vos Films Préférés
        </h1>
        <p className="text-orange-100 text-lg mb-8 leading-relaxed">
          Rejoignez notre communauté de passionnés de cinéma. Donnez votre avis sur les dernières sorties et consultez les critiques du public en un clin dœil.
        </p>
        <button className="bg-[#EFA00B] hover:bg-white hover:text-[#D65108] text-white font-bold px-8 py-3 rounded-full shadow-md transition-all duration-200 transform hover:scale-105 text-sm">
          Explorer les films
        </button>
      </div>

      <div className="relative w-full h-[300px] md:h-[400px] flex justify-center items-center">
          <Image
            src="/shapes-removebg-preview.png" 
            alt="Formes géométriques Rotten Oranges"
            fill 
            priority
            className="object-contain" 
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        </div>
    </section>
  );
}