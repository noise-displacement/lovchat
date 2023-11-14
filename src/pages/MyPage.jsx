import { motion } from "framer-motion";

function MyPage() {
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
      className="h-full flex"
    >
      <div className="previousChats w-[33vw] bg-light-red h-full rounded-3xl">
        <div className="flex flex-col justify-between h-full">
          <div>
            <button className="w-full text-left px-6 py-6 bg-dark-red rounded-xl">
              <div className="">
                <span className="font-semibold text-white">Rediger profil</span>
              </div>
            </button>

            <button className="w-full text-left px-6 rounded-xl">
              <div className="border-b border-dark-red py-6">
                <span className="font-semibold text-dark-red">
                  Din datahistorikk
                </span>
              </div>
            </button>

            <button className="w-full text-left px-6 rounded-xl">
              <div className="border-b border-dark-red py-6">
                <span className="font-semibold text-dark-red">Slett data</span>
              </div>
            </button>

            <button className="w-full text-left px-6 rounded-xl">
              <div className="border-b border-dark-red py-6">
                <span className="font-semibold text-dark-red">
                  Tilpasset interaksjon
                </span>
              </div>
            </button>
          </div>

          <div>
            <button className="w-full text-left px-6 rounded-xl">
              <div className="border-t border-dark-red py-6">
                <span className="font-semibold text-dark-red">
                  Logg ut
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-full flex justify-center">

      </div>
    </motion.div>
  );
}

export default MyPage;
