
const Footer = () => {
  return (
    <div className="flex justify-center w-full h-10 mt-10 bg-pink-200 bottom-0 items-center gap-1">
      Hosted by 

      <a 
        href="https://vercel.com/tr-04s-projects"
        target="_blank"
        className="text-sm text-purple-500">Vercel,
      </a>

      made by

      <a 
        href="https://github.com/TR-04" 
        target="_blank" 
        className="text-blue-500"
      >
        TR-04
      </a>
    </div>
  );
}

export default Footer