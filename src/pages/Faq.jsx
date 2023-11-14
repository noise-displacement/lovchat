import { motion } from "framer-motion";
import { commonCategories } from "../utils/lawFields";
import FaqDrawer from "../components/FaqDrawer";

const faq = [
  {
    question:
      "Kan jeg kreve avslag i leien hvis de som bor over meg lager mye og høy lyd hele tiden?",
    answer:
      "Først burde du prøve å snakke med vedkommende, men hvis dette ikke hjelper kan du ta kontakt med utleier. Utleier plikter å opprettholde vanlig ro og orden i eiendommen, og det betyr at utleier plikter å involvere seg hvis naboer er til sjenanse mot leieboeren. Hvis utleier også leier ut til den bråkete naboen er det ofte enklere, fordi utleier da kan sanksjonere direkte mot den det gjelder. Er det derimot en nabo som selv eier boligen, eller leier av noen andre, og vedkommende heller ikke vil høre på utleier, må utleier gå om styret i sameiet eller borettslaget. Da kan ting ofte ta noe tid. Når den bråkete naboen er utleier selv, kan det bli vanskelig. Men utleiers plikt til å opprettholde ro gjelder selvfølgelig også for utleier selv. Hvis utleier nekter å foreta seg noe for å få bukt med hyppig eller varig bråk, kan man som leieboer kreve et avslag i leien tilsvarende den verdireduksjonen nabostøyen utgjør.",
  },

{
    question: "Utleier sier jeg skal overføre depositumet til samme konto som jeg betaler leie til, er det lov å kreve?",
    answer: "Nei, depositumet skal bevares på en konto i leieboers navn som de ikke fritt kan disponere. Det er ulovlig for utleieren å motta depositumet kontant eller å sette det på sin egen konto."
},

{
    question: "Jeg har førerhund, men utleier nekter meg å ha husdyr. Må jeg finne et annet sted å bo da?",
    answer: "Utleieren kan fastsette forbud mot dyrehold. Leieboeren kan likevel holde dyr dersom gode grunner taler for det. En slik grunn kan være at leieboeren har behov førerhund eller tjenestehund. Dyreholdet må ikke være til ulempe for utleieren eller øvrige beboere. Ulempene kan bestå i støy, lukt, dyrehår, allergi eller redsel for dyret. Om leieboeren skal få ha dyr, beror på en interesseavveining. Jo større behovet for å holde dyr er, desto større ulemper må det kreves før dyreholdet kan nektes. Jo større ulempene av dyreholdet oppleves for de øvrige beboerne, desto mer tungtveiende grunner må leieboeren ha. Hvis ulempene for de øvrige beboerne er ubetydelige, for eksempel fordi det er snakk om å holde et innedyr som marsvin eller fugl, kan utleieren ikke nekte leieboeren å ha slike selv om han ikke har spesielt god grunn for å ha dyret."
},

{
    question: "Jeg har en datter på 4 år, og utleier sier jeg må betale leie for henne også. Må jeg det?",
    answer: "Når leieboeren deler leiligheten med andre og har en viss grad av felles husholdning, er det husstandsfellesskap. Leieboeren har rett til å ta opp i sin husstand sin ektefelle eller samboer, sine egne, ektefellens eller samboerens slektninger i rett opp- eller nedadstigende linje, adoptivbarn og fosterbarn. Barn går under nedadstigende linje, og barnas alder er uten betydning. Du trenger ikke utleierens godkjenning, men bør likevel varsle utleieren om hvem han tar opp i husstanden."
},

{
    question: "Jeg ønsker å si opp leietakeren min, hvordan går jeg frem?",
    answer: "Du kan få leietaker kastet ut (fraveket) i visse situasjoner, men bare hvis du har en utkastelsesklausul (fravikelsesklausul) i leiekontrakten. Du finner en slik klausul i vår standard leiekontrakt. Utkastelse kan da gjennomføres hvis ikke leietaker betaler husleie, oppsigelsestiden er utløpt eller leieperioden er ute. Prosessen starter med at du sender et varsel om utkastelse. Du kan begjære utkastelse hos namsmannen 14 dager etter at varsel er sendt. Du kan ikke selv kaste ut en leietaker. Varsel bør sendes rekommandert av bevismessige hensyn."
},

{
    question: "Jeg bor i en tomannsbolig hvor jeg bor i den ene leiligheten og leier ut den andre. Må jeg betale skatt av leieinntekten?",
    answer: "Forutsatt av at boligen ikke er seksjonert, kan leieinntekten være skattefri. Dette er forutsatt av at den delen av tomannsboligen som du leier ut ikke er mer verdt enn del delen du bor i selv, regnet etter utleieverdi."
}
];

function Faq() {
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
            Andre lurer på
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

          <div className="flex flex-col mt-8">
            {faq.map((faq, i) => {
              return (
                <FaqDrawer
                  key={i}
                  question={faq.question}
                  answer={faq.answer}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Faq;
