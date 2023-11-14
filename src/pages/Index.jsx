import { motion } from "framer-motion";

function Index() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.25,
          ease: [0.61, 1, 0.88, 1],
        },
      }}
      exit={{ opacity: 0 }}
    >
      <div>
        <h1>Index</h1>
      </div>
    </motion.div>
  );
}

export default Index;
