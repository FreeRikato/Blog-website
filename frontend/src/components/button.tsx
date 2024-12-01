export const Button = ({ label, functionality }: any) => {
  return (
    <>
      <button onClick={functionality}>{label}</button>
    </>
  );
};
