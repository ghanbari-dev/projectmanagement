import type { NextPage } from "next";
import LineChartComponent from "../components/charts/LineChartComponent";
import StackedBar from "../components/charts/StackedBar";

const Home: NextPage = () => {
  return <div>
    <div className="flex flex-wrap gap-10 justify-center">
        <div className="bg-white m-3 p-4 rounded-2xl md:w-780">
          <div>text</div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center">
            <div className="h-[360px] w-80 bg-white">
              <LineChartComponent />
            </div>
            <div className="h-[360px] w-80 bg-white">
              <StackedBar />
            </div>
          </div>
        </div>
      </div>
  </div>;
};

export default Home;
