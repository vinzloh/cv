export enum ButtonType {
  Primary,
  Default,
}

const Styles = {
  [ButtonType.Primary]: "bg-blue-500 text-white",
  [ButtonType.Default]: "text-gray-500 bg-blue-100",
};

const Button = ({ type = ButtonType.Default, ...props }) => (
  <button className={`${Styles[type]} px-4 py-2 rounded`} {...props} />
);

export default Button;
