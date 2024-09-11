import Link from 'next/link';

const NavigateButton = ({ to }: { to: string }) => {
  const capitalizedText = to.charAt(0).toUpperCase() + to.slice(1);

  return (
    <div className='w-36 h-12 my-10 bg-gray-800 border-2 border-gray-600 flex justify-center items-center rounded-lg transition-all hover:bg-gray-700 hover:border-blue-500 hover:shadow-lg'>
      <Link href={to} className='text-white text-lg font-semibold'>
        {capitalizedText}
      </Link>
    </div>
  );
};

export default NavigateButton;
