import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-10 text-white text-center">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <p className="text-2xl font-bold text-bea-tek-magenta mb-2">
            BEA-<span className="inline-block h-3 w-6 bg-bea-tek-magenta align-middle -mt-1 mx-1"></span>TEK
          </p>
          <p className="text-md text-white">Music & Events</p>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-gray-400 hover:text-bea-tek-magenta transition duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* Facebook Icon */}
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.505 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-bea-tek-magenta transition duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* Instagram Icon */}
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344a2.77 2.77 0 00-1.01.578 2.77 2.77 0 00-.578 1.01c-.137.353-.299.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857a2.77 2.77 0 00.578 1.01 2.77 2.77 0 001.01.578c.353.137.882.299 1.857.344 1.023.047 1.351.058 3.807.058h.468c2.456 0 2.784-.011 3.807-.058.975-.045 1.504-.207 1.857-.344a2.77 2.77 0 001.01-.578 2.77 2.77 0 00.578-1.01c.137-.353.299-.882.344-1.857.047-1.023.058-1.351.058-3.807v-.468c0-2.456-.011-2.784-.058-3.807-.045-.975-.207-1.504-.344-1.857a2.77 2.77 0 00-.578-1.01 2.77 2.77 0 00-1.01-.578c-.353-.137-.882-.299-1.857-.344C14.766 2.013 14.439 2 11.984 2h-.468zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-bea-tek-magenta transition duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* YouTube Icon */}
              <path d="M19.615 3.184c-1.404-.367-2.79-.583-4.185-.75L14 2H10c-.585.167-1.78.383-4.185.75C4.39 3.551 2.923 4.945 2.19 7.02c-.733 2.075-.733 4.15 0 6.225.733 2.075 2.2 3.469 3.62 3.836C7.21 17.583 8.6 17.799 10 18h4c1.4-.201 2.785-.417 4.185-.75 1.42-.367 2.887-1.761 3.62-3.836.733-2.075.733-4.15 0-6.225-.733-2.075-2.2-3.469-3.62-3.836zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
            </svg>
          </a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BEA-TEK Music & Events — DJ & producteur musical. Fait avec passion à Montréal. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;