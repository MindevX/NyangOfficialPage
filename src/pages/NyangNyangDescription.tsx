import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import {
  ArrowDownTrayIcon,
  SparklesIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDown,
  ChevronUp,
  Gamepad2,
  Heart,
  Trophy,
  Users,
  Coins,
  ArrowRight,
} from "lucide-react";

interface NewsItem {
  id: number;
  t: {
    ko: string;
    en: string;
  };
  c: {
    ko: string;
    en: string;
  };
  d: string;
  g: string;
}


const dailyRewardData = [
  { category: "Coin", detail: "100", probability: "43.5" },
  { category: "Coin", detail: "1500", probability: "3" },
  { category: "Affection", detail: "0.0001", probability: "39" },
  { category: "Affection", detail: "0.002", probability: "1" },
  { category: "Crystal", detail: "1", probability: "3.5" },
  { category: "MegaBox", detail: "1", probability: "5" },
  { category: "NyangDrop", detail: "1", probability: "5" },
];

const megaBoxData = [
  {
    category: "Reward Count",
    detail: "7~15개 보상 랜덤 획득(각각의 보상 수)의 확률",
    probability:"각각 11.11",
  },
  { category: "Coin", detail: "100 코인", probability: "68.0" },
  { category: "Coin", detail: "500 코인", probability: "7.0" },
  { category: "Coin", detail: "1000 코인", probability: "2.5" },
  { category: "Affection", detail: "0.00001 호감도", probability: "1.0" },
  { category: "Affection", detail: "0.00004 호감도", probability: "0.1" },
  { category: "Crystal", detail: "크리스탈 5", probability: "14.0" },
  {
    category: "Table",
    detail: "새로운 테이블 (중복시 1000코인)",
    probability: "0.5",
  },
  { category: "Customer", detail: "손님 1~2명", probability: "3.0" },
  {
    category: "Ingredient",
    detail: "각종 식재료 (토마토 등)",
    probability: "3.9",
  },
];

const nyangDropData = [
  {
    category: "Rare(클릭당)",
    detail: "Common",
    probability: "74.5",
  },
  {
    category: "Rare(클릭당)",
    detail: "Rare",
    probability: "14.5",
  },
  {
    category: "Rare(클릭당)",
    detail: "Unique",
    probability: "5.0",
  },
  {
    category: "Rare(클릭당)",
    detail: "Mythic",
    probability: "3.0",
  },
  {
    category: "Rare(클릭당)",
    detail: "Legendary",
    probability: "1.4",
  },
  {
    category: "Rare(클릭당)",
    detail: "Ultra",
    probability: "1.0",
  },
  {
    category: "Rare(클릭당)",
    detail: "GOD",
    probability: "0.6",
  },
  {
    category: "Split(클릭당)",
    detail: "One",
    probability: "85.0",
  },
  {
    category: "Split(클릭당)",
    detail: "Two",
    probability: "9.0",
  },
  {
    category: "Split(클릭당)",
    detail: "Four",
    probability: "4.0",
  },
  {
    category: "Split(클릭당)",
    detail: "Eight",
    probability: "2.0",
  },
  { category: "Common", detail: "100 코인", probability: "75.0" },
  { category: "Common", detail: "0.00001 호감도", probability: "25.0" },
  { category: "Rare", detail: "200 코인", probability: "65.0" },
  { category: "Rare", detail: "0.00005 호감도", probability: "35.0" },
  { category: "Unique", detail: "300 코인", probability: "45.0" },
  { category: "Unique", detail: "0.0001 호감도", probability: "25.0" },
  { category: "Unique", detail: "600 코인", probability: "25.0" },
  { category: "Unique", detail: "3 크리스탈", probability: "5.0" },
  { category: "Mythic", detail: "750 코인", probability: "55.0" },
  { category: "Mythic", detail: "0.0003 호감도", probability: "15.0" },
  { category: "Mythic", detail: "1300 코인", probability: "15.0" },
  { category: "Mythic", detail: "5 크리스탈", probability: "15.0" },
  { category: "Legendary", detail: "2000 코인", probability: "70.0" },
  { category: "Legendary", detail: "0.0005 호감도", probability: "20.0" },
  {
    category: "Legendary",
    detail: "새로운 테이블",
    probability: "1.0",
  },
  { category: "Legendary", detail: "10 크리스탈", probability: "9.0" },
  { category: "Ultra", detail: "2300 코인", probability: "80.0" },
  { category: "Ultra", detail: "0.001 호감도", probability: "5.0" },
  { category: "Ultra", detail: "25 크리스탈", probability: "5.0" },
  { category: "Ultra", detail: "메가 박스", probability: "7.0" },
  { category: "Ultra", detail: "새로운 테이블", probability: "3.0" },


  { category: "GOD", detail: "메가 박스", probability: "15.0" },
  { category: "GOD", detail: "6000 코인", probability: "40.0" },
  { category: "GOD", detail: "0.05 호감도", probability: "30.0" },
  { category: "GOD", detail: "50 크리스탈", probability: "8.0" },
  { category: "GOD", detail: "새로운 테이블", probability: "7.0" },
];


