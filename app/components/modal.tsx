import { AnimatePresence, motion } from "framer-motion";

export default function Modal({
  opened,
  close,
  children,
}: {
  opened: boolean;
  close: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {opened && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-20 flex items-center justify-center fixed inset-0 bg-primary/20"
            onClick={() => close()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
