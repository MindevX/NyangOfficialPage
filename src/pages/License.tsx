import React, { useState, useEffect } from "react";

interface LicenseItem {
  name: string;
  path: string;
}

const LicenseViewer: React.FC<{ item: LicenseItem }> = ({ item }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch(item.path)
      .then((res) => res.text())
      .then((data) => setText(data))
      .catch((e) =>
        console.error(`Failed to load license for ${item.name}:`, e)
      );
  }, [item.path, item.name]);

  return (
    <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">
        {item.name}
      </h2>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <div className="h-96 overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          <pre className="whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 bg-transparent p-0 border-none my-0">
            {text || "라이선스 정보를 불러오는 중입니다..."}
          </pre>
        </div>
      </div>
    </div>
  );
};

const License: React.FC = () => {
  // 라이선스 목록을 여기서 설정하세요.
  const licenseList: LicenseItem[] = [
    {
      name: "Noto Sans KR",
      path: `${process.env.PUBLIC_URL}/license/font-kr.txt`,
    },
    {
      name: "SQLite4Unity3d",
      path: `${process.env.PUBLIC_URL}/license/sqlite.txt`,
    },
    {
      name: "Chaos.NaCl",
      path: `${process.env.PUBLIC_URL}/license/Chaos.NaCl.txt`,
    },
    // 예시: 폰트 라이선스 추가
    // {
    //   name: "Noto Sans KR",
    //   path: `${process.env.PUBLIC_URL}/licenses/noto_sans_kr.txt`,
    // },
  ];

  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl">
      <h1 className="text-4xl font-black mb-8 text-center text-slate-900 dark:text-white tracking-tight">
        라이선스 정보
      </h1>
      <div className="space-y-8">
        {licenseList.map((item, index) => (
          <LicenseViewer key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default License;