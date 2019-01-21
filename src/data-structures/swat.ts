export type Definition = Record<'key' | 'label', string>;

export const Armors: Array<Definition> = [
  {
    key: 'light',
    label: 'Compact',
  },
  {
    key: 'medium',
    label: 'Standard',
  },
  {
    key: 'heavy',
    label: 'Large',
  },
  {
    key: 'advanced',
    label: 'Advanced',
  },
];
export const Classes: Array<Definition> = [
  {
    key: 'sniper',
    label: 'Covert Sniper',
  },
  {
    key: 'medic',
    label: 'Field Medic',
  },
  {
    key: 'tactician',
    label: 'Tactician',
  },
  {
    key: 'psychologist',
    label: 'Psychologist',
  },
  {
    key: 'maverick',
    label: 'Maverick',
  },
  {
    key: 'ho',
    label: 'Heavy Ordance',
  },
  {
    key: 'demo',
    label: 'Demolitions',
  },
  {
    key: 'cyborg',
    label: 'Cyborg',
  },
  {
    key: 'pyrotechnician',
    label: 'Pyrotechnician',
  },
  {
    key: 'watchman',
    label: 'Watchman',
  },
];
export const Difficulties: Array<Definition> = [
  {
    key: 'defense',
    label: 'Defense',
  },
  {
    key: 'normal',
    label: 'Normal',
  },
  {
    key: 'hard',
    label: 'Hard',
  },
  {
    key: 'insane',
    label: 'Insane',
  },
  {
    key: 'pin',
    label: 'Perfect Insane',
  },
  {
    key: 'nightmare',
    label: 'Nightmare',
  },
  {
    key: 'extinction',
    label: 'Extinction',
  },
];
export const Specializations: Array<Definition> = [
  {
    key: 'weaponry',
    label: 'Weaponry',
  },
  {
    key: 'power_armor',
    label: 'Power Armor',
  },
  {
    key: 'energy_cells',
    label: 'Energy Cells',
  },
  {
    key: 'cybernetics',
    label: 'Cybernetics',
  },
  {
    key: 'triage',
    label: 'Triage',
  },
  {
    key: 'chemistry',
    label: 'Chemistry',
  },
  {
    key: 'leadership',
    label: 'Leadership',
  },
  {
    key: 'pack_rat',
    label: 'Pack Rat',
  },
  {
    key: 'espionage',
    label: 'Espionage',
  },
];
export const Talents: Array<Definition> = [
  {
    key: 'wiring',
    label: 'Wiring',
  },
  {
    key: 'running',
    label: 'Running',
  },
  {
    key: 'spotting',
    label: 'Spotting',
  },
  {
    key: 'toughness',
    label: 'Toughness',
  },
  {
    key: 'tinkering',
    label: 'Tinkering',
  },
  {
    key: 'hacking',
    label: 'Hacking',
  },
  {
    key: 'courage',
    label: 'Courage',
  },
];
export const Traits: Array<Definition> = [
  {
    key: 'skilled',
    label: 'Skilled',
  },
  {
    key: 'gifted',
    label: 'Gifted',
  },
  {
    key: 'survivalist',
    label: 'Survivalist',
  },
  {
    key: 'dragoon',
    label: 'Dragoon',
  },
  {
    key: 'acrobat',
    label: 'Acrobat',
  },
  {
    key: 'swift_learner',
    label: 'Swift Learner',
  },
  {
    key: 'healer',
    label: 'Healer',
  },
  {
    key: 'flower_child',
    label: 'Flower Child',
  },
  {
    key: 'chem_reliant',
    label: 'Chem. Reliant',
  },
  {
    key: 'rad_resistant',
    label: 'Rad. Resistant',
  },
  {
    key: 'gadgeteer',
    label: 'Gadgeteer',
  },
  {
    key: 'prowler',
    label: 'Powler',
  },
  {
    key: 'energizer',
    label: 'Energizer',
  },
  {
    key: 'reckless',
    label: 'Reckless',
  },
  {
    key: 'engineer',
    label: 'Engineer',
  },
];
export const Weapons: Array<Definition> = [
  {
    key: 'assault_rifle',
    label: 'Assault Rifle',
  },
  {
    key: 'sniper_rifle',
    label: 'Sniper Rifle',
  },
  {
    key: 'chaingun',
    label: 'Chaingun',
  },
  {
    key: 'rocket_launcher',
    label: 'Rocket Launcher',
  },
  {
    key: 'flamethrower',
    label: 'Flamethrower',
  },
  {
    key: 'laser_rifle',
    label: 'Laser Rifle',
  },
];

export interface CharacterBuild {
  armor: string;
  class: string;
  rank: number;
  rankXP: number;
  slot: number;
  spec: string;
  talent: string;
  trait: string;
  weapon: string;
}
export interface Achievement {
  name: string;
  rank: number;
}