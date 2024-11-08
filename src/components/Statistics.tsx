import React from 'react';
import Brandrecognition from '@/assets/icon-brand-recognition.svg';
import Detailedrecords from '@/assets/icon-detailed-records.svg';
import Fullycustomizable from '@/assets/icon-fully-customizable.svg';

interface StatisticCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gridArea: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ title, description, icon, gridArea }) => {
  return (
    <div className={`relative flex flex-col  bg-white p-5 rounded shadow  w-full ${gridArea}`}>
      <div className="text-teal-500 text-3xl bg-Dark_Violet rounded-full p-4  mb-5 absolute top-0 transform -translate-y-1/2">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 pt-5 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Statistics: React.FC = () => {
  const statsData = [
    {
      title: 'Brand Recognition',
      description: 'Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instill confidence in your content.',
      icon: <img /* Brand recognition icon SVG */ src={Brandrecognition} alt=""/>,
      gridArea: 'areaA',
    },
    {
      title: 'Detailed Records',
      description: 'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
      icon: <img /* Records icon SVG */ src={Detailedrecords} alt=""/>,
      gridArea: 'areaB',
    },
    {
      title: 'Fully Customizable',
      description: 'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
      icon: <img /* Customizable icon SVG */ src={Fullycustomizable} alt="" />,
      gridArea: 'areaC',
    },
  ];

  return (
    <div className=" w-full ">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Advanced Statistics</h2>
        <p className="text-gray-600 mt-4">Track how your links are performing across the web with our advanced statistics dashboard.</p>
      </div>
      <div className="staggered flex flex-col  justify-center gap-5 p-6 blueStrip ">
        {statsData.map((stat, index) => (
          <StatisticCard
            key={index}
            title={stat.title}
            description={stat.description}
            icon={stat.icon}
            gridArea={stat.gridArea}
          />
        ))}
      </div>
    </div>
  );
};

export default Statistics;
