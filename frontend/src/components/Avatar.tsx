export const Avatar = ({ Name }: { Name: String }) => {
  return (
    <>
      <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {Name[0]}
        </span>
      </div>
    </>
  );
};
