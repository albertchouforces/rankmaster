export interface AirForceRank {
  id: number;
  rank: string;
  description: string;
  fact: string;
  imageUrl: string;
}

export const airForceRanks: AirForceRank[] = [
  // Non-Commissioned Members
  {
    id: 1,
    rank: "Aviator (Basic)",
    description: "Entry-level rank in the Royal Canadian Air Force",
    fact: "Previously known as Private (Recruit) until 2015 when the RCAF reintroduced historical air force rank names.",
    imageUrl: "/ranks/air/avr-b.png"
  },
  {
    id: 2,
    rank: "Aviator (Trained)",
    description: "Fully qualified aviator in their trade",
    fact: "Aviators (Trained) have completed their occupational training and wear a propeller badge.",
    imageUrl: "/ranks/air/avr-t.png"
  },
  {
    id: 3,
    rank: "Corporal",
    description: "First leadership rank, supervising small teams",
    fact: "Corporals in the RCAF often specialize in aircraft maintenance or other technical trades.",
    imageUrl: "/ranks/air/cpl.png"
  },
  {
    id: 4,
    rank: "Master Corporal",
    description: "Senior appointment for experienced Corporals",
    fact: "Master Corporals often serve as crew leaders in aircraft maintenance teams.",
    imageUrl: "/ranks/air/mcpl.png"
  },
  {
    id: 5,
    rank: "Sergeant",
    description: "Senior NCO leading specialized teams",
    fact: "Sergeants often supervise maintenance crews or specialized sections within squadrons.",
    imageUrl: "/ranks/air/sgt.png"
  },
  {
    id: 6,
    rank: "Warrant Officer",
    description: "Technical expert and senior leader",
    fact: "Warrant Officers often serve as standards evaluators in their trades.",
    imageUrl: "/ranks/air/wo.png"
  },
  {
    id: 7,
    rank: "Master Warrant Officer",
    description: "Senior technical advisor at squadron level",
    fact: "MWOs often serve as Squadron Warrant Officers, responsible for discipline and administration.",
    imageUrl: "/ranks/air/mwo.png"
  },
  {
    id: 8,
    rank: "Chief Warrant Officer",
    description: "Most senior non-commissioned member",
    fact: "The RCAF Chief Warrant Officer is the most senior CWO position in the Air Force.",
    imageUrl: "/ranks/air/cwo.png"
  },
  // Commissioned Officers
  {
    id: 9,
    rank: "Officer Cadet",
    description: "Officer under training",
    fact: "Officer Cadets train at military colleges or civilian universities in various air force occupations.",
    imageUrl: "/ranks/air/ocdt.png"
  },
  {
    id: 10,
    rank: "Second Lieutenant",
    description: "Junior officer completing initial training",
    fact: "Many Second Lieutenants are undergoing pilot training or other air crew qualifications.",
    imageUrl: "/ranks/air/2lt.png"
  },
  {
    id: 11,
    rank: "Lieutenant",
    description: "Newly qualified pilot or specialist officer",
    fact: "Lieutenants who are pilots have usually just received their wings and are building experience.",
    imageUrl: "/ranks/air/lt.png"
  },
  {
    id: 12,
    rank: "Captain",
    description: "Experienced pilot or specialist officer",
    fact: "Most RCAF pilots achieve the rank of Captain after gaining operational experience.",
    imageUrl: "/ranks/air/capt.png"
  },
  {
    id: 13,
    rank: "Major",
    description: "Senior officer commanding flights or in staff roles",
    fact: "Majors often serve as flight commanders or in headquarters staff positions.",
    imageUrl: "/ranks/air/maj.png"
  },
  {
    id: 14,
    rank: "Lieutenant-Colonel",
    description: "Commanding officer of a squadron",
    fact: "Lieutenant-Colonels typically command flying or technical squadrons.",
    imageUrl: "/ranks/air/lcol.png"
  },
  {
    id: 15,
    rank: "Colonel",
    description: "Senior officer commanding wings or bases",
    fact: "Colonels often command RCAF Wings, which can include multiple squadrons.",
    imageUrl: "/ranks/air/col.png"
  },
  {
    id: 16,
    rank: "Brigadier-General",
    description: "General officer commanding major formations",
    fact: "Brigadier-Generals often direct specific capabilities like fighter or transport operations.",
    imageUrl: "/ranks/air/bgen.png"
  },
  {
    id: 17,
    rank: "Major-General",
    description: "Senior general officer commanding divisions",
    fact: "Major-Generals may command operational or training divisions of the RCAF.",
    imageUrl: "/ranks/air/mgen.png"
  },
  {
    id: 18,
    rank: "Lieutenant-General",
    description: "Senior general officer commanding air force",
    fact: "The Commander of the Royal Canadian Air Force holds the rank of Lieutenant-General.",
    imageUrl: "/ranks/air/lgen.png"
  },
  {
    id: 19,
    rank: "General",
    description: "Highest air force rank in the Canadian Armed Forces",
    fact: "Only one General position exists: the Chief of the Defence Staff, when filled by an air force officer.",
    imageUrl: "/ranks/air/gen.png"
  }
];
