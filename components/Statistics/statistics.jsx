import { statsData } from "@/data/landing";

const StatisticsSection = () => {
  return (
    <section className="py-20 bg-indigo-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsData.map((stats,index)=>(
              <div key={index}>
                <div className="text-4xl font-bold text-[#120e40] mb-2">{stats.value}</div>
                <div className="text-gray-600">{stats.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default StatisticsSection