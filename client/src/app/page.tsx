"use client";

import { useEffect, useState } from "react";

type MealType = "朝食" | "昼食" | "夕食" | "夜食";

function getMealType(date: Date): MealType {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "朝食";
  if (hour >= 12 && hour < 18) return "昼食";
  if (hour >= 18 && hour < 21) return "夕食";
  return "夜食";
}

function getComment(meal: MealType): string {
  const comments: Record<MealType, string[]> = {
    "朝食": [
      "この時間に起きてるのは偉すぎる。飯を食って良い。",
      "朝起きると一日が長く感じるよな。",
      "朝飯食べると昼飯いらない気がする。わからん？"
    ],
    "昼食": [
      "生命の源。ここの質が一日の質を決める。",
      "昼はあげもの。やうやう白く炊きゆく米ぎは……",
      "昼寝をすると一日を消費してしまうのでなんでもいいから動け。"
    ],
    "夕食": [
      "食わなくても耐える。食った方が幸せ。1マス進む。",
      "どうせ使わないのでエネルギー量より味を重視すべき。",
      "小学生のころは毎日夕食が何かと考えるだけで楽しかったものだが。"
    ],
    "夜食": [
      "今食べるくらいなら明日早起きして朝食を食べましょう。10点減点。",
      "夏は夜。だが夏の夜食ほど太るものもない。20点減点。",
      "金。夜食は金がかかる。貴族にでもなったつもりか？ 振り出しにもどる。"
    ]
  };
  const list = comments[meal];
  return list[Math.floor(Math.random() * list.length)];
}

export default function HomePage() {
  const [now, setNow] = useState<Date | null>(null);
  const [meal, setMeal] = useState<MealType | null>(null);

  useEffect(() => {
    const d = new Date();
    setNow(d);
    setMeal(getMealType(d));
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString =
    now &&
    new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(now);

  return (
    <main className="min-h-screen w-full flex flex-col items-center pt-20">
      
      {/* 時刻 */}
      <p className="text-3xl mb-16 text-center">
        {timeString}
      </p>

      {/* 見出し */}
      <p className="text-2xl mb-10">
        現在の食事区分は……
      </p>

      {/* n食です（横並び） */}
      <div className="relative w-full flex justify-center mb-32">
        {/* 中央に大きな「n食」 */}
        <p className="text-6xl font-bold text-center">{meal}</p>

        {/* 「n食」の右側に小さく「です」を付ける */}
        <p className="text-2xl absolute top-1/2 translate-y-[-50%] ml-[calc(50%+2rem)]">
          です
        </p>
      </div>

      {/* コメント（画面下寄り） */}
      <p className="text-xl mt-auto mb-16 text-center px-4 leading-relaxed">
        {meal && getComment(meal)}
      </p>

    </main>
  );
}
