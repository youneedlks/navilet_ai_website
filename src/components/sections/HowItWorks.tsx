"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import HowItWorksVideoBlock from "@/components/video/HowItWorksVideoBlock";

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works">
      <motion.div variants={fadeInUp} className="mb-12 text-center lg:mb-16">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          От первого сообщения до готового предложения <span className="text-accent sm:whitespace-nowrap">за 30 секунд</span>
        </h2>
      </motion.div>
      <HowItWorksVideoBlock />
    </SectionWrapper>
  );
}
