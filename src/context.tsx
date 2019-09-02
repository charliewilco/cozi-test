import * as React from 'react';
import {AsyncStorage} from 'react-native';
export type PetPref = 'cat' | 'dog';

export interface IPet {
  id: number;
  type: PetPref;
  name: string;
  img: string;
  sex: 'M' | 'F' | any;
  age: number;
  profile: string;
}

export const SETTINGS_ENDPOINT: string =
  'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/settings.json';
export const PETS_ENDPOINT: string =
  'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pets.json';

export const DEFAULT_PETS: IPet[] = [
  {
    id: 1001,
    type: 'cat',
    name: 'Patronus',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/patronus.jpg',
    sex: 'M',
    age: 8,
    profile:
      'Patronus is a super chatty cat! He loves to be up high on a shelf or cuddling on the couch. He is a Hemmingway (polydactyl) so he does need a little extra care with nail clipping. He has a beautiful red/brown coat and is on a strict wet food diet.',
  },
  {
    id: 1002,
    type: 'dog',
    name: 'Riley',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/riley.jpg',
    sex: 'M',
    age: 5,
    profile:
      'Despite being 40lbs Riley is a total lap dog and loves to cuddle. He is a Brittany with a lot of energy. He loves running, hiking, camping etc. He is also nose trained and can sniff out just about anything. Never been hunting but his prey instinct is very strong, prob wont be an off-leash dog.',
  },
  {
    id: 1003,
    type: 'cat',
    name: 'Julius',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/julius.JPG',
    sex: 'M',
    age: 3,
    profile:
      'Julius is a beautiful orange tabby. He loves laying in the sun and can usually be found hear a window slowly moving throughout the day to stay in the suns beams. Nothing makes him happier than chasing a bit of string across the floor or running up a wall after a laser pointer',
  },
  {
    id: 1004,
    type: 'dog',
    name: 'Jack',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/jack.jpg',
    sex: 'M',
    age: 5,
    profile:
      'Hiking dog with a penchant for cheese, this formerly rescued dog is happy to follow you on the trail or cuddle on the couch. Loves to chase squirrels and fetch balls and gets along with cats. He prefers not to house with small children or other dogs.',
  },
  {
    id: 1005,
    type: 'cat',
    name: 'Gravy',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/gravy.jpg',
    sex: 'F',
    age: 5,
    profile:
      'Feline conversationalist with a carb addiction seeks talkative housemates to snuggle and sneak her croissants. Good with cat-friendly dogs, but domineering with other cats. Tolerant of well behaved children.',
  },
  {
    id: 1006,
    type: 'dog',
    name: 'Cola',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/cola.jpg',
    sex: 'F',
    age: 11,
    profile:
      "I'm a low-key, even-tempered couch potato who enjoys short walks when it isn't raining, chasing the laser pointer, tattling on the cats, and getting the last bits of yogurt out of an empty container. You would never know I'm considered a senior citizen! I can navigate stairs, but I appreciate a little help getting on and off the couch.",
  },
  {
    id: 1007,
    type: 'cat',
    name: 'Rogue',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/rogue.jpg',
    sex: 'M',
    age: 7,
    profile:
      'Laziest cat on the planet. He will claim all boxes and baskets in your house as his own. Fluffy and cuddly, but only you bribe hime with cat-treats. Indoor cat only, he refuses to go outside. Refuses to drink water unless served in a teacup.',
  },
  {
    id: 1008,
    type: 'cat',
    name: 'Pandemonium',
    img:
      'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/pandemonium.jpg',
    sex: 'M',
    age: 17,
    profile:
      "Geriatric and proud of it. He is very attention-seeking and needs a home that is ready for a cat that likes to be treated like a dog. He won't fetch, but will climb onto your lap (or anyone's lap for that matter) the minute you sit down.  Pet him or suffer the meows. He's needs meds for arthritis.",
  },
  {
    id: 1009,
    type: 'cat',
    name: 'Loki',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/loki.jpg',
    sex: 'M',
    age: 11,
    profile:
      "This cat is a mouser and an alpha. If you have a field, he will be happiest outside during the day, catching all the scurrying things. Gets along with other cats and most dogs, as long as they admit that he is the king of the pride. You can try to adopt him, but really he's the one deciding if you're the one for him.",
  },
  {
    id: 1010,
    type: 'dog',
    name: 'Cricket',
    img: 'https://s3-us-west-2.amazonaws.com/cozi-interview-dev/cricket.jpeg',
    sex: 'F',
    age: 12,
    profile:
      'A sweet old lady, but a total butthead when she wants to be. Trained enough to know better, but rarely acts on her training. Not very good with little kids, big kids, or other animals. Very demanding of belly rubs. Just kidding, not for adoption.',
  },
];

