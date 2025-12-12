// "use client";

// import { createContext, useContext } from "react";
// import { User, UserRole } from "../types/user";
// import { useGetUsers } from "../hooks/use-get-users";

// interface UserContextType {
//   users: User[];
//   page: number;
//   limit: number;
//   search: string;
//   role: UserRole;
//   totalPages: number;
//   isLoading: boolean;
//   hasMore: boolean;

//   setPage: (p: number) => void;
//   setSearch: (v: string) => void;
//   setRole: (r: UserRole) => void;
//   loadMore: () => void;
//   reload: () => void;
// }

// const UserContext = createContext<UserContextType | null>(null);

// export const GetUserProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const {
//     users,
//     isLoading,
//     hasMore,
//     totalPages,
//     role,
//     search,
//     page,
//     setSearch,
//     setRole,
//     setPage,
//     loadMore,
//     reload,
//   } = useGetUsers(10, "distributor");

//   return (
//     <UserContext.Provider
//       value={{
//         users,
//         page,
//         limit: 10,
//         search,
//         role,
//         totalPages,
//         isLoading,
//         hasMore,
//         setPage,
//         setSearch,
//         setRole,
//         loadMore,
//         reload,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// export function useUserContext() {
//   const ctx = useContext(UserContext);
//   if (!ctx) throw new Error("GetUserProvider belum dipasang");
//   return ctx;
// }