const ProbabilityTable: React.FC<{
  title: string;
  data: any[];
  onItemClick?: (item: any) => void;
}> = ({ title, data, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const groupedData: { [key: string]: any[] } = data.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {} as { [key: string]: any[] });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Coin":
        return <Coins className="w-4 h-4 text-amber-500" />;
      case "Affection":
        return <Heart className="w-4 h-4 text-rose-500" />;
      case "Customer":
        return <Users className="w-4 h-4 text-sky-500" />;
      case "MegaBox":
        return <Trophy className="w-4 h-4 text-purple-500" />;
      case "Ingredient":
        return <Gamepad2 className="w-4 h-4 text-emerald-500" />;
      default:
        return <SparklesIcon className="w-4 h-4 text-indigo-500" />;
    }
  };

  return (
    <div className="mb-6 overflow-hidden transition-all duration-300 border border-gray-200 shadow-sm dark:border-white/10 rounded-2xl bg-white/70 dark:bg-slate-900/50 backdrop-blur-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg dark:bg-indigo-900/30">
            <ChartBarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <span className="font-bold text-gray-800 dark:text-gray-100">
            {title}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="text-gray-400" />
        ) : (
          <ChevronDown className="text-gray-400" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
          isOpen ? "" : "max-h-0"
        }`}
      >
        <div className="p-4 overflow-x-auto border-t border-gray-100 dark:border-white/5">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-100 dark:border-white/5">
                <th className="px-4 py-3 font-medium text-left">종류</th>
                <th className="px-4 py-3 font-medium text-left">세부 보상</th>
                <th className="px-4 py-3 font-medium text-right">확률</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {Object.entries(groupedData).map(([category, items]) =>
                items.map((item, index) => (
                  <tr
                    key={`${category}-${index}`}
                    onClick={() =>
                      item.category === "MegaBox" && onItemClick?.(item)
                    }
                    className={`group transition-colors hover:bg-indigo-50/30 dark:hover:bg-indigo-500/5 ${
                      item.category === "MegaBox" ? "cursor-pointer" : ""
                    }`}
                  >
                    {index === 0 && (
                      <td
                        className="px-4 py-3 font-bold text-gray-700 dark:text-gray-200"
                        rowSpan={items.length}
                      >
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          {category}
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {item.detail}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="px-2 py-0.5 font-mono text-xs font-bold text-indigo-600 bg-indigo-50 rounded-md dark:bg-indigo-500/10 dark:text-indigo-400">
                        {item.probability}%
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NyangNyangDescription = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProbability, setShowProbability] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const startDate = new Date(2025, 0, 25);
    if (new Date() >= startDate) setShowProbability(true);

    fetch(`${process.env.PUBLIC_URL}/news.json`)
      .then((res) => res.json())
      .then((data) => {
        setNews(
          data.newsList
            .filter((n: NewsItem) => n.g === "nyangnyang")
            .slice(0, 5)
        );
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="🎁 메가박스 상세 정보"
      >
        <div className="space-y-4">
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            메가박스는 일일 보상에서{" "}
            <span className="font-bold text-indigo-500">6.5%</span>의 확률로
            등장하는 최상급 보상입니다.
          </p>
          <div className="p-4 border border-indigo-100 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 dark:border-indigo-500/20">
            <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
              💡 한 번의 개봉으로 최소 7개에서 최대 15개의 보상이 쏟아집니다!
              식당 성장을 위한 필수 아이템들을 획득해 보세요.
            </p>
          </div>
        </div>
      </Modal>

      <div className="px-4 sm:px-6 lg:px-8 pb-24 mx-auto space-y-16 md:space-y-24 max-w-7xl animate-fade-in-up">
        {/* Hero Section */}
        <div className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600 p-1 px-1 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/20">
          <div className="relative bg-white dark:bg-slate-950 rounded-[2.4rem] p-10 md:p-16 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute w-64 h-64 rounded-full -top-24 -right-24 bg-rose-500/10 blur-3xl animate-pulse" />
            <div className="absolute w-64 h-64 rounded-full -bottom-24 -left-24 bg-indigo-500/10 blur-3xl animate-pulse" />

            <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-6 text-7xl animate-float">🐾</div>
              <h1 className="mb-4 text-5xl font-black tracking-tighter text-transparent md:text-7xl bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text">
                냥냥식당타이쿤
              </h1>
              <p className="max-w-2xl mb-8 text-lg font-light leading-relaxed text-gray-500 md:text-xl dark:text-gray-400">
                지친 일상 속, 고양이들이 운영하는 작은 식당의 주인이 되어보세요.{" "}
                <br className="hidden md:block" />
                맛있는 요리와 따뜻한 인테리어로 최고의 힐링 공간을 만듭니다.
                <br className="hidden md:block" />
                지원 대상: android
                <br/>
                지원 예정 대상: pc
              </p>
              <div className="flex flex-col justify-center w-full gap-4 sm:flex-row">
                <a
                  href="https://kjh12.itch.io/nyangrestauranttycoon"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 bg-indigo-600 shadow-lg shadow-indigo-500/20 dark:bg-indigo-500 rounded-2xl hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:scale-105 active:scale-95"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  지금 무료 다운로드
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Main Content */}
          <div className="space-y-12 lg:col-span-8">
            {/* Intro Card */}
            <section className="p-8 bg-white border border-gray-100 shadow-xl dark:bg-slate-900/70 rounded-3xl dark:border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl text-rose-600">
                  <Gamepad2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase dark:text-white">
                  Game Introduction
                </h2>
              </div>

              <p className="mb-8 text-lg font-light leading-relaxed text-gray-600 dark:text-gray-400">
                냥냥식당타이쿤은 단순한 경영 게임을 넘어, 고양이 손님들과의
                교감을 중시합니다. 재료를 직접 수급하고, 레시피를 연구하며,
                식당의 평판을 높여 전 세계 고양이들이 찾아오는 명소로 만드세요.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: "😺",
                    label: "매력적인 캐릭터",
                    desc: "각기 다른 스토리",
                  },
                  { icon: "🍳", label: "전략적 경영", desc: "수십가지 레시피" },
                  {
                    icon: "🎨",
                    label: "커스텀 디자인",
                    desc: "다양한 테마 가구",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-6 transition-all duration-300 border border-gray-100 rounded-2xl bg-slate-50 dark:bg-slate-900/50 dark:border-white/10 hover:shadow-lg hover:border-indigo-500/20 hover:-translate-y-1"
                  >
                    <div className="mb-3 text-3xl">{item.icon}</div>
                    <div className="mb-1 font-bold text-gray-800 dark:text-white">
                      {item.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Probability Tables */}
            {showProbability && (
              <section className="animate-fade-in-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl text-amber-600">
                    <SparklesIcon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-gray-900 uppercase dark:text-white">
                    Probabilities
                  </h2>
                </div>
                <ProbabilityTable
                  title="일일 접속 보상 구성"
                  data={dailyRewardData}
                  onItemClick={() => setIsModalOpen(true)}
                />
                <ProbabilityTable
                  title="메가박스 구성 아이템"
                  data={megaBoxData}
                />
                <ProbabilityTable
                  title="냥냥드롭 구성 아이템"
                  data={nyangDropData}
                />
                <br />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:col-span-4">
            <div className="sticky top-24">
              {/* Sidebar News */}
              <div className="p-6 bg-white border border-gray-100 shadow-xl dark:bg-slate-900/70 rounded-3xl dark:border-white/5 backdrop-blur-md">
                <h3 className="flex items-center gap-3 mb-6 text-xl font-black text-gray-900 dark:text-white">
                  <SparklesIcon className="w-5 h-5 text-amber-500" />
                  최신 소식
                </h3>
                <div className="space-y-4">
                  {loading ? (
                    <div className="h-40 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
                  ) : (
                    news.map((item) => (
                      <a
                        key={item.id}
                        href={`#/news?id=${item.id}`}
                        className="block p-4 transition-all duration-300 border border-transparent rounded-2xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white hover:shadow-md hover:border-indigo-100 dark:hover:bg-slate-800 dark:hover:border-indigo-500/20 group"
                      >
                        <div className="mb-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                          {item.d}
                        </div>
                        <h4 className="font-bold text-gray-800 transition-colors dark:text-gray-200 group-hover:text-indigo-600 line-clamp-1">
                          {item.t.ko}
                        </h4>
                        <div className="flex items-center gap-1 mt-2 text-xs font-bold text-gray-400 group-hover:text-indigo-500">
                          READ MORE <ArrowRight className="w-3 h-3" />
                        </div>
                      </a>
                    ))
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default NyangNyangDescription;
