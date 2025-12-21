type Section = 'login' | 'signup' | 'recovery';

export interface IAuthModalState {
  isOpen: boolean;
  section: Section;
}