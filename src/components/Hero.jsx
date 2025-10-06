import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20 items-center"
    >
      {/* Achtergrond blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-blue/20 dark:bg-brand-blue/40 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-60 -right-40 w-[500px] h-[500px] bg-brand-teal/20 dark:bg-brand-teal/40 rounded-full blur-3xl -z-10"
