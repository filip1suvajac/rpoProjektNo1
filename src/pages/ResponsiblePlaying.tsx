import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SectionKey = "budget" | "smart" | "responsibility";

const sections: Record<
  SectionKey,
  { title: string; content: string }
> = {
  budget: {
    title: "Finančni načrt",
    content:
      "Določanje osebnega proračuna je eden najpomembnejših korakov pri odgovornem igranju. Preden začnete igrati, si jasno opredelite znesek, ki ga lahko brez težav namenite zabavi, ne da bi to vplivalo na vaše osnovne življenjske stroške. Ta proračun naj bo fiksen in časovno omejen (na primer dnevni, tedenski ali mesečni). Ko dosežete svoj limit, prenehajte z igranjem, ne glede na to, ali ste v dobičku ali izgubi. Redno spremljanje porabe vam pomaga ohranjati nadzor in preprečuje impulzivne odločitve.",
  },
  smart: {
    title: "Pametno stavi",
    content:
      "Pametno igranje pomeni, da igre na srečo dojemate kot obliko zabave in ne kot način zaslužka. Rezultati so vedno nepredvidljivi, zato izgube ne smete razumeti kot izziv, ki ga je treba “popraviti”. Izogibajte se povečevanju vložkov zaradi čustev, stresa ali želje po hitrem povračilu izgubljenega denarja. Igrajte premišljeno, z jasnimi odločitvami, in si redno privoščite odmore. Če opazite, da igranje vpliva na vaše razpoloženje ali vsakodnevne obveznosti, je to znak, da se morate ustaviti.",
  },
  responsibility: {
    title: "Odgovornosti",
    content:
      "Odgovorno igranje zahteva zavedanje lastnih meja in odgovornost za lastna dejanja. Pomembno je, da prepoznate morebitne znake tveganega igranja, kot so izguba nadzora, igranje dlje, kot ste načrtovali, ali zanemarjanje osebnih obveznosti. Prav tako je pomembno, da ste iskreni do sebe in do drugih glede svojega igranja. Če občutite, da igranje postaja problem ali da vpliva na vaše življenje, poiščite podporo pri bližnjih ali strokovnih organizacijah. Pravočasno ukrepanje je ključno za ohranjanje zdravega odnosa do iger na srečo.",
  },
};

export default function ResponsiblePlaying() {
  const [active, setActive] = useState<SectionKey>("budget");

  return (
    <div className="min-h-60 bg-[#1A2C38] text-white px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Igraj odgovorno!</h1>

        {/* OPTIONS */}
        <div className="flex gap-4 mb-8">
          {Object.entries(sections).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActive(key as SectionKey)}
              className={`px-6 py-3 rounded-lg border transition
                ${
                  active === key
                    ? "bg-teal-600 border-teal-500 text-white"
                    : "border-white/20 hover:bg-white/10"
                }`}
            >
              {value.title}
            </button>
          ))}
        </div>

        {/* CONTENT WITH ANIMATION */}
        <div className="bg-[#0F212E] border border-white/10 rounded-xl p-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h2 className="text-xl font-semibold mb-4">
                {sections[active].title}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {sections[active].content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