export interface ISettings {
  id: number;
  profile: string;
  typePreference: PetPref;
  ageRange: {
    min: number;
    max: number;
  };
}

interface IState<T> {
  cachedPets: T[];
  petsFetched: boolean;
  settingsFetched: boolean;
  pets: T[];
  saved: T[];
  disliked?: T[];
  currentPet: T | null;
  settings: ISettings;
}

// #region

export enum Actions {
  INITIALIZE_SETTINGS = 'INITIALIZE_SETTINGS',
  INITIALIZE_SAVED_FROM_LOCAL = 'INITIALIZE_SAVED_FROM_LOCAL',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  FETCHED_PETS = 'FETCHED_PETS',
  UNINTERESTED = 'UNINTERESTED',
  ADD_SAVED_PET = 'ADD_SAVED_PET',
  REMOVE_SAVED_PET = 'REMOVE_SAVED_PET',
  SET_CURRENT_PET = 'SET_CURRENT_PET',
}

interface IAction<T> {
  type: Actions;
  payload?: {
    settings?: Partial<ISettings> | ISettings;
    selectedPet?: IPet;
    saved?: T[];
  };
}

function addSavedPet<T>(state: IState<T>, selected: T): IState<T> {
  const mutableState = Object.assign({}, state);
  const petID = mutableState.pets.findIndex(pet => pet === selected);
  const saved: T[] = state.saved;

  mutableState.pets.splice(petID, 1);

  if (!state.saved.find(pet => pet === selected)) {
    saved.unshift(selected);
  }

  return {
    ...state,
    pets: mutableState.pets,
    saved,
  };
}

function removeSavedPet<T>(state: IState<T>, selected: T) {
  const mutableState = Object.assign({}, state);
  const petID = mutableState.saved.findIndex(item => item === selected);

  mutableState.saved.splice(petID, 1);

  mutableState.pets.push(selected);

  return {
    ...state,
    saved: mutableState.saved,
    pets: mutableState.pets,
  };
}

function removePetFromFeed<T>(state: IState<T>, selected: T) {
  const mutableState = Object.assign({}, state);
  const petID = mutableState.pets.findIndex(pet => pet === selected);

  mutableState.pets.splice(petID, 1);

  return {
    ...state,
    pets: mutableState.pets,
  };
}

function filterPets<T>(state: IState<T>): IState<T> {
  const pets = state.cachedPets.filter(
    pet =>
      pet.type === state.settings.typePreference &&
      pet.age > state.settings.ageRange.min &&
      pet.age < state.settings.ageRange.max,
  );

  state.saved.forEach(saved => {
    const index = pets.findIndex(pet => pet.id === saved.id);

    if (index > -1) {
      pets.splice(index, 1);
    }
  });

  return {
    ...state,
    pets,
    petsFetched: true,
  };
}

function getLocalPets<T>(state: IState<T>, locallySaved: T[]): IState<T> {
  const set = new Set([...locallySaved, ...state.saved]);

  let saved = Array.from(set);

  return {
    ...state,
    saved,
  };
}

