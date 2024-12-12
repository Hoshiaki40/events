"use client";

import { DangerTriangleOutlineIcon } from "@/src/presentation/components/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  const [isVisible, setIsVisible] = useState(!!message);

  useEffect(() => {
    setIsVisible(!!message);
  }, [message]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-full mb-4"
        >
          <div className="bg-danger-50 text-danger px-4 py-3 rounded-lg ">
            <div className="flex items-end gap-3 ">
              <DangerTriangleOutlineIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="flex-grow">
                <p className="text-sm font-medium">{message}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
