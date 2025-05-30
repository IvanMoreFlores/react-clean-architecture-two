import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthStore = {
  user: string;
  setUser: (user: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: "",
        setUser: (user: string) => set({ user }),
      }),
      {
        name: "auth",
      }
    )
  )
);

// type JungleStore = {
//   bears: number;
//   addBear: () => void;
//   fishes: number;
//   addFish: () => void;
// };

// const useJungleStore = create<JungleStore>()(
//   devtools(
//     persist(
//       (set) => ({
//         bears: 0,
//         addBear: () =>
//           set(
//             (state) => ({ bears: state.bears + 1 }),
//             undefined,
//             "jungle/addBear"
//           ),
//         fishes: 0,
//         addFish: () =>
//           set(
//             (state) => ({ fishes: state.fishes + 1 }),
//             undefined,
//             "jungle/addFish"
//           ),
//       }),
//       {
//         name: "jungle",
//       }
//     )
//   )
// );

// export default useJungleStore;
