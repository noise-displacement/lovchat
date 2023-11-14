import { commonCategories } from "../utils/lawFields";
import { motion } from "framer-motion";

function About() {
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
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full">
          <div className="flex w-full h-[10vh]"></div>
          <h1 className="font-serif font-semibold text-3xl text-dark-red">
            Om oss
          </h1>
          <p className="text-dark-red mt-4">
            Her kan du se hva andre har stilt spørsmål om før deg
          </p>

          <div className="flex gap-4 mt-8">
            {commonCategories.map((lawField, i) => {
              return (
                <button
                  key={i}
                  className="flex flex-col grow bg-light-red rounded-xl"
                >
                  <span className="p-4 text-dark-red">{lawField.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
