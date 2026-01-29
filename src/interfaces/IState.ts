import type { IAuthModalState } from "./IAuthModal";
import type { ICategories } from "./ICategory";
import type { INavbar } from "./INavbar";
import type { ISidebar } from "./ISidebar";
import type { IUserState } from "./IUser";

export interface IState{
    sidebar: ISidebar,
    categories: ICategories,
    user: IUserState,
    authModal: IAuthModalState,
    navbar: INavbar
}