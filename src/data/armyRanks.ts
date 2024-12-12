export interface ArmyRank {
  id: number;
  rank: string;
  description: string;
  fact: string;
  imageUrl: string;
}

export const armyRanks: ArmyRank[] = [
  // Non-Commissioned Members
  {
    id: 1,
    rank: "Private (Basic)",
    description: "Private who has completed basic training",
    fact: "The single chevron represents the first step in an Army career after completing basic military qualification.",
    imageUrl: "/ranks/army/pte-b.png"
  },
  {
    id: 2,
    rank: "Private (Trained)",
    description: "Fully trained soldier in their trade",
    fact: "Privates (Trained) have completed their occupational training and are qualified in their military trade.",
    imageUrl: "/ranks/army/pte-t.png"
  },
  {
    id: 3,
    rank: "Corporal",
    description: "First leadership rank, supervising small teams",
    fact: "The two chevrons of a Corporal date back to the British Army system of the 18th century.",
    imageUrl: "/ranks/army/cpl.png"
  },
  {
    id: 4,
    rank: "Master Corporal",
    description: "Senior appointment for experienced Corporals",
    fact: "The Master Corporal rank was created in 1968 to recognize leadership skills at the junior NCO level.",
    imageUrl: "/ranks/army/mcpl.png"
  },
  {
    id: 5,
    rank: "Sergeant",
    description: "Senior NCO leading platoon-sized elements",
    fact: "Sergeants are often referred to as 'The Backbone of the Army' due to their crucial leadership role.",
    imageUrl: "/ranks/army/sgt.png"
  },
  {
    id: 6,
    rank: "Warrant Officer",
    description: "Technical expert and senior leader",
    fact: "The crown in the Warrant Officer insignia represents their warrant from the Crown to hold their position.",
    imageUrl: "/ranks/army/wo.png"
  },
  {
    id: 7,
    rank: "Master Warrant Officer",
    description: "Senior technical advisor at company/squadron level",
    fact: "MWOs often serve as Company Sergeant Majors, responsible for discipline and administration.",
    imageUrl: "/ranks/army/mwo.png"
  },
  {
    id: 8,
    rank: "Chief Warrant Officer",
    description: "Most senior non-commissioned member",
    fact: "The Canadian Army Sergeant Major is the most senior CWO position in the Canadian Army.",
    imageUrl: "/ranks/army/cwo.png"
  },
  // Commissioned Officers
  {
    id: 9,
    rank: "Officer Cadet",
    description: "Officer under training",
    fact: "Officer Cadets train at military colleges or civilian universities under the Regular Officer Training Plan.",
    imageUrl: "/ranks/army/ocdt.png"
  },
  {
    id: 10,
    rank: "Second Lieutenant",
    description: "Junior officer completing initial training",
    fact: "The single pip (star) dates back to the British Army system and represents their first commission.",
    imageUrl: "/ranks/army/2lt.png"
  },
  {
    id: 11,
    rank: "Lieutenant",
    description: "Platoon commander or specialist officer",
    fact: "Lieutenants typically lead platoons of 30-35 soldiers or serve in specialist roles.",
    imageUrl: "/ranks/army/lt.png"
  },
  {
    id: 12,
    rank: "Captain",
    description: "Company second-in-command or company commander",
    fact: "Captains often command companies of 100-150 soldiers or serve in staff positions.",
    imageUrl: "/ranks/army/capt.png"
  },
  {
    id: 13,
    rank: "Major",
    description: "Senior officer commanding companies or in staff roles",
    fact: "The crown in a Major's insignia represents their senior officer status.",
    imageUrl: "/ranks/army/maj.png"
  },
  {
    id: 14,
    rank: "Lieutenant-Colonel",
    description: "Commanding officer of a battalion",
    fact: "Lieutenant-Colonels typically command units of 400-800 soldiers.",
    imageUrl: "/ranks/army/lcol.png"
  },
  {
    id: 15,
    rank: "Colonel",
    description: "Senior officer commanding formations or bases",
    fact: "The maple leaves in a Colonel's insignia represent their senior command status.",
    imageUrl: "/ranks/army/col.png"
  },
  {
    id: 16,
    rank: "Brigadier-General",
    description: "General officer commanding brigades",
    fact: "The sword and baton in general officer insignia represent their authority to lead in battle.",
    imageUrl: "/ranks/army/bgen.png"
  },
  {
    id: 17,
    rank: "Major-General",
    description: "Senior general officer commanding divisions",
    fact: "Major-Generals often serve as division commanders or in senior staff positions.",
    imageUrl: "/ranks/army/mgen.png"
  },
  {
    id: 18,
    rank: "Lieutenant-General",
    description: "Senior general officer commanding army formations",
    fact: "The Commander of the Canadian Army holds the rank of Lieutenant-General.",
    imageUrl: "/ranks/army/lgen.png"
  },
  {
    id: 19,
    rank: "General",
    description: "Highest army rank in the Canadian Armed Forces",
    fact: "Only one General position exists: the Chief of the Defence Staff, when filled by an army officer.",
    imageUrl: "/ranks/army/gen.png"
  }
];
