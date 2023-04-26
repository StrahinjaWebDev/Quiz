export default interface IInputProps {
  primary?: boolean;
  placeholder?: string;
}

export default interface IButtonProps {
  label?: string;
  primary?: boolean;
  secondary?: boolean;
}

export default interface INavbar {
  showMailIcon?: boolean;
}
export default interface ICard {
  images?: string;
  quizMainText?: string;
  quizDescription?: string;
  imgAlt?: string;
}
export default interface IAdminMainComponent {
  text?: string;
  ActivateDeactivateBtn?: boolean;
  onClick?: () => void;
}