function reducer(state: IState<IPet>, action: IAction<IPet>): IState<IPet> {
  switch (action.type) {
    case Actions.INITIALIZE_SETTINGS:
    case Actions.UPDATE_SETTINGS:
      return Object.assign({}, state, action.payload, {
        settingsFetched: true,
      });
    case Actions.INITIALIZE_SAVED_FROM_LOCAL:
      return getLocalPets(state, action.payload!.saved!);
    case Actions.REMOVE_SAVED_PET:
      return removeSavedPet(state, action.payload!.selectedPet!);
    case Actions.ADD_SAVED_PET:
      return addSavedPet(state, action.payload!.selectedPet!);
    case Actions.UNINTERESTED:
      return removePetFromFeed(state, action.payload!.selectedPet!);
    case Actions.FETCHED_PETS:
      return filterPets(state);
    case Actions.SET_CURRENT_PET:
      return {...state, currentPet: action.payload!.selectedPet!};
    default:
      throw new Error('Must provide and action type');
  }
}

// #endregion

interface IContextActions {
  onFilterPets(): void;
  onRemoveSavedPet(pet: IPet): void;
  onSavePet(pet: IPet): void;
  onUninterested(pet: IPet): void;
  onUpdateSettings(settings: Partial<ISettings>): void;
  onGetPetDetails(pet: IPet | null): void;
}

const AppStateContext = React.createContext<[IState<IPet>, IContextActions]>([
  {},
  {},
] as [IState<IPet>, IContextActions]);

export function useAppState() {
  return React.useContext(AppStateContext);
}

export function StateProvider(props: React.PropsWithChildren<{}>): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, {
    cachedPets: DEFAULT_PETS,
    settingsFetched: false,
    petsFetched: false,
    currentPet: null,
    pets: [],
    saved: [],
    settings: {
      id: 0,
      profile: '',
      typePreference: 'cat' as PetPref,
      ageRange: {
        min: 0,
        max: 0,
      },
    },
  });

  function onUpdateSettings(settings: Partial<ISettings>): void {
    dispatch({type: Actions.UPDATE_SETTINGS, payload: {settings}});
    dispatch({type: Actions.FETCHED_PETS});
  }

  function onSavePet(selectedPet: IPet): void {
    dispatch({type: Actions.ADD_SAVED_PET, payload: {selectedPet}});
  }

  function onFilterPets(): void {
    dispatch({type: Actions.FETCHED_PETS});
  }

  function onUninterested(selectedPet: IPet): void {
    dispatch({type: Actions.UNINTERESTED, payload: {selectedPet}});
  }

  function onRemoveSavedPet(selectedPet: IPet): void {
    dispatch({
      type: Actions.REMOVE_SAVED_PET,
      payload: {selectedPet},
    });
  }

  function onGetPetDetails(selectedPet: IPet | null): void {
    dispatch({
      type: Actions.SET_CURRENT_PET,
      payload: {selectedPet: selectedPet as IPet},
    });
  }

  React.useEffect(function() {
    fetch(SETTINGS_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(onUpdateSettings);
  }, []);

  React.useEffect(function() {
    AsyncStorage.getItem('COZIPETSSAVED').then(value => {
      if (value) {
        const local: {saved: IPet[]} = JSON.parse(value);
        dispatch({
          type: Actions.INITIALIZE_SAVED_FROM_LOCAL,
          payload: {
            saved: local.saved,
          },
        });
      }
    });
  }, []);

  React.useEffect(
    function() {
      AsyncStorage.setItem(
        'COZIPETSSAVED',
        JSON.stringify({
          saved: state.saved,
        }),
      );
    },
    [state.saved.length],
  );

  return (
    <AppStateContext.Provider
      value={[
        state,
        {
          onRemoveSavedPet,
          onFilterPets,
          onUpdateSettings,
          onSavePet,
          onUninterested,
          onGetPetDetails,
        },
      ]}>
      {props.children}
    </AppStateContext.Provider>
  );
}
